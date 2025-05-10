import { Stage, Layer, Line, Rect, Circle } from "react-konva";
import { useState } from "react";

type Vector2 = { x: number; y: number };

export const Polygon = () => {
  const [points, setPoints] = useState<Vector2[]>([]);
  const [nextPoint, setNextPoint] = useState<Vector2>({ x: 0, y: 0 });
  const [isComplete, setIsComplete] = useState(false);

  const addPoint = (point: Vector2) => {
    setPoints((prev) => [...prev, point]);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Line
          strokeWidth={3}
          stroke="black"
          opacity={0.3}
          lineJoin="round"
          closed={isComplete}
          points={points.flatMap((point) => [point.x, point.y]).concat([nextPoint.x, nextPoint.y])}
        />

        <Rect
          x={0}
          y={0}
          width={window.innerWidth}
          height={window.innerHeight}
          onClick={(event) => {
            if (!isComplete) {
              const x = event.evt.offsetX;
              const y = event.evt.offsetY;
              addPoint({ x, y });
            }
          }}
          onMouseMove={(event) => {
            if (!isComplete) {
              const x = event.evt.offsetX;
              const y = event.evt.offsetY;
              setNextPoint({ x, y });
            }
          }}
        />

        {points[0] && !isComplete && (
          <PolygonOriginAnchor
            point={points[0]}
            onValidClick={() => {
              setPoints(points);
              setNextPoint(points[0]);
              setIsComplete(true);
            }}
            onValidMouseOver={() => {
              setNextPoint(points[0]);
            }}
            validateMouseEvents={() => {
              return points.length > 2;
            }}
          />
        )}
      </Layer>
    </Stage>
  );
};

type PolygonOriginAnchorProps = {
  point: Vector2;
  onValidClick: () => void;
  onValidMouseOver: () => void;
  validateMouseEvents: () => boolean;
};

function PolygonOriginAnchor(props: PolygonOriginAnchorProps) {
  const isValid = props.validateMouseEvents();
  const [fill, setFill] = useState("transparent");

  return (
    <Anchor
      point={props.point}
      fill={fill}
      onClick={() => {
        if (isValid) {
          props.onValidClick();
        }
      }}
      onMouseOver={() => {
        if (isValid) {
          document.body.style.cursor = "pointer";
          setFill("green");
          props.onValidMouseOver();
        } else {
          document.body.style.cursor = "not-allowed";
          setFill("red");
        }
      }}
      onMouseOut={() => {
        setFill("transparent");
      }}
    />
  );
}

type AnchorProps = {
  point: Vector2;
  fill: string;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
};

function Anchor(props: AnchorProps) {
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <Circle
      x={props.point.x}
      y={props.point.y}
      radius={10}
      stroke="#666"
      fill={props.fill}
      strokeWidth={strokeWidth}
      onMouseOver={() => {
        document.body.style.cursor = "pointer";
        setStrokeWidth(3);
        props.onMouseOver();
      }}
      onMouseOut={() => {
        document.body.style.cursor = "default";
        setStrokeWidth(2);
        props.onMouseOut();
      }}
      onClick={() => {
        document.body.style.cursor = "default";
        props.onClick();
      }}
    />
  );
}
