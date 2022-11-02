<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

const file_data = ref<File | null>()

function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target && target.files) {
        file_data.value = target.files[0]
    }
}

async function sendData(event: Event) {
    if (file_data.value) {
        const buffer = await file_data.value?.arrayBuffer();
        const bytes = new Uint8Array(buffer)
        const fileName = file_data.value.name

        const result = await fetch("http://localhost:5000/api/v1/init", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "fileName": fileName,
                "wordData": bytes
            })
        })

        nextAction(await result.json())
    }
    else {
        event.preventDefault()
    }
}

function nextAction(res: Object) {
    const response = Object.assign(new ApiResponse(), res)
    if (response && response.status == 200) {
        router.push({
            "name": "main",
            "params": { "fileName": response.name }
        })
    }
    else {
        // show error
    }
}

class ApiResponse {
    status: number | undefined
    name: string | undefined
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
            <form class="p-3" @submit="sendData">
                <div>
                    <!--Add Dropdowm-->
                </div>
                <div class="p-3">
                    <input type="file" @change="onFileChange" />
                </div>
                <div class="p-3">
                    <button>Aufüllen</button>
                </div>
            </form>
        </div>
    </main>
</template>