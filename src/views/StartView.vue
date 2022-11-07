<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getJobs, sendInputFile } from "@/models/apiLogic";
import type { Job } from "@/models/lfdModels";

const file_data = ref<File | null>();
const dropDownValues = ref<Job[]>();
const selectedValue = ref<Job | null>();

const router = useRouter();
const routeValues = useRoute();

onMounted(async () => {
  dropDownValues.value = await getJobs();

  if (routeValues.params.dl) {
    const link = document.createElement("a");
    link.href = routeValues.params.dl as string;
    link.download = "berichtheft.docx";
    link.click();
    document.body.removeChild(link);
  }
});

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    file_data.value = target.files[0];
  }
}

async function sendData() {
  if (file_data.value && selectedValue.value) {
    const response = await sendInputFile(file_data.value);

    if (response) {
      router.push({
        name: "main",
        params: {
          job: selectedValue.value?.internal,
          current_file: response.name,
          original_name: file_data.value?.name.split(".")[0],
        },
      });
    } else {
      console.log("Response: " + response);
    }
  }
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
            <option
              v-for="jobData in dropDownValues"
              v-bind:value="jobData"
              v-bind:key="jobData.internal"
            >
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
