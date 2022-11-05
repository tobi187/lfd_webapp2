<script setup lang="ts">
import { ref } from "vue"
import type { UserPoint } from '@/views/MainView.vue';


const props = defineProps<{
    point: UserPoint
}>()


</script>

<template>
    <div class="flex flex-row">
        <input type="text" />
        <label>{{ props.point.value }}</label>
    </div>
</template>