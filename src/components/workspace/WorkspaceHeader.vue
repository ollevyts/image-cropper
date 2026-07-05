<script setup lang="ts">
import { computed } from 'vue';
import { useImageEditorStore } from '../../stores/useImageEditorStore';

const store = useImageEditorStore();

const cropResolutionText = computed(() => {
    if (!store.cropData) {
        return 'Uncropped';
    }

    return `Cropping result: ${store.cropData.width}x${store.cropData.height}px`;
});

const toggleCropMode = () => {
    if (store.mode === 'preview') {
        store.setMode('crop');
    } else {
        store.setMode('preview');
    }
};
</script>

<template>
    <div class="workspace-header w-100 d-flex align-center justify-space-between px-2 mb-4">
        <div class="d-flex align-center">
            <v-chip
                v-if="store.cropData"
                color="success"
                variant="flat"
                class="font-weight-medium px-4 text-body-2 custom-chip"
            >
                {{ cropResolutionText }}
            </v-chip>
        </div>

        <div class="d-flex align-center">
            <v-btn
                v-if="store.mode === 'preview'"
                color="primary"
                variant="flat"
                height="40"
                class="text-none font-weight-bold rounded-lg px-5 action-btn"
                @click="toggleCropMode"
            >
                Crop
            </v-btn>

            <v-btn
                v-else
                color="success"
                variant="flat"
                height="40"
                class="text-none font-weight-bold rounded-lg px-5 action-btn"
                @click="toggleCropMode"
            >
                Fix the crop
            </v-btn>
        </div>

    </div>
</template>

<style scoped>
.workspace-header {
    min-height: 48px;
    border-bottom: 1px solid rgba(48, 54, 61, 0.5);
    padding-bottom: 12px;
}

.custom-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px !important;
    border-radius: 18px !important;
}

.action-btn {
    letter-spacing: 0.02em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.action-btn:active {
    transform: translateY(0);
}
</style>