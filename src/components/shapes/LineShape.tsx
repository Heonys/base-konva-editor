import { Line } from "react-konva";
import type { FreeDrawShapeType, LineShapeType } from "@/types";

type Props = {
  shape: FreeDrawShapeType | LineShapeType;
};

export const LineShape = ({ shape }: Props) => {
  const handleMouseEnter = () => {
    document.body.style.cursor = "pointer";
  };
  const handleMouseLeave = () => {
    document.body.style.cursor = "default";
  };

  return (
    <Line
      points={shape.points}
      stroke={shape.stroke}
      strokeWidth={shape.strokeWidth}
      lineCap="round"
      lineJoin="round"
      tension={0.2}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
