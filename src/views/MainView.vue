<script setup lang="ts">
import AccordionMain from "@/components/AccordionMain.vue";
import PointItem from "@/components/PointItem.vue";
import type { LfdParts, UserPoint } from "@/models/lfdModels";
import { getData, sendPointData, dlLink } from "@/models/apiLogic";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const routeValues = useRoute();
const fileId = ref<string>();
const jobName = ref<string>();
const original_name = ref<string>();
const lfdIhkData = ref<LfdParts[] | null>();
const userEntry = ref<UserPoint[] | null>();
const currentPointIndex = ref(0);
const searchValue = ref("");

onMounted(async () => {
  fileId.value = routeValues.params.current_file as string;
  jobName.value = routeValues.params.job as string;
  original_name.value = routeValues.params.original_name as string;
  [userEntry.value, lfdIhkData.value] = await getData(
    jobName.value,
    fileId.value
  );
});

const onPointSubmit = (lfdPoint: string) => {
  userEntry.value![currentPointIndex.value].lfd = lfdPoint;
  currentPointIndex.value = userEntry.value?.findIndex((el) => !el.lfd) ?? -1;
};

const onDataSubmit = async () => {
  const fileName = await sendPointData(userEntry.value!, fileId.value!);
  if (fileName) {
    const link = dlLink(fileName, original_name.value!);
    router.push({
      name: "start",
      params: {
        dl: link,
      },
    });
  }
};
</script>

<template>
  <div class="p-20">
    <div class="flex justify-center p-5">
      <h1 class="text-purple-700 font-extrabold text-3xl">
        {{ original_name }} ausfüllen
      </h1>
    </div>
    <div class="p-5 flex justify-center">
      <input v-model="searchValue" type="text" placeholder="Suchen..." class="border p-2 bg-pink-600" />
    </div>

    <div class="flex flex-row p-10 gap-24">
      <div>
        <ul>
          <li v-for="p in userEntry" v-bind:key="p.index">
            <PointItem :point="p" :current-index="currentPointIndex" @change-index="(i) => (currentPointIndex = i)" />
          </li>
        </ul>
      </div>
      <div class="w-1/2">
        <div class="p-2 border rounded-lg bg-slate-200">
          <div class="flex justify-center" @click="onPointSubmit('-')">
            <span class="text-xl">-</span>
          </div>
        </div>
        <div v-for="(ov, index) in lfdIhkData" v-bind:key="index">
          <AccordionMain :job-data="ov" :search-value="searchValue.toLocaleLowerCase()" @on-chosen="onPointSubmit" />
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <button @click="onDataSubmit">Absenden</button>
    </div>
  </div>
</template>

<style>

</style>
