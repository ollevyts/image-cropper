<script setup lang="ts">
import EditorPage from './pages/EditorPage.vue';
</script>

<template>
    <v-app id="editor-app">
        <EditorPage />
    </v-app>
</template>

<style>
html,
body,
#app,
#editor-app,
.v-application,
.v-application__wrap {
    background-color: #0E1116 !important;
    color: #C9D1D9 !important;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    height: 100% !important;
    margin: 0;
    padding: 0;
}

.bg-grey-lighten-5 {
    background-color: #0E1116 !important;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #0E1116;
}

::-webkit-scrollbar-thumb {
    background: #30363D;
    border-radius: 3px;
}
</style>