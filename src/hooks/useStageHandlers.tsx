import type Konva from "konva";
import { useDrawContext } from "./useDrawContext";
import { useRef, useState } from "react";
import { DrawType } from "@/types";

export const useStageHandlers = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const currentId = useRef(0);

  const { drawContext, addShape, setDrawContext } = useDrawContext();

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { type, color } = drawContext;

    setIsDrawing(true);
    const stage = e.target.getStage()!;
    const position = stage.getPointerPosition();
    if (!position) return;

    switch (type) {
      case DrawType.FREE: {
        addShape({
          id: currentId.current,
          type,
          color,
          points: [position.x, position.y],
        });
      }
    }
  };

  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { shapes } = drawContext;
    if (!isDrawing) return;

    const stage = e.target.getStage()!;
    const position = stage.getPointerPosition();
    if (!position) return;

    const currentShape = shapes.find((shape) => shape.id === currentId.current);
    if (!currentShape) return;

    switch (currentShape.type) {
      case DrawType.FREE: {
        const updatedShapes = shapes.map((it) => {
          return it.id === currentId.current
            ? { ...it, points: [...currentShape.points, position.x, position.y] }
            : it;
        });

        setDrawContext((prev) => ({
          ...prev,
          shapes: updatedShapes,
        }));
      }
    }
  };

  const onMouseUp = () => {
    setIsDrawing(false);
    currentId.current++;
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
