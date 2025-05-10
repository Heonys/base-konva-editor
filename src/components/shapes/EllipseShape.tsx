import { Ellipse } from "react-konva";
import type { EllipseShapeType } from "@/types";

type Props = {
  shape: EllipseShapeType;
  draggable: boolean;
};

export const EllipseShape = ({ shape, draggable }: Props) => {
  const { x, y, radiusX, radiusY, fill, stroke } = shape;

  return (
    <Ellipse
      x={x}
      y={y}
      radiusX={radiusX}
      radiusY={radiusY}
      fill={fill}
      stroke={stroke}
      draggable={draggable}
    />
  );
};
