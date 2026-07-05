import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { IImgFilters, ICropData, IImgEditorManifest } from '../types/editor';

const DEFAULT_FILTERS: IImgFilters = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    preset: 'none',
};

const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ImageEditorDB', 2);

        request.onupgradeneeded = (e: any) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('images')) {
                db.createObjectStore('images');
            }
        };
        request.onsuccess = (e: any) => resolve(e.target.result);
        request.onerror = (e) => reject(e);
    });
};

export const useImageEditorStore = defineStore('image-editor', () => {
    const originalFile = ref<File | null>(null);
    const imageSrc = ref<string | null>(null);
    const filename = ref<string>('image.png');
    const filters = ref<IImgFilters>({ ...DEFAULT_FILTERS });
    const cropData = ref<ICropData | null>(null);
    const mode = ref<'crop' | 'preview'>('preview');

    const cssFilterString = computed((): string => {
        let str = `brightness(${filters.value.brightness}%) contrast(${filters.value.contrast}%) saturate(${filters.value.saturation}%)`;
        if (filters.value.preset === 'grayscale') str += ' grayscale(100%)';
        else if (filters.value.preset === 'sepia') str += ' sepia(100%)';
        return str;
    });

    const manifest = computed((): IImgEditorManifest => ({
        version: '1.0.0',
        filename: filename.value,
        filters: { ...filters.value },
        crop: cropData.value ? { ...cropData.value } : null,
        updatedAt: new Date().toISOString(),
    }));

    const resetMetadata = () => {
        filters.value = { ...DEFAULT_FILTERS };
        cropData.value = null;
        mode.value = 'preview';
    };

    const setImage = async (file: File) => {
        originalFile.value = file;
        imageSrc.value = URL.createObjectURL(file);
        filename.value = file.name;

        try {
            const db = await initDB();
            const transaction = db.transaction('images', 'readwrite');
            transaction.objectStore('images').put(file, 'current_image');
            saveConfigToLocalStorage();
        } catch (err) {
            console.error('IndexedDB Put Error:', err);
        }
    };

    const saveConfigToLocalStorage = () => {
        localStorage.setItem('editor_filters', JSON.stringify(filters.value));
        localStorage.setItem('editor_crop', JSON.stringify(cropData.value));
        localStorage.setItem('editor_filename', filename.value);
    };

    const clearAll = async () => {
        originalFile.value = null;
        imageSrc.value = null;
        filename.value = 'image.png';
        cropData.value = null;
        mode.value = 'preview';
        resetMetadata();

        localStorage.removeItem('editor_filters');
        localStorage.removeItem('editor_crop');
        localStorage.removeItem('editor_filename');

        try {
            const db = await initDB();
            const transaction = db.transaction('images', 'readwrite');
            transaction.objectStore('images').delete('current_image');
        } catch (err) {
            console.error('IndexedDB Delete Error:', err);
        }
    };

    const setCropData = (data: ICropData | null) => {
        cropData.value = data;
    };

    const setMode = (newMode: 'preview' | 'crop') => {
        mode.value = newMode;
    };

    watch(
        () => [filters.value, cropData.value],
        () => {
            if (imageSrc.value) {
                saveConfigToLocalStorage();
            }
        },
        { deep: true }
    );

    const resetCrop = () => {
        cropData.value = null;
        mode.value = 'preview';
        localStorage.removeItem('editor_crop');
    };

    return {
        originalFile,
        imageSrc,
        filename,
        filters,
        cropData,
        mode,
        cssFilterString,
        manifest,
        setImage,
        saveConfigToLocalStorage,
        resetMetadata,
        clearAll,
        setCropData,
        setMode,
        initDB,
        resetCrop
    };
});