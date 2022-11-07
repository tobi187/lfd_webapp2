<script setup lang="ts">
import type { LfdEntry } from "@/models/lfdModels";

const emit = defineEmits<{
  (e: "chosen", lfdNum: string): void;
}>();

const passValue = () => emit("chosen", props.lfd_data.lfd);

const props = defineProps<{
  lfd_data: LfdEntry;
}>();
</script>

<template>
  <div class="border p-2 rounded-md" @click="passValue">
    <p>{{ props.lfd_data.lfd }}: {{ props.lfd_data.text }}</p>
  </div>
</template>
