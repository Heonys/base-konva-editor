import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";

import { useStageHandlers, useDrawContext } from "@/hooks";
import { LineShape, RectShape, EllipseShape } from "@/components/shapes";
import { DrawType } from "@/types";

export const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const handlers = useStageHandlers();
  const { drawContext } = useDrawContext();

  return (
    <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} {...handlers}>
      <Layer>
        {drawContext.shapes.map((shape) => {
          const draggable = drawContext.type === DrawType.NONE;

          switch (shape.type) {
            case DrawType.FREE:
            case DrawType.LINE: {
              return <LineShape key={shape.id} shape={shape} draggable={draggable} />;
            }
            case DrawType.RECT: {
              return <RectShape key={shape.id} shape={shape} draggable={draggable} />;
            }
            case DrawType.ELLIPSE: {
              return <EllipseShape key={shape.id} shape={shape} draggable={draggable} />;
            }
          }
        })}
      </Layer>
    </Stage>
  );
};
