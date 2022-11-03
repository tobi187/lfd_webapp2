<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

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
  console.log(data)
  userEntry.value = data.points as UserPoint[]
  lfdIhkData.value = data.data as LfdParts[]
  console.log(userEntry.value)
  console.log(lfdIhkData.value)
}

type UserPoint = {
  index: number
  value: string
  lfd: string
}

type LfdParts = {
  abschnitt: string
  text: string
  teile: LfdEntry[]
}

type LfdEntry = {
  lfd: string
  text: string
}
</script>

<template>

</template>

<style>

</style>

