<script setup lang="ts">
import { useImageEditorStore } from '../../stores/useImageEditorStore';

const store = useImageEditorStore();
</script>

<template>
    <div class="mb-4">
        <div class="d-flex justify-space-between text-caption text-grey-lighten-1 mb-1">
            <span>Brightness</span>
            <span class="font-weight-bold text-primary">{{ store.filters.brightness }}%</span>
        </div>
        <v-slider
            v-model="store.filters.brightness"
            min="0"
            max="200"
            step="1"
            hide-details
            track-color="grey-darken-3"
            thumb-size="14"
        ></v-slider>
    </div>

    <div class="mb-4">
        <div class="d-flex justify-space-between text-caption text-grey-lighten-1 mb-1">
            <span>Contrast</span>
            <span class="font-weight-bold text-primary">{{ store.filters.contrast }}%</span>
        </div>
        <v-slider
            v-model="store.filters.contrast"
            min="0"
            max="200"
            step="1"
            hide-details
            track-color="grey-darken-3"
            thumb-size="14"
        ></v-slider>
    </div>

    <div class="mb-5">
        <div class="d-flex justify-space-between text-caption text-grey-lighten-1 mb-1">
            <span>Saturation</span>
            <span class="font-weight-bold text-primary">{{ store.filters.saturation }}%</span>
        </div>
        <v-slider
            v-model="store.filters.saturation"
            min="0"
            max="200"
            step="1"
            hide-details
            track-color="grey-darken-3"
            thumb-size="14"
        ></v-slider>
    </div>
</template>