<script setup lang="ts">
import { ref } from 'vue';
import { useImageEditorStore } from '../stores/useImageEditorStore';
import UploadDropContent from './uploader/UploadDropContent.vue';

const store = useImageEditorStore();
const fileInputRef = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);

const triggerFileInput = () => {
    fileInputRef.value?.click();
};

const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        store.setImage(target.files[0]);
    }
};

const onDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = true;
};

const onDragLeave = () => {
    isDragOver.value = false;
};

const onDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragOver.value = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];

        if (file.type.startsWith('image/')) {
            store.setImage(file);
        }
    }
};
</script>

<template>
    <v-card
        class="upload-zone pa-8 text-center d-flex flex-column align-center justify-center transition-all"
        :class="{ 'drag-active': isDragOver }"
        variant="flat"
        @click="triggerFileInput"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
    >
        <input
            type="file"
            ref="fileInputRef"
            accept="image/*"
            class="d-none"
            @change="onFileChange"
        />

        <UploadDropContent :is-drag-over="isDragOver" />
    </v-card>
</template>

<style scoped>
.upload-zone {
    background-color: #161B22 !important;
    border: 2px dashed #30363D !important;
    border-radius: 16px !important;
    min-height: 380px;
    cursor: pointer;
    user-select: none;
}

.upload-zone:hover {
    border-color: #58A6FF !important;
    background-color: #1c2129 !important;
}

.upload-zone:hover :deep(.upload-icon) {
    color: #58A6FF !important;
    transform: translateY(-4px);
}

.upload-zone:hover :deep(.icon-wrapper) {
    border-color: #58A6FF !important;
}

.drag-active {
    border-color: #8957E5 !important;
    background-color: #1f192c !important;
    box-shadow: 0 0 25px rgba(137, 87, 229, 0.15);
}

.drag-active :deep(.icon-wrapper) {
    border-color: #8957E5 !important;
}

.transition-all {
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
