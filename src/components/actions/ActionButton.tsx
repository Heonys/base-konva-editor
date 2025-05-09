import type { ComponentPropsWithoutRef } from "react";
import { StaticIcon, type IconNames } from "@/icons/StaticIcon";
import { twMerge } from "tailwind-merge";

type Props = {
  iconName: IconNames;
  size?: number;
  index: number;
} & ComponentPropsWithoutRef<"button">;

export const ActionButton = ({ iconName, size = 28, className, index, ...props }: Props) => {
  return (
    <button
      className={twMerge(
        "relative p-3 rounded-lg",
        "flex cursor-pointer opacity-100 items-center justify-center",
        "transition-transform hover:scale-110 hover:opacity-100 outline-none",
        "opacity-80",
        className,
      )}
      {...props}
    >
      <StaticIcon iconName={iconName} size={size} />
      <div className="absolute bottom-0.5 right-0.5 text-sm text-black/30">{index}</div>
    </button>
  );
};
