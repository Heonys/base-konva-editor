import { Group, Line, Circle } from "react-konva";
import type { PolygonShapeType } from "@/types";
import type { Vector2d } from "konva/lib/types";

type Props = {
  shape: PolygonShapeType;
  draggable: boolean;
  onClose: () => void;
};

export const PolygonShape = ({ shape, draggable, onClose }: Props) => {
  const { points, stroke, strokeWidth, fill, isClosed } = shape;

  const numberToVector = (points: number[]): Vector2d[] => {
    const result = [];
    for (let i = 0; i < points.length - 2; i += 2) {
      result.push({ x: points[i], y: points[i + 1] });
    }
    return result;
  };

  const checkPolygonClosed = (point: Vector2d) => {
    return points.length > 6 && points[0] === point.x && points[1] === point.y;
  };

  return (
    <Group draggable={draggable}>
      <Line
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        lineJoin="round"
        closed={isClosed}
      />

      {numberToVector(points).map((point, index) => (
        <Circle
          key={index}
          x={point.x}
          y={point.y}
          radius={5}
          fill="white"
          stroke="dodgerblue"
          onMouseDown={(e) => {
            if (checkPolygonClosed(point)) {
              onClose();
            } else {
              e.cancelBubble = true;
            }
          }}
        />
      ))}
    </Group>
  );
};
