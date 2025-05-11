import { Rect } from "react-konva";
import type { RectShapeType } from "@/types";

type Props = {
  shape: RectShapeType;
};

export const RectShape = ({ shape }: Props) => {
  const { x, y, width, height, fill, stroke } = shape;

  return <Rect x={x} y={y} width={width} height={height} fill={fill} stroke={stroke} />;
};
