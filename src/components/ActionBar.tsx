// import { useState } from "react";
import { ActionButton } from "@/components/actions";

export const ActionBar = () => {
  // const [isDrawing, setIsDrawing] = useState(false);

  return (
    <div className="absolute left-1/2 top-1/2 flex gap-4">
      <ActionButton iconName="draw" index={1} />
      <ActionButton iconName="arrow-right" index={2} />
      <ActionButton iconName="line" index={3} />
      <ActionButton iconName="square" index={4} />
      <ActionButton iconName="ellipse" index={5} />
      <ActionButton iconName="shape" index={6} />
      <ActionButton iconName="cursor" index={7} />
    </div>
  );
};
