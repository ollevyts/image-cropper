export interface IImgFilters {
    brightness: number,
    contrast: number,
    saturation: number,
    preset: 'none' | 'sepia' | 'grayscale',
}

export interface ICropData {
    x: number,
    y: number,
    width: number,
    height: number,
    rotate: number,
}

export interface IImgEditorManifest {
    version: string,
    filename: string,
    filters: IImgFilters,
    crop: ICropData | null,
    updatedAt: string,
}
