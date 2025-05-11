import { useEffect, useRef, useState } from "react";
import Slider from "rc-slider";

import { ActionButton } from "@/components";

type Props = {
  value: number;
  onChange: (newValue: number) => void;
};

export const SliderButton = ({ value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div ref={containerRef} className="relative" onClick={() => setIsOpen(true)}>
      <ActionButton iconName="stroke" label="Weight" hover={false} />
      {isOpen && (
        <div className="absolute top-full left-1/2 flex h-40 w-12 -translate-x-1/2 flex-col items-center justify-center gap-2 py-2 bg-white shadow-xl">
          <Slider
            vertical
            min={5}
            max={50}
            step={1}
            value={value}
            onChange={(strokeWidth) => {
              onChange(strokeWidth as number);
            }}
            className="mt-2 cursor-pointer"
            styles={{
              track: { background: "black" },
              handle: { visibility: "hidden" },
              rail: { background: "#d8d8d8" },
            }}
          />
          <div className="text-sm font-bold text-black/30">{`${value}px`}</div>
        </div>
      )}
    </div>
  );
};

export default Slider;
