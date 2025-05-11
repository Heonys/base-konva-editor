import { useRef } from "react";
import Konva from "konva";
import { Stage, Layer } from "react-konva";

import { useStageHandlers, useDrawContext } from "@/hooks";
import { LineShape, RectShape, EllipseShape, PolygonShape } from "@/components/shapes";
import { DrawType } from "@/types";

export const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const handlers = useStageHandlers();
  const { drawContext, updateLastShape } = useDrawContext();

  return (
    <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} {...handlers}>
      <Layer>
        {drawContext.shapes.map((shape) => {
          switch (shape.type) {
            case DrawType.FREE:
            case DrawType.LINE: {
              return <LineShape key={shape.id} shape={shape} />;
            }
            case DrawType.RECT: {
              return <RectShape key={shape.id} shape={shape} />;
            }
            case DrawType.ELLIPSE: {
              return <EllipseShape key={shape.id} shape={shape} />;
            }
            case DrawType.POLYGON: {
              return (
                <PolygonShape
                  key={shape.id}
                  shape={shape}
                  onClose={() => {
                    updateLastShape(shape.type, (shape) => {
                      const points = [...shape.points];
                      points[points.length - 2] = shape.points[0];
                      points[points.length - 1] = shape.points[1];
                      return { ...shape, points, isClosed: true };
                    });
                  }}
                />
              );
            }
          }
        })}
      </Layer>
    </Stage>
  );
};
