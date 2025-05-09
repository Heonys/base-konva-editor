import { useAtom } from "jotai";
import { drawContextAtom } from "@/atom";
import type { DrawType, Shape } from "@/types";

export const useDrawContext = () => {
  const [drawContext, setDrawContext] = useAtom(drawContextAtom);

  const setDrawType = (type: DrawType) => {
    setDrawContext((prev) => ({ ...prev, type }));
  };

  const setColor = (color: string) => {
    setDrawContext((prev) => ({ ...prev, color }));
  };

  const addShape = (shape: Shape) => {
    setDrawContext((prev) => ({ ...prev, shapes: [...prev.shapes, shape] }));
  };

  const removeShape = (id: number) => {
    setDrawContext((prev) => ({
      ...prev,
      shapes: prev.shapes.filter((shape) => shape.id !== id),
    }));
  };

  const onUndo = () => {};

  const onRedo = () => {};

  return {
    setDrawContext,
    drawContext,
    setDrawType,
    setColor,
    addShape,
    removeShape,
    onUndo,
    onRedo,
  };
};
