<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { IngredientsMap } from './types'
import IngredientRow from './components/IngredientRow.vue'

const ingredients = ref<IngredientsMap>({})
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('/ingredienser.json')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    ingredients.value = await response.json()
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
        <IngredientRow
          v-for="(ingredient, name) in ingredients"
          :key="name"
          :name="String(name)"
          :densitet="ingredient.densitet"
        />
      </tbody>
    </table>
  </main>
</template>
