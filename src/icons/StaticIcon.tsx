import type { IconBaseProps } from "react-icons";
import { HiOutlinePencil } from "react-icons/hi2";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoEllipseOutline, IoSquareOutline, IoShapesOutline } from "react-icons/io5";
import { LuEraser, LuUndo2, LuRedo2 } from "react-icons/lu";
import { RiCursorFill } from "react-icons/ri";
import { RxBorderWidth } from "react-icons/rx";

export type IconNames = keyof typeof IconMap;
const IconMap = {
  ["draw"]: HiOutlinePencil,
  ["line"]: TfiLayoutLineSolid,
  ["ellipse"]: IoEllipseOutline,
  ["rect"]: IoSquareOutline,
  ["polygon"]: IoShapesOutline,
  ["cursor"]: RiCursorFill,
  ["eraser"]: LuEraser,
  ["undo"]: LuUndo2,
  ["redo"]: LuRedo2,
  ["stroke"]: RxBorderWidth,
};

type Props = {
  iconName: keyof typeof IconMap;
} & IconBaseProps;

export const StaticIcon = ({ iconName, ...props }: Props) => {
  const Icon = IconMap[iconName];
  return <Icon {...props} />;
};
