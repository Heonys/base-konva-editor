import { Rect } from "react-konva";
import type { RectShapeType } from "@/types";

type Props = {
  shape: RectShapeType;
  draggable: boolean;
};

export const RectShape = ({ shape, draggable }: Props) => {
  const { x, y, width, height, fill, stroke } = shape;

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      draggable={draggable}
    />
  );
};
