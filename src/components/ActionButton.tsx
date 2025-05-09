import type { ComponentPropsWithoutRef } from "react";
import { StaticIcon, type IconNames } from "@/icons/StaticIcon";
import { twMerge } from "tailwind-merge";

type Props = {
  iconName: IconNames;
  size?: number;
} & ComponentPropsWithoutRef<"button">;

export const ActionButton = ({ iconName, size = 25, className, ...props }: Props) => {
  return (
    <button
      className={twMerge(
        "relative p-2 rounded-lg select-none",
        "flex cursor-pointer opacity-100 items-center justify-center",
        "transition-transform hover:scale-105 hover:opacity-100 outline-none",
        "opacity-80",
        className,
      )}
      {...props}
    >
      <StaticIcon iconName={iconName} size={size} />
    </button>
  );
};
