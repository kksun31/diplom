import { z } from "zod";

export const CreateList = z.object({
  title: z.string("Название обязательно").min(3, {
    message: "Название слишком короткое",
  }),
  boardId: z.string(),
});
