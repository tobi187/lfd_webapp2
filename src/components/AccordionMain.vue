<script setup lang="ts">
import type { LfdParts } from '@/views/MainView.vue';
import AccordionItem from '@/components/AccordionItem.vue';
import { ref } from 'vue';

const props = defineProps<{
    jobData: LfdParts
}>()

const isHidden = ref(true)
const isInnerHidden = ref(true)

const toggleHide = () => isHidden.value = !isHidden.value
const toggleInnerHide = () => isInnerHidden.value = !isInnerHidden.value

console.log(props.jobData.teile)

</script>

<template>
    <div class="border border-blue-300 p-3" @click="toggleHide">
        <label> {{ props.jobData.abschnitt }}: {{ props.jobData.text }}</label>
        <div class="chilren">
            <div :class="{ hidden: isHidden }">
                <div v-for="lfdE in props.jobData.teile">
                    <div class="border" @click="toggleInnerHide">
                        <div>
                            {{ lfdE.ueberbegriff }}
                        </div>
                        <ul :class="{ hidden: isInnerHidden }">
                            <li v-for="innerEntry in lfdE.points">
                                <div>
                                    <AccordionItem :lfd_data="innerEntry" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>