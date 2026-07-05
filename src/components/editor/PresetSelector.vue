<script setup lang="ts">
import { useImageEditorStore } from '../../stores/useImageEditorStore';

const store = useImageEditorStore();
</script>

<template>
    <div class="text-caption text-grey-lighten-1 mb-2">Filters</div>
    <v-btn-toggle
        v-model="store.filters.preset"
        mandatory
        variant="flat"
        class="modern-toggle w-100 mb-6"
    >
        <v-btn value="none" class="flex-grow-1 text-none text-caption">Raw</v-btn>
        <v-btn value="grayscale" class="flex-grow-1 text-none text-caption">Mono</v-btn>
        <v-btn value="sepia" class="flex-grow-1 text-none text-caption">Sepia</v-btn>
    </v-btn-toggle>
</template>

<style scoped>
.modern-toggle {
    background-color: #0E1116 !important;
    border: 1px solid #30363D;
    border-radius: 8px !important;
    padding: 3px;
    height: 40px;
}

.modern-toggle :deep(.v-btn) {
    background-color: transparent !important;
    border-radius: 6px !important;
    color: #8B949E !important;
    border: none !important;
    transition: color 0.2s ease;
}

.modern-toggle :deep(.v-btn--selected) {
    background-color: #21262D !important;
    color: #58A6FF !important;
    border: 1px solid #30363D !important;
}

.modern-toggle :deep(.v-btn:not(.v-btn--selected):hover) {
    color: #C9D1D9 !important;
}
</style>