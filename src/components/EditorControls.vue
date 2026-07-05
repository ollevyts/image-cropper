<script setup lang="ts">
import { watch } from 'vue';
import { useImageEditorStore } from "../stores/useImageEditorStore";
import FilterSliders from './editor/FilterSliders.vue';
import PresetSelector from './editor/PresetSelector.vue';

defineProps<{
    isLoading: boolean;
}>();

const emit = defineEmits(['trigger-export']);
const store = useImageEditorStore();

watch(() => [store.filters, store.cropData], () => {
    store.saveConfigToLocalStorage();
}, { deep: true });
</script>

<template>
    <v-card class="modern-panel pa-5" variant="flat">
        <div class="text-subtitle-1 font-weight-bold mb-5 d-flex align-center tracking-wide text-uppercase text-caption text-grey-lighten-1">
            <v-icon icon="mdi-tune" size="small" class="mr-2 color-accent"></v-icon>
            Tool parameters
        </div>

        <fieldset :disabled="store.mode === 'crop'" class="border-0 pa-0">
            <FilterSliders />
            <PresetSelector />
        </fieldset>

        <v-divider class="border-opacity-15 my-5" color="grey-lighten-1"></v-divider>

        <v-row dense>
            <v-col cols="6">
                <v-btn
                    block
                    variant="tonal"
                    color="grey-lighten-1"
                    class="text-none rounded-lg"
                    prepend-icon="mdi-history"
                    @click="store.resetMetadata"
                >
                    Clear parameters
                </v-btn>
            </v-col>
            <v-col cols="6">
                <v-btn
                    block
                    color="primary"
                    class="text-none rounded-lg font-weight-bold action-glow"
                    prepend-icon="mdi-tray-arrow-down"
                    :loading="isLoading"
                    :disabled="!store.imageSrc"
                    @click="emit('trigger-export')"
                >
                    Export
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
.modern-panel {
    background-color: #161b22 !important;
    border: 1px solid #30363d !important;
    border-radius: 12px !important;
}

.color-accent {
    color: #8957e5;
}

.tracking-wide {
    letter-spacing: 0.08em;
}

fieldset:disabled {
    opacity: 0.35;
    pointer-events: none;
}

.action-glow {
    box-shadow: 0 4px 14px rgba(88, 166, 255, 0.2);
    transition: all 0.2s ease;
}

.action-glow:hover {
    box-shadow: 0 6px 20px rgba(88, 166, 255, 0.4);
    transform: translateY(-1px);
}
</style>