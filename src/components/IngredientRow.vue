<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Unit } from '../types'
import UnitSelect from './UnitSelect.vue'

const props = defineProps<{ name: string; densitet: number }>()

const amount = ref(1)
const fromUnit = ref<Unit>('dl')
const toUnit = ref<Unit>('g')

const unitLabel: Record<Unit, string> = {
  g: 'g',
  ml: 'ml',
  dl: 'dl',
  tsk: 'tsk',
  msk: 'msk',
  cup: 'US cup',
}

const ML_PER_UNIT: Partial<Record<Unit, number>> = {
  ml: 1,
  dl: 100,
  tsk: 5,
  msk: 15,
  cup: 240,
}

function toMl(value: number, unit: Unit): number {
  const factor = ML_PER_UNIT[unit]
  return factor !== undefined ? value * factor : value / props.densitet
}

function fromMl(valueMl: number, unit: Unit): number {
  const factor = ML_PER_UNIT[unit]
  return factor !== undefined ? valueMl / factor : valueMl * props.densitet
}

const result = computed<string>(() => {
  if (!Number.isFinite(amount.value) || amount.value < 0) return '-'
  const value = fromMl(toMl(amount.value, fromUnit.value), toUnit.value)
  return new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 2 }).format(value)
})
</script>

<template>
  <tr>
    <td>{{ name }}</td>
    <td><input v-model.number="amount" type="number" min="0" step="0.01" /></td>
    <td><UnitSelect v-model="fromUnit" /></td>
    <td><UnitSelect v-model="toUnit" /></td>
    <td><strong>{{ result }} {{ unitLabel[toUnit] }}</strong></td>
  </tr>
</template>
