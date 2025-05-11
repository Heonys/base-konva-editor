import type { ComponentPropsWithoutRef } from "react";
import { StaticIcon, type IconNames } from "@/icons/StaticIcon";
import { twMerge } from "tailwind-merge";

type Props = {
  iconName: IconNames;
  size?: number;
  label?: string;
  hover?: boolean;
} & ComponentPropsWithoutRef<"button">;

export const ActionButton = ({
  iconName,
  size = 25,
  hover = true,
  className,
  label,
  ...props
}: Props) => {
  return (
    <button
      className={twMerge(
        "relative p-2 rounded-lg select-none opacity-80 outline-none",
        "flex cursor-pointer items-center justify-center",
        hover ? "transition-transform hover:scale-105 hover:opacity-100" : "",
        className,
      )}
      {...props}
    >
      <StaticIcon iconName={iconName} size={size} />
      <div className="absolute translate-y-4/5 bottom-0 text-xs text-black/50 capitalize">
        {label}
      </div>
    </button>
  );
};
