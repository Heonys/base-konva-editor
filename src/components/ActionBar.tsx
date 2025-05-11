import { ActionButton, ColorPicker, SliderButton } from "@/components";
import { DrawType } from "@/types";
import { useDrawContext, useHistory } from "@/hooks";
import type { IconNames } from "@/icons/StaticIcon";

const actionRouter: { name: IconNames; type: DrawType }[] = [
  { name: "cursor", type: DrawType.NONE },
  { name: "draw", type: DrawType.FREE },
  { name: "line", type: DrawType.LINE },
  { name: "ellipse", type: DrawType.ELLIPSE },
  { name: "rect", type: DrawType.RECT },
  { name: "polygon", type: DrawType.POLYGON },
];

export const ActionBar = () => {
  const { drawContext, setDrawContext, setDrawType, clearContext } = useDrawContext();
  const { undo, redo } = useHistory();

  return (
    <div className="fixed left-1/2 top-6 -translate-x-1/2 flex gap-3 select-none">
      <div className="flex p-2 pb-5 rounded-xl shadow-xl border border-black/20 bg-white gap-2">
        <ActionButton iconName="undo" label="undo" onClick={undo} />
        <ActionButton iconName="redo" label="redo" onClick={redo} />
        <ActionButton iconName="refresh" label="clear" onClick={clearContext} />
      </div>
      <div className="flex gap-4 p-2 pb-5 rounded-xl shadow-xl border border-black/20 bg-white">
        {actionRouter.map(({ name, type }) => {
          return (
            <ActionButton
              key={name}
              iconName={name}
              className={drawContext.type === type ? "bg-blue-100" : ""}
              onClick={() => setDrawType(type)}
              label={name}
            />
          );
        })}
      </div>
      <div className="flex p-2 pb-5 rounded-xl shadow-xl border border-black/20 bg-white gap-2">
        <ColorPicker
          color={drawContext.fill}
          onChange={(fill) => setDrawContext((prev) => ({ ...prev, fill }))}
          label="fill"
        />
        <ColorPicker
          color={drawContext.stroke}
          onChange={(stroke) => setDrawContext((prev) => ({ ...prev, stroke }))}
          label="stroke"
        />
        <SliderButton
          value={drawContext.strokeWidth}
          onChange={(strokeWidth) => setDrawContext((prev) => ({ ...prev, strokeWidth }))}
        />
      </div>
    </div>
  );
};
