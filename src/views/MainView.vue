<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import Accordion from "@/components/AccordionElement.vue";
import AccordionItem from "@/components/AccordionItem.vue";

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
  <div id="app">
    <accordion>
        <accordion-item>
          <!-- This slot will handle the title/header of the accordion and is the part you click on -->
          <template slot="accordion-trigger">
            <h3>Item 1</h3>
          </template>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <template slot="accordion-content">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
          </template>
        </accordion-item>

        <accordion-item>
          <!-- This slot will handle the title/header of the accordion and is the part you click on -->
          <template slot="accordion-trigger">
            <h3>Item 2</h3>
          </template>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <template slot="accordion-content">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
          </template>
        </accordion-item>

        <accordion-item>
          <!-- This slot will handle the title/header of the accordion and is the part you click on -->
          <template slot="accordion-trigger">
            <h3>Item 3</h3>
          </template>
          <!-- This slot will handle all the content that is passed to the accordion -->
          <template slot="accordion-content">
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
          </template>
        </accordion-item>
      </accordion>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

