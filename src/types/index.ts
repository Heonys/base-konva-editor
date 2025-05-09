export const enum DrawType {
  NONE = "NONE",
  FREE = "FREE",
  LINE = "LINE ",
  ELLIPSE = "ELLIPSE",
  RECT = "RECT",
  POLYGON = "POLYGON",
}

export type DrawContext = {
  type: DrawType;
  color: string;
  shapes: Shape[];
};

export type Shape =
  | FreeDrawShapeType
  | LineShapeType
  | RectShapeType
  | EllipseShapeType
  | PolygonShapeType;

export type FreeDrawShapeType = {
  id: number;
  type: DrawType.FREE;
  points: number[];
  color?: string;
  strokeWidth?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
};

export type LineShapeType = {
  id: number;
  type: DrawType.LINE;
  points: number[];
  color?: string;
  strokeWidth?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
};

export type RectShapeType = {
  id: number;
  type: DrawType.RECT;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
};

export type EllipseShapeType = {
  id: number;
  type: DrawType.ELLIPSE;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  color?: string;
};

export type PolygonShapeType = {
  id: number;
  type: DrawType.POLYGON;
  points: number[];
  color?: string;
  strokeWidth?: number;
};
