<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type Ingredient = {
  densitet: number
}

type IngredientsMap = Record<string, Ingredient>
type Unit = 'g' | 'ml' | 'dl' | 'tsk' | 'msk'

type RowState = {
  amount: number
  fromUnit: Unit
  toUnit: Unit
}

const ingredients = ref<IngredientsMap>({})
const rows = ref<Record<string, RowState>>({})

const loading = ref(true)
const error = ref<string | null>(null)

const ingredientNames = computed(() => Object.keys(ingredients.value))
const rowEntries = computed(() =>
  ingredientNames.value
    .map((name) => ({ name, row: rows.value[name] }))
    .filter((entry): entry is { name: string; row: RowState } => entry.row !== undefined),
)

function toMilliliters(value: number, unit: Unit, densitet: number): number {
  if (unit === 'ml') return value
  if (unit === 'dl') return value * 100
  if (unit === 'tsk') return value * 5
  if (unit === 'msk') return value * 15
  return value / densitet
}

function fromMilliliters(valueMl: number, unit: Unit, densitet: number): number {
  if (unit === 'ml') return valueMl
  if (unit === 'dl') return valueMl / 100
  if (unit === 'tsk') return valueMl / 5
  if (unit === 'msk') return valueMl / 15
  return valueMl * densitet
}

function convert(name: string): number | null {
  const ingredient = ingredients.value[name]
  const row = rows.value[name]

  if (!ingredient || !row) return null
  if (!Number.isFinite(row.amount) || row.amount < 0) return null

  const inMl = toMilliliters(row.amount, row.fromUnit, ingredient.densitet)
  return fromMilliliters(inMl, row.toUnit, ingredient.densitet)
}

function formattedResult(name: string): string {
  const value = convert(name)
  if (value === null) return '-'

  return new Intl.NumberFormat('sv-SE', {
    maximumFractionDigits: 2,
  }).format(value)
}

onMounted(async () => {
  try {
    const response = await fetch('/ingredienser.json')
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    ingredients.value = await response.json()

    for (const name of Object.keys(ingredients.value)) {
      rows.value[name] = {
        amount: 1,
        fromUnit: 'dl',
        toUnit: 'g',
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="container">
    <h1>Omvandling av ingredienser</h1>
    <p class="intro">Alla ingredienser visas i tabellen nedan.</p>

    <p v-if="loading">Laddar ingredienser...</p>
    <p v-else-if="error" class="error">Kunde inte ladda ingredienser: {{ error }}</p>

    <table v-else class="converter-table">
      <thead>
        <tr>
          <th>Ingrediens</th>
          <th>Mängd</th>
          <th>Från</th>
          <th>Till</th>
          <th>Resultat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in rowEntries" :key="entry.name">
          <td>{{ entry.name }}</td>
          <td>
            <input v-model.number="entry.row.amount" type="number" min="0" step="0.01" />
          </td>
          <td>
            <select v-model="entry.row.fromUnit">
              <option value="g">gram (g)</option>
              <option value="ml">milliliter (ml)</option>
              <option value="dl">deciliter (dl)</option>
              <option value="tsk">tesked (tsk)</option>
              <option value="msk">matsked (msk)</option>
            </select>
          </td>
          <td>
            <select v-model="entry.row.toUnit">
              <option value="g">gram (g)</option>
              <option value="ml">milliliter (ml)</option>
              <option value="dl">deciliter (dl)</option>
              <option value="tsk">tesked (tsk)</option>
              <option value="msk">matsked (msk)</option>
            </select>
          </td>
          <td><strong>{{ formattedResult(entry.name) }} {{ entry.row.toUnit }}</strong></td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
