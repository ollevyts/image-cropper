import { ref } from 'vue';
import { useImageEditorStore } from '../stores/useImageEditorStore';

export function useImageRestore() {
    const store = useImageEditorStore();
    const isRestoring = ref(true);

    const restoreImageFromDB = async (): Promise<File | null> => {
        try {
            const db = await store.initDB();
            return new Promise((resolve) => {
                if (!db.objectStoreNames.contains('images')) {
                    resolve(null);
                    return;
                }
                const transaction = db.transaction('images', 'readonly');
                const storeRequest = transaction.objectStore('images').get('current_image');
                storeRequest.onsuccess = () => resolve(storeRequest.result || null);
                storeRequest.onerror = () => resolve(null);
            });
        } catch (err) {
            console.error('Не вдалося підключитися до DB:', err);
            return null;
        }
    };

    const restoreState = async () => {
        const savedFilters = localStorage.getItem('editor_filters');
        const savedCrop = localStorage.getItem('editor_crop');
        const savedName = localStorage.getItem('editor_filename');

        if (savedFilters) store.filters = JSON.parse(savedFilters);
        if (savedCrop) store.cropData = JSON.parse(savedCrop);
        if (savedName) store.filename = savedName;

        const file = await restoreImageFromDB();
        if (file) {
            store.imageSrc = URL.createObjectURL(file);
            store.originalFile = file;
        }
        isRestoring.value = false;
    };

    return {
        isRestoring,
        restoreState
    };
}