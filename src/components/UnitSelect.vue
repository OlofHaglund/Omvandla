<script setup lang="ts">
import type { Unit } from '../types'

const UNITS: { value: Unit; label: string }[] = [
  { value: 'g', label: 'gram (g)' },
  { value: 'ml', label: 'milliliter (ml)' },
  { value: 'dl', label: 'deciliter (dl)' },
  { value: 'tsk', label: 'tesked (tsk)' },
  { value: 'msk', label: 'matsked (msk)' },
  { value: 'cup', label: 'US cup' },
]

const model = defineModel<Unit>({ required: true })
</script>

<template>
  <select v-model="model">
    <option v-for="unit in UNITS" :key="unit.value" :value="unit.value">{{ unit.label }}</option>
  </select>
</template>
