<script setup lang="ts">
defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'confirm'): void;
}>();
</script>

<template>
    <v-dialog
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
        max-width="400"
    >
        <v-card class="pa-6 modern-modal" variant="flat">
            <h3 class="text-h6 font-weight-bold text-white mb-2 text-left">Unsaved changes</h3>
            <p class="text-body-2 text-grey-lighten-1 mb-5 text-left">
                Are you sure you want to upload another image? Current changes will be lost.
            </p>

            <div class="d-flex flex-column gap-10 w-100">
                <v-btn
                    color="error"
                    variant="flat"
                    block
                    height="44"
                    class="text-none rounded-lg font-weight-bold"
                    @click="emit('confirm')"
                >
                    Yes, load another one
                </v-btn>
                <v-btn
                    variant="tonal"
                    color="grey-lighten-1"
                    block
                    height="44"
                    class="text-none rounded-lg"
                    @click="emit('update:modelValue', false)"
                >
                    No
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
</style>