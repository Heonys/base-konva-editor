import { DrawType, type DrawContext, type Shape } from "@/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const DEFAULT_CONTEXT = {
  type: DrawType.NONE,
  fill: "#fff",
  stroke: "#000",
  strokeWidth: 5,
  shapes: [],
};

export const drawContextAtom = atomWithStorage<DrawContext>("drawContext", DEFAULT_CONTEXT);

export const undoStackAtom = atom<Shape[][]>([]);
export const redoStackAtom = atom<Shape[][]>([]);
