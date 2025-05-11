import { useEffect, useRef, useState } from "react";
import Block from "@uiw/react-color-block";

type Props = {
  color: string;
  onChange: (newColor: string) => void;
  label?: string;
};

export const ColorPicker = ({ color, onChange, label }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <button
      ref={containerRef}
      className="relative cursor-pointer p-2 flex justify-center items-center"
      style={{ color }}
      onClick={() => setIsOpen(true)}
    >
      <div
        className="size-6.5 border rounded-sm border-black/30"
        style={{ backgroundColor: color }}
      />
      <div className="absolute translate-y-4/5 bottom-0 text-xs text-black/50 capitalize">
        {label}
      </div>
      {isOpen && (
        <div className="absolute top-18 left-1/2 -translate-x-1/2">
          <Block color={color} onChange={(color) => onChange(color.hex)} />
        </div>
      )}
    </button>
  );
};
