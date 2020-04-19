declare module 'rn-dominant-color' {
  export interface DominantColors {
    primary: string,
    secondary: string,
    background: string,
    detail: string,
  }

  export function getColorFromURL(url: string) : Promise<DominantColors>
}
