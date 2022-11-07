<script setup lang="ts">
import type { UserPoint } from '@/models/lfdModels'

const props = defineProps<{
  point: UserPoint
  currentIndex: number
}>()

const emit = defineEmits<{
  (e: 'changeIndex', index: number): void
}>()

const onIndexChange = () => emit('changeIndex', props.point.index)
</script>

<template>
  <div class="flex flex-row gap-5 p-3" @click="onIndexChange">
    <span>{{ props.point.index + 1 }}: </span>
    <input
      type="text"
      size="3"
      class="border text-center"
      :value="props.point.lfd"
      readonly
    />
    <label>{{ props.point.value }}</label>
  </div>
</template>
