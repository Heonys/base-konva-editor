import { DrawType, type DrawContext } from "@/types";
import { atom } from "jotai";

export const drawContextAtom = atom<DrawContext>({
  type: DrawType.NONE,
  color: "#000",
  shapes: [],
});
