import { z } from "zod";

export const UpdateBoard = z.object({
  title: z.string("Название обязательно").min(3, {
    message: "Название слишком короткое",
  }),
  id: z.string(),
});
