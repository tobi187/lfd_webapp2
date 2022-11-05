<script setup lang="ts">
import AccordionMain from '@/components/AccordionMain.vue'
import PointItem from '@/components/PointItem.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export type LfdParts = {
  abschnitt: string
  text: string
  teile: OverPoint[]
}

export type OverPoint = {
  ueberbegriff: string
  points: LfdEntry[]
}

export type LfdEntry = {
  lfd: string
  text: string
}

export type UserPoint = {
  index: number
  value: string
  lfd: string
}

const fileId = ref<string>()
const jobName = ref<string>()
const routeValues = useRoute()

const lfdIhkData = ref<LfdParts[] | null>()
const userEntry = ref<UserPoint[] | null>()

onMounted(async () => {
  fileId.value = routeValues.params.current_file as string
  jobName.value = routeValues.params.job as string

  await getData()
})

async function getData() {
  const response = await fetch('http://localhost:5000/api/v1/get-info', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job: jobName.value,
      name: fileId.value,
    }),
  })
  const data = await response.json()
  userEntry.value = data.points as UserPoint[]
  lfdIhkData.value = data.data as LfdParts[]
  console.log(userEntry.value)
  console.log(lfdIhkData.value)
}

</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div>
      <div>
        <ul>
          <li v-for="p in userEntry">
            <PointItem :point="p" />
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="flex justify-center align-middle" v-for="ov in lfdIhkData">
        <AccordionMain :job-data="ov" />
      </div>
    </div>
  </div>
</template>

<style>

</style>

