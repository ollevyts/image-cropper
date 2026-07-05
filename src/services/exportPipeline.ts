import type { IImgEditorManifest } from '../types/editor';

export const exportImagePipeline = (
    objectUrl: string,
    manifest: IImgEditorManifest & { skipJsonDownload?: boolean }
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = objectUrl;

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    throw new Error('Failed to initialize HTML5 Canvas Context 2D');
                }

                let targetWidth = img.naturalWidth;
                let targetHeight = img.naturalHeight;
                let sourceX = 0;
                let sourceY = 0;

                if (manifest.crop) {
                    sourceX = manifest.crop.x;
                    sourceY = manifest.crop.y;
                    targetWidth = manifest.crop.width;
                    targetHeight = manifest.crop.height;
                }

                canvas.width = targetWidth;
                canvas.height = targetHeight;

                let filterString = `brightness(${manifest.filters.brightness}%) contrast(${manifest.filters.contrast}%) saturate(${manifest.filters.saturation}%)`;

                if (manifest.filters.preset === 'grayscale') {
                    filterString += ' grayscale(100%)';
                } else if (manifest.filters.preset === 'sepia') {
                    filterString += ' sepia(100%)';
                }

                ctx.filter = filterString;

                ctx.drawImage(
                    img,
                    sourceX,
                    sourceY,
                    targetWidth,
                    targetHeight,
                    0,
                    0,
                    targetWidth,
                    targetHeight
                );

                const processedExtension = manifest.filename.split('.').pop() || 'png';
                const mimeType = processedExtension === 'jpg' || processedExtension === 'jpeg' ? 'image/jpeg' : 'image/png';

                canvas.toBlob((blob) => {
                    if (!blob) {
                        throw new Error('Blob object generation error');
                    }
                    triggerDownload(blob, `edited_${manifest.filename}`);

                    if (!manifest.skipJsonDownload) {
                        const jsonString = JSON.stringify(manifest, null, 2);
                        const jsonBlob = new Blob([jsonString], { type: 'application/json' });
                        const lastDotIndex = manifest.filename.lastIndexOf('.');
                        const baseName = lastDotIndex !== -1 ? manifest.filename.substring(0, lastDotIndex) : manifest.filename;
                        triggerDownload(jsonBlob, `${baseName}_manifest.json`);
                    }

                    resolve();
                }, mimeType, 0.95);

            } catch (err) {
                reject(err);
            }
        };

        img.onerror = () => {
            reject(
                new Error('Failed to load the source image into the export pipeline.')
            );
        };
    });
};

const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};