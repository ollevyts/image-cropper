<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useImageEditorStore } from '../stores/useImageEditorStore';
import { exportImagePipeline } from '../services/exportPipeline';
import { useImageRestore } from '../composables/useImageRestore';

import ImageUploader from '../components/ImageUploader.vue';
import ImageWorkspace from '../components/ImageWorkspace.vue';
import EditorControls from '../components/EditorControls.vue';
import ExportConfirmModal from '../components/modals/ExportConfirmModal.vue';
import ConfirmLeaveModal from '../components/modals/ConfirmLeaveModal.vue';
import ThanksModal from '../components/modals/ThanksModal.vue';

const store = useImageEditorStore();
const { imageSrc, filename } = storeToRefs(store);

const { isRestoring, restoreState } = useImageRestore();

const isExporting = ref(false);
const showExportModal = ref(false);
const showLeaveModal = ref(false);
const showThanks = ref(false);
const countdown = ref(5);
let timerInterval: any = null;

onMounted(() => {
    restoreState();
});

const handleFinalExport = async (savePipeline: boolean) => {
    if (!store.imageSrc) return;
    showExportModal.value = false;
    isExporting.value = true;

    try {
        const manifestSnapshot = JSON.parse(JSON.stringify(store.manifest));
        if (!savePipeline) {
            manifestSnapshot.skipJsonDownload = true;
        }
        await exportImagePipeline(store.imageSrc, manifestSnapshot);
        triggerThanksFlow();
    } catch (error) {
        console.error(error);
    } finally {
        isExporting.value = false;
    }
};

const triggerThanksFlow = () => {
    showThanks.value = true;
    countdown.value = 5;
    timerInterval = setInterval(() => {
        countdown.value--;
        if (countdown.value <= 0) {
            clearInterval(timerInterval);
            showThanks.value = false;
            store.clearAll();
        }
    }, 1000);
};

const confirmLeave = () => {
    showLeaveModal.value = false;
    store.clearAll();
};
</script>

<template>
    <v-app-bar color="#161B22" density="compact" elevation="0" style="border-bottom: 1px solid #30363D;">
        <v-app-bar-title class="font-weight-bold text-grey-lighten-2 text-body-1">
            Vue 3 Non-Destructive Image Editor
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-chip class="mr-4" color="primary" variant="outlined" v-if="imageSrc">
            {{ filename }}
        </v-chip>
    </v-app-bar>

    <v-main style="background-color: #0E1116 !important;">
        <v-container fluid class="pa-6" v-if="isRestoring">
            <v-row justify="center" align="center" style="min-height: 80vh;">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-row>
        </v-container>

        <v-container fluid class="pa-6" v-else>
            <v-row justify="center" align="center" style="min-height: 80vh;" v-if="!imageSrc">
                <v-col cols="12" md="8" lg="6">
                    <ImageUploader />
                </v-col>
            </v-row>

            <v-row v-else>
                <v-col cols="12" md="8" class="d-flex flex-column">
                    <div class="d-flex justify-start align-center mb-3">
                        <v-btn variant="text" color="grey-lighten-1" class="text-none text-caption" @click="showLeaveModal = true">
                            ← Upload another image
                        </v-btn>
                    </div>
                    <ImageWorkspace />
                </v-col>

                <v-col cols="12" md="4">
                    <div style="margin-top: 46px;">
                        <EditorControls :is-loading="isExporting" @trigger-export="showExportModal = true" />
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

    <ExportConfirmModal v-model="showExportModal" @confirm="handleFinalExport" />
    <ConfirmLeaveModal v-model="showLeaveModal" @confirm="confirmLeave" />
    <ThanksModal v-model="showThanks" :countdown="countdown" />
</template>