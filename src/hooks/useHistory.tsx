import { useAtom } from "jotai";
import { redoStackAtom, undoStackAtom } from "@/atom";
import type { Shape } from "@/types";
import { useDrawContext } from "@/hooks";

const MAX_HISTORY = 40;

export const useHistory = () => {
  const [undoStack, setUndoStack] = useAtom(undoStackAtom);
  const [redoStack, setRedoStack] = useAtom(redoStackAtom);
  const { drawContext, setDrawContext } = useDrawContext();

  const pushUndoStack = (shapes: Shape[]) => {
    setUndoStack((prev) => {
      const newStack = [...prev, shapes];
      return newStack.length > MAX_HISTORY ? newStack.slice(-MAX_HISTORY) : newStack;
    });
  };

  const clearRedoStack = () => setRedoStack([]);

  const pushRedoStack = (shapes: Shape[]) => {
    setRedoStack((prev) => {
      const newStack = [...prev, shapes];
      return newStack.length > MAX_HISTORY ? newStack.slice(-MAX_HISTORY) : newStack;
    });
  };

  const popUndoStack = () => {
    const last = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    return last;
  };

  const popRedoStack = () => {
    const last = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    return last;
  };

  const undo = () => {
    if (undoStack.length > 0) {
      pushRedoStack(drawContext.shapes);
      const previous = popUndoStack();
      if (previous) {
        setDrawContext((prev) => ({ ...prev, shapes: previous }));
      }
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      pushUndoStack(drawContext.shapes);
      const next = popRedoStack();
      if (next) {
        setDrawContext((prev) => ({ ...prev, shapes: next }));
      }
    }
  };

  return { pushUndoStack, clearRedoStack, undo, redo };
};
