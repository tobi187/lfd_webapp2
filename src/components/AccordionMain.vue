<script setup lang="ts">
const props = defineProps<{
    jobData: LfdParts
}>()

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
    <div>

    </div>
</template>