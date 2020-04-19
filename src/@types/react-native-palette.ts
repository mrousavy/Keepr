declare module 'react-native-palette' {
  export interface Options {
    threshold?: number,
    quality?: string,
  }

  export interface Swatch {
    color: string,
    population: number,
    titleTextColor: string,
    bodyTextColor: string,
    swatchInfo: string,
  }

  export interface NamedSwatches {
    'Vibrant': Swatch,
    'Vibrant Dark': Swatch,
    'Vibrant Light': Swatch,
    'Muted': Swatch,
    'Muted Dark': Swatch,
    'Muted Light': Swatch,
  }

  export type AllSwatchesCallback = (error: Error, swatches: any) => void

  export type NamedSwatchesCallback = (error: Error, swatches: any) => void

  export function getAllSwatches(options: Options, image: string, callback: AllSwatchesCallback): void

  export function getNamedSwatches(image: string, callback: NamedSwatchesCallback): void
}
