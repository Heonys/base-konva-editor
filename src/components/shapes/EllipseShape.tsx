import { Ellipse } from "react-konva";
import type { EllipseShapeType } from "@/types";

type Props = {
  shape: EllipseShapeType;
};

export const EllipseShape = ({ shape }: Props) => {
  const { x, y, radiusX, radiusY, fill, stroke } = shape;

  return <Ellipse x={x} y={y} radiusX={radiusX} radiusY={radiusY} fill={fill} stroke={stroke} />;
};
