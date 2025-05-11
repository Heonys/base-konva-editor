import { useAtom } from "jotai";
import { drawContextAtom } from "@/atom";
import type { DrawType, Shape, ShapeMap } from "@/types";

export const useDrawContext = () => {
  const [drawContext, setDrawContext] = useAtom(drawContextAtom);

  const setDrawType = (type: DrawType) => {
    setDrawContext((prev) => ({ ...prev, type }));
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

  const updateLastShape = <T extends keyof ShapeMap>(
    _: T,
    fn: (shape: ShapeMap[T]) => ShapeMap[T],
  ) => {
    setDrawContext((prev) => {
      if (prev.shapes.length === 0) return prev;

      const updatedShapes = [...prev.shapes];
      const lastIndex = updatedShapes.length - 1;
      updatedShapes[lastIndex] = fn(updatedShapes[lastIndex] as ShapeMap[T]);

      return { ...prev, shapes: updatedShapes };
    });
  };

  const getLastShape = () => {
    const { shapes } = drawContext;
    return shapes.length > 0 ? shapes[shapes.length - 1] : null;
  };

  const onUndo = () => {};

  const onRedo = () => {};

  return {
    setDrawContext,
    drawContext,
    setDrawType,
    addShape,
    removeShape,
    updateLastShape,
    getLastShape,
    onUndo,
    onRedo,
  };
};
