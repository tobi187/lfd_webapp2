<script setup lang="ts">
import type { LfdEntry } from '@/views/MainView.vue';

const props = defineProps<{
    lfd_data: LfdEntry
}>()

</script>

<template>
    <div class="border p-2">
        <p>
            {{ props.lfd_data.text }}
        </p>
    </div>
</template>