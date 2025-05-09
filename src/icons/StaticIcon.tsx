import type { IconBaseProps } from "react-icons";
import { HiOutlineArrowLongRight, HiOutlinePencil } from "react-icons/hi2";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoEllipseOutline, IoSquareOutline, IoShapesOutline } from "react-icons/io5";
import { LuEraser } from "react-icons/lu";
import { RiCursorFill } from "react-icons/ri";

export type IconNames = keyof typeof IconMap;
const IconMap = {
  ["draw"]: HiOutlinePencil,
  ["arrow-right"]: HiOutlineArrowLongRight,
  ["line"]: TfiLayoutLineSolid,
  ["ellipse"]: IoEllipseOutline,
  ["square"]: IoSquareOutline,
  ["shape"]: IoShapesOutline,
  ["cursor"]: RiCursorFill,
  ["eraser"]: LuEraser,
};

type Props = {
  iconName: keyof typeof IconMap;
} & IconBaseProps;

export const StaticIcon = ({ iconName, ...props }: Props) => {
  const Icon = IconMap[iconName];
  return <Icon {...props} />;
};
