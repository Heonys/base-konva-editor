import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";

import { useStageHandlers, useDrawContext } from "@/hooks";
import { LineShape } from "@/components/shapes";
import { DrawType } from "@/types";

export const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const handlers = useStageHandlers();
  const { drawContext } = useDrawContext();

  return (
    <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} {...handlers}>
      <Layer>
        {drawContext.shapes.map((shape) => {
          if (shape.type === DrawType.FREE) {
            return (
              <LineShape
                key={shape.id}
                shape={shape}
                draggable={drawContext.type === DrawType.NONE}
              />
            );
          }
          return null;
        })}
      </Layer>
    </Stage>
  );
};
