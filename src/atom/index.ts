import { DrawType, type DrawContext } from "@/types";
import { atom } from "jotai";

export const drawContextAtom = atom<DrawContext>({
  type: DrawType.NONE,
  fill: "#fff",
  stroke: "#000",
  strokeWidth: 5,
  shapes: [],
});
