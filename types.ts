export interface FloatingImage {
  id: number;
  x: number;
  y: number;
  seed: number;
  rotation: number;
  scale: number;
  speed: number;
}

export type LoadingStage = 0 | 1 | 2 | 3 | 4;