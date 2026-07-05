import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
// @ts-ignore
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes: {
            dark: {
                colors: {
                    background: '#0E1116',
                    surface: '#161B22',
                    primary: '#58A6FF',
                    accent: '#8957E5',
                    success: '#2EA44F',
                    error: '#F85149',
                }
            }
        }
    },
});

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(vuetify)

app.mount('#app')
