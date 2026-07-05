<script setup lang="ts">
import { ref, watch, onBeforeUnmount, nextTick, computed } from 'vue';
import { useImageEditorStore } from '../stores/useImageEditorStore';
import WorkspaceHeader from './workspace/WorkspaceHeader.vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const store = useImageEditorStore();
const imageRef = ref<HTMLImageElement | null>(null);
let cropperInstance: Cropper | null = null;
const isImageLoaded = ref(false);

const initCropper = async () => {
    await nextTick();
    if (!imageRef.value) return;

    if (cropperInstance) {
        cropperInstance.destroy();
    }

    cropperInstance = new Cropper(imageRef.value, {
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        modal: true,
        guides: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        ready() {
            if (store.cropData) {
                cropperInstance?.setData({
                    x: store.cropData.x,
                    y: store.cropData.y,
                    width: store.cropData.width,
                    height: store.cropData.height,
                    rotate: store.cropData.rotate || 0
                });
            }
        },
        crop(event) {
            store.setCropData({
                x: Math.round(event.detail.x),
                y: Math.round(event.detail.y),
                width: Math.round(event.detail.width),
                height: Math.round(event.detail.height),
                rotate: event.detail.rotate,
            });
        },
    });
};

const destroyCropper = () => {
    if (cropperInstance) {
        cropperInstance.destroy();
        cropperInstance = null;
    }
};

const onImageLoad = () => {
    isImageLoaded.value = true;
};

watch(() => store.mode, (newMode) => {
    if (newMode === 'crop') {
        initCropper();
    } else {
        destroyCropper();
    }
});

watch(() => store.imageSrc, () => {
    isImageLoaded.value = false;
    if (store.mode === 'crop') {
        initCropper();
    }
});

onBeforeUnmount(() => {
    destroyCropper();
});

const previewStyle = computed(() => {
    if (store.mode === 'crop') {
        return {
            filter: 'none',
            transform: 'none',
            clipPath: 'none',
            maxWidth: '100%',
            maxHeight: '450px',
            objectFit: 'contain' as const,
            display: 'block'
        };
    }

    if (!store.cropData || !imageRef.value || !isImageLoaded.value) {
        return {
            filter: store.cssFilterString,
            transform: 'none',
            clipPath: 'none',
            maxWidth: '100%',
            maxHeight: '450px',
            objectFit: 'contain' as const,
            display: 'block'
        };
    }

    const naturalW = imageRef.value.naturalWidth || 1;
    const naturalH = imageRef.value.naturalHeight || 1;
    const crop = store.cropData;

    const top = (crop.y / naturalH) * 100;
    const left = (crop.x / naturalW) * 100;
    const bottom = 100 - ((crop.y + crop.height) / naturalH) * 100;
    const right = 100 - ((crop.x + crop.width) / naturalW) * 100;

    const scaleX = naturalW / crop.width;
    const scaleY = naturalH / crop.height;
    const scale = Math.min(scaleX, scaleY);

    const translateX = ((naturalW / 2) - (crop.x + crop.width / 2)) * (scale / naturalW) * 100;
    const translateY = ((naturalH / 2) - (crop.y + crop.height / 2)) * (scale / naturalH) * 100;

    return {
        filter: store.cssFilterString,
        clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
        transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
        maxWidth: '100%',
        maxHeight: '450px',
        objectFit: 'contain' as const,
        display: 'block'
    };
});
</script>

<template>
    <v-card class="pa-4 d-flex flex-column align-center justify-center overflow-hidden modern-workspace" min-height="480" variant="flat">
        <WorkspaceHeader />

        <div class="image-viewport-container w-100 mt-12">
            <div class="cropper-wrapper">
                <img
                    v-if="store.imageSrc"
                    ref="imageRef"
                    :src="store.imageSrc"
                    alt="Workspace Image"
                    :style="previewStyle"
                    class="workspace-img"
                    @load="onImageLoad"
                />
            </div>
        </div>
    </v-card>
</template>

<style scoped>
.modern-workspace {
    background-color: #161B22 !important;
    border: 1px solid #30363D !important;
    border-radius: 12px !important;
    position: relative;
    width: 100%;
}

.image-viewport-container {
    max-height: 500px;
    height: calc(75vh - 100px);
    width: 100%;
    overflow: hidden;
    position: relative;
    display: block;
}

.cropper-wrapper {
    max-width: calc(100% - 32px);
    max-height: 100%;
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}

.workspace-img {
    max-width: 100%;
    max-height: 450px;
    object-fit: contain;
    display: block;
    margin: 0 auto;
    transform-origin: center center;
    transition: clip-path 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
:deep(.cropper-container) {
    max-width: 100% !important;
    margin: 0 auto !important;
}

:deep(.cropper-bg) {
    background-image: none !important;
    background-color: #0E1116 !important;
}

:deep(.cropper-modal) {
    background-color: #0E1116 !important;
    opacity: 0.92;
}

:deep(.cropper-view-box) {
    outline: 1px solid #58A6FF !important;
}

:deep(.cropper-line), :deep(.cropper-point) {
    background-color: #58A6FF !important;
}

:deep(.cropper-point.point-se) {
    right: 1px !important;
    bottom: 1px !important;
    opacity: 0.9;
}
</style>