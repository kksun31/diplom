// actions/create-board/types.ts
import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

export type InputType = z.infer<typeof CreateBoard>;

export type OutputType = {
  id: string;
};

export type ReturnType = ActionState<InputType, OutputType>;
