interface Options {
  target?: HTMLElement;
  bounding?: HTMLElement;
  edgeLock?: boolean;
  onMove?: (left: number, top: number) => void;
  onEnd?: () => void;
}

export function zxxDrag(eleBar: HTMLElement, options: Options): void;
