import { useState, type RefCallback, useCallback } from "react";

export type CanvasRef = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const useCanvasRect = () => {
  const [canvasRect, setCanvasRef] = useState<CanvasRef>();

  const canvasRef: RefCallback<HTMLDivElement> = useCallback((el) => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        const { x, y } = entry.target.getBoundingClientRect();

        setCanvasRef({ x, y, width, height });
      }
    });

    if (el) {
      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return { canvasRef, canvasRect };
};
