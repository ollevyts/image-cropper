<script setup lang="ts">
defineProps<{
    modelValue: boolean;
    countdown: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
    <v-dialog :model-value="modelValue" persistent max-width="400">
        <v-card class="pa-6 text-center modern-modal" variant="flat">
            <h3 class="text-h6 font-weight-bold mb-2 text-white">Export complete!</h3>
            <p class="text-body-2 text-grey-lighten-1 mb-6">
                Thank you for using our service. Your file has been successfully uploaded.
            </p>
            <v-divider class="border-opacity-15 mb-4" color="grey-lighten-1"></v-divider>
            <div class="text-caption text-grey-darken-1">
                Return to home page via <span class="countdown-num">{{ countdown }}</span> сек...
            </div>
        </v-card>
    </v-dialog>
</template>

<style scoped>
.modern-modal {
    background-color: #161b22 !important;
    border: 1px solid #30363d !important;
    border-radius: 16px !important;
}

.countdown-num {
    color: #58a6ff;
    font-weight: bold;
    font-size: 1.1rem;
}
</style>