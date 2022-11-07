<script setup lang="ts">
import type { LfdParts } from '@/models/lfdModels'
import AccordionItem from '@/components/AccordionItem.vue'
import { ref } from 'vue'

const props = defineProps<{
  jobData: LfdParts
}>()

const emit = defineEmits<{
  (e: 'onChosen', lfdNum: string): void
}>()

const passUp = (lfd: string) => emit('onChosen', lfd)

const isHidden = ref(true)
const isInnerHidden = ref(props.jobData.teile.map((_) => true))

const toggleHide = () => (isHidden.value = !isHidden.value)
const toggleInnerHide = (index: number) =>
  (isInnerHidden.value[index] = !isInnerHidden.value[index])

const colors = [
  'zinc',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'fuchsia',
].map((el) => `bg-${el}-500`)

const rCN = () => Math.floor(Math.random() * (255 - 0 + 1))

const generateRandomColor = () => `rgb(${rCN()} ${rCN()} ${rCN()})`

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]
</script>

<template>
  <div class="border p-2 bg-slate-50">
    <label @click="toggleHide">
      {{ props.jobData.abschnitt }}: {{ props.jobData.text }}</label
    >
    <div class="children p-3">
      <div :class="{ hidden: isHidden }">
        <div v-for="(lfdE, index) in props.jobData.teile" v-bind:key="index">
          <div
            class="border rounded-lg"
            :style="{ 'background-color': generateRandomColor() }"
          >
            <div @click="toggleInnerHide(index)" class="m-2">
              {{ index + 1 }}: {{ lfdE.ueberbegriff }}
            </div>
            <ul :class="{ hidden: isInnerHidden[index] }">
              <li v-for="innerEntry in lfdE.points">
                <div class="p-2">
                  <AccordionItem :lfd_data="innerEntry" @chosen="passUp" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
