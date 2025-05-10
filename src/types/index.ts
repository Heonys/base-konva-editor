export const enum DrawType {
  NONE = "NONE",
  FREE = "FREE",
  LINE = "LINE",
  ELLIPSE = "ELLIPSE",
  RECT = "RECT",
  POLYGON = "POLYGON",
}

export type DrawContext = {
  type: DrawType;
  fill: string;
  stroke: string;
  strokeWidth: number;
  shapes: Shape[];
};

export type Shape =
  | FreeDrawShapeType
  | LineShapeType
  | RectShapeType
  | EllipseShapeType
  | PolygonShapeType;

export type ShapeMap = {
  [DrawType.FREE]: FreeDrawShapeType;
  [DrawType.LINE]: LineShapeType;
  [DrawType.RECT]: RectShapeType;
  [DrawType.ELLIPSE]: EllipseShapeType;
  [DrawType.POLYGON]: PolygonShapeType;
};

type BaseShape<T extends DrawType> = {
  id: number;
  type: T;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  isClosed?: boolean;
};

export type FreeDrawShapeType = BaseShape<DrawType.FREE> & { points: number[] };
export type LineShapeType = BaseShape<DrawType.LINE> & { points: number[] };
export type PolygonShapeType = BaseShape<DrawType.POLYGON> & { points: number[] };

export type RectShapeType = BaseShape<DrawType.RECT> & {
  x: number;
  y: number;
  width: number;
  height: number;
  startX: number;
  startY: number;
};
export type EllipseShapeType = BaseShape<DrawType.ELLIPSE> & {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  startX: number;
  startY: number;
};
