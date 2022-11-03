<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const file_data = ref<File | null>()
const dropDownValues = ref<Job[]>()
const selectedValue = ref<Job | null>()

const router = useRouter()

onMounted(async () => {
  const result = await fetch('http://localhost:5000/api/v1/init')
  const data = await result.json()
  dropDownValues.value = data.jobs as Array<Job>
})

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target && target.files) {
    file_data.value = target.files[0]
  }
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const res = reader.result as string
      if (res) {
        const data = res.replace('data', '').replace(/^.+,/, '')
        resolve(data)
      }
    }
    reader.onerror = (error) => reject(error)
  })

async function sendData() {
  if (file_data.value && selectedValue.value) {
    try {
      const fileBytes = await toBase64(file_data.value)
      const result = await fetch('http://localhost:5000/api/v1/upload', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file_data.value.name,
          wordData: fileBytes,
        }),
      })
      nextAction(await result.json())
    } catch (error) {
      console.log(error)
    }
  }
}

function nextAction(res: Object) {
  const response = res as ApiResponse

  if (response && response.status == 200) {
    router.push({
      name: 'main',
      params: {
        job: selectedValue.value?.internal,
        current_file: response.name,
      },
    })
  } else {
    console.log('wtf is going on' + response.status + ' | ' + response.name)
  }
}

type Job = {
  internal: string
  display: string
}

type ApiResponse = {
  status: number
  name: string
}
</script>

<template>
  <main>
    <div>
      <div class="flex justify-center p-2">
        <h1>Berichtsheft LfD Nummer</h1>
      </div>
      <div class="p-2">
        <p v-pre>Make sure to add {{ fill }}</p>
      </div>
      <div class="p-3">
        <div>
          <select v-model="selectedValue">
            <option v-for="jobData in dropDownValues" v-bind:value="jobData">
              {{ jobData.display }}
            </option>
          </select>
        </div>
        <div class="p-3">
          <input type="file" @change="onFileChange" />
        </div>
        <div class="p-3">
          <button @click="sendData">Ausfüllen</button>
        </div>
      </div>
    </div>
  </main>
</template>
