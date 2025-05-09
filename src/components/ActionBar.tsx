import { ActionButton } from "@/components";
import { DrawType } from "@/types";
import { useDrawContext } from "@/hooks";
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
  const { drawContext, setDrawType } = useDrawContext();

  return (
    <div className="fixed left-1/2 top-6 -translate-x-1/2 flex gap-3">
      <div className="flex gap-4 p-2 px-4 rounded-xl shadow-xl border border-black/20 bg-white">
        {actionRouter.map(({ name, type }) => {
          return (
            <ActionButton
              key={name}
              iconName={name}
              className={drawContext.type === type ? "bg-blue-100 ring ring-blue-500" : ""}
              onClick={() => setDrawType(type)}
            />
          );
        })}
      </div>
      <div className="flex px-2 rounded-xl shadow-xl border border-black/20 bg-white">
        <ActionButton iconName="undo" size={20} />
        <ActionButton iconName="redo" size={20} />
      </div>
    </div>
  );
};
