<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'confirm', savePipeline: boolean): void;
}>();

const savePipeline = ref(true);
</script>

<template>
    <v-dialog
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        max-width="400"
    >
        <v-card class="pa-6 modern-modal" variant="flat">
            <h3 class="text-h6 font-weight-bold text-white mb-2 text-left">Ready to save?</h3>
            <p class="text-body-2 text-grey-lighten-1 mb-5 text-left">
                Check that all filters and cropping are set correctly before the final rendering of the photo.
            </p>

            <label class="custom-checkbox-container mb-6">
                <input type="checkbox" v-model="savePipeline" />
                <span class="checkmark"></span>
                <span class="checkbox-label">Save history manifest (JSON Pipeline)</span>
            </label>

            <div class="d-flex flex-column gap-10 w-100">
                <v-btn
                    color="primary"
                    variant="flat"
                    block
                    height="44"
                    class="text-none rounded-lg font-weight-bold"
                    @click="emit('confirm', savePipeline)"
                >
                    Yes, save the photo.
                </v-btn>
                <v-btn
                    variant="tonal"
                    color="grey-lighten-1"
                    block
                    height="44"
                    class="text-none rounded-lg"
                    @click="emit('update:modelValue', false)"
                >
                    Cancel
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.modern-modal {
    background-color: #161B22 !important;
    border: 1px solid #30363D !important;
    border-radius: 16px !important;
}

.text-left {
    text-align: left !important;
}

.gap-10 {
    display: flex;
    flex-direction: column;
    gap: 10px !important;
}

.custom-checkbox-container {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 32px;
    cursor: pointer;
    user-select: none;
    text-align: left;
}

.custom-checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 18px;
    width: 18px;
    background-color: #0e1116;
    border: 1px solid #30363d;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.custom-checkbox-container input:checked ~ .checkmark {
    background-color: #58a6ff;
    border-color: #58a6ff;
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.custom-checkbox-container input:checked ~ .checkmark:after {
    display: block;
}

.checkbox-label {
    color: #c9d1d9;
    font-size: 0.875rem;
}
</style>