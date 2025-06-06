import { useState } from "react";
import { nanoid } from "nanoid";
import type Konva from "konva";
import type { Vector2d } from "konva/lib/types";

import { useDrawContext, useHistory } from "@/hooks";
import { DrawType } from "@/types";

export const useStageHandlers = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPolygon, setIsPolygon] = useState(false);

  const { drawContext, addShape, updateLastShape, getLastShape } = useDrawContext();
  const { pushUndoStack, clearRedoStack } = useHistory();

  const createShape = (type: DrawType, position: Vector2d) => {
    const id = nanoid(10);
    const { fill, stroke, strokeWidth } = drawContext;
    const baseShape = { id, fill, stroke, strokeWidth };

    switch (type) {
      case DrawType.FREE:
      case DrawType.LINE: {
        return addShape({
          ...baseShape,
          type,
          points: [position.x, position.y],
        });
      }
      case DrawType.RECT: {
        return addShape({
          ...baseShape,
          type,
          x: position.x,
          y: position.y,
          width: 0,
          height: 0,
          startX: position.x,
          startY: position.y,
        });
      }
      case DrawType.ELLIPSE: {
        return addShape({
          ...baseShape,
          type,
          x: position.x,
          y: position.y,
          radiusX: 0,
          radiusY: 0,
          startX: position.x,
          startY: position.y,
        });
      }
      case DrawType.POLYGON: {
        return addShape({
          ...baseShape,
          type,
          points: [position.x, position.y, position.x, position.y],
          isClosed: false,
        });
      }
    }
  };

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { type } = drawContext;
    if (type === DrawType.NONE) return;

    setIsDrawing(true);
    const stage = e.target.getStage()!;
    const position = stage.getRelativePointerPosition();
    if (!position) return;

    if (type !== DrawType.POLYGON) {
      pushUndoStack(drawContext.shapes);
      createShape(type, position);
    } else {
      if (!isPolygon) {
        setIsPolygon(true);
        pushUndoStack(drawContext.shapes);
        createShape(type, position);
      } else {
        updateLastShape<typeof type>((shape) => ({
          ...shape,
          points: [...shape.points, position.x, position.y],
        }));
      }
    }
  };

  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage()!;
    const position = stage.getRelativePointerPosition();
    if (!position) return;

    const { shapes } = drawContext;
    const currentShape = shapes.find((shape) => shape.id === getLastShape()!.id);
    if (!currentShape) return;

    switch (currentShape.type) {
      case DrawType.FREE: {
        updateLastShape<typeof currentShape.type>((shape) => ({
          ...shape,
          points: [...shape.points, position.x, position.y],
        }));
        return;
      }
      case DrawType.LINE: {
        updateLastShape<typeof currentShape.type>((shape) => ({
          ...shape,
          points: [shape.points[0], shape.points[1], position.x, position.y],
        }));
        return;
      }
      case DrawType.RECT: {
        updateLastShape<typeof currentShape.type>((shape) => {
          const dx = position.x - shape.startX;
          const dy = position.y - shape.startY;
          return {
            ...shape,
            x: dx < 0 ? position.x : shape.startX,
            y: dy < 0 ? position.y : shape.startY,
            width: Math.abs(dx),
            height: Math.abs(dy),
          };
        });
        return;
      }
      case DrawType.ELLIPSE: {
        updateLastShape<typeof currentShape.type>((shape) => {
          const { startX, startY } = shape;
          const dx = position.x - startX;
          const dy = position.y - startY;

          return {
            ...shape,
            radiusX: Math.abs(dx),
            radiusY: Math.abs(dy),
            x: dx < 0 ? position.x : startX,
            y: dy < 0 ? position.y : startY,
          };
        });
        return;
      }
      case DrawType.POLYGON: {
        updateLastShape<typeof currentShape.type>((shape) => {
          const points = [...shape.points];
          points[points.length - 2] = position.x;
          points[points.length - 1] = position.y;
          return { ...shape, points };
        });
        return;
      }
    }
  };

  const onMouseUp = () => {
    if (isPolygon) {
      const shape = getLastShape();
      if (shape?.isClosed) {
        setIsPolygon(false);
        setIsDrawing(false);
        clearRedoStack();
      }
      return;
    }
    clearRedoStack();
    setIsDrawing(false);
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
