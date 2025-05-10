import type Konva from "konva";
import { useDrawContext } from "./useDrawContext";
import { useRef, useState } from "react";
import { DrawType } from "@/types";

export const useStageHandlers = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPolygon, setIsPolygon] = useState(false);
  const currentId = useRef(0);

  const { drawContext, addShape, updateLastShape, getLastShape } = useDrawContext();

  const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { type, fill, stroke, strokeWidth } = drawContext;

    setIsDrawing(true);
    const stage = e.target.getStage()!;
    const position = stage.getPointerPosition();
    if (!position) return;

    switch (type) {
      case DrawType.FREE:
      case DrawType.LINE: {
        addShape({
          id: currentId.current,
          type,
          fill,
          stroke,
          strokeWidth,
          points: [position.x, position.y],
        });
        return;
      }
      case DrawType.RECT: {
        addShape({
          id: currentId.current,
          type,
          fill,
          stroke,
          strokeWidth,
          x: position.x,
          y: position.y,
          width: 0,
          height: 0,
          startX: position.x,
          startY: position.y,
        });
        return;
      }
      case DrawType.ELLIPSE: {
        addShape({
          id: currentId.current,
          type,
          fill,
          stroke,
          strokeWidth,
          x: position.x,
          y: position.y,
          radiusX: 0,
          radiusY: 0,
          startX: position.x,
          startY: position.y,
        });
        return;
      }
      case DrawType.POLYGON: {
        if (!isPolygon) {
          setIsPolygon(true);
          addShape({
            id: currentId.current,
            type,
            fill,
            stroke,
            strokeWidth,
            points: [position.x, position.y, position.x, position.y],
            isClosed: false,
          });
        } else {
          updateLastShape(type, (shape) => ({
            ...shape,
            points: [...shape.points, position.x, position.y],
          }));
        }
        return;
      }
    }
  };

  const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;

    const stage = e.target.getStage()!;
    const position = stage.getPointerPosition();
    if (!position) return;

    const { shapes } = drawContext;
    const currentShape = shapes.find((shape) => shape.id === currentId.current);
    if (!currentShape) return;

    switch (currentShape.type) {
      case DrawType.FREE: {
        updateLastShape(currentShape.type, (shape) => ({
          ...shape,
          points: [...shape.points, position.x, position.y],
        }));
        return;
      }
      case DrawType.LINE: {
        updateLastShape(currentShape.type, (shape) => ({
          ...shape,
          points: [shape.points[0], shape.points[1], position.x, position.y],
        }));
        return;
      }
      case DrawType.RECT: {
        updateLastShape(currentShape.type, (shape) => {
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
        updateLastShape(currentShape.type, (shape) => {
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
        updateLastShape(currentShape.type, (shape) => {
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
        currentId.current++;
      }
      return;
    }
    setIsDrawing(false);
    currentId.current++;
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
