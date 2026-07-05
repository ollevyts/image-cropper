<script setup lang="ts">
interface Props {
    isDragOver: boolean;
}

defineProps<Props>();
</script>

<template>
    <div class="d-flex flex-column align-center justify-center w-100 pa-4 content-container">
        <h2 class="text-h6 font-weight-bold mb-2 tracking-wide text-grey-lighten-3 mt-4">
            Drag the image here
        </h2>

        <p class="text-caption text-grey-darken-1 mb-6 max-w-300">
            or click this area to select a local file on your computer
        </p>

        <v-btn
            color="primary"
            variant="flat"
            height="48"
            class="text-none rounded-lg px-8 font-weight-bold select-btn"
        >
            Select file
        </v-btn>

        <div class="text-caption text-grey-darken-2 mt-6 mb-4">
            PNG, JPG, and JPEG formats are supported.
        </div>
    </div>
</template>

<style scoped>
.content-container {
    user-select: none;
}

.max-w-300 {
    max-width: 300px;
    line-height: 1.4;
}

.tracking-wide {
    letter-spacing: 0.02em;
}

.select-btn {
    pointer-events: none;
    box-shadow: 0 4px 12px rgba(88, 166, 255, 0.15);
    letter-spacing: normal;
}
</style>