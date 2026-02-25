import { z } from "zod";

export const CreateCard = z.object({
  title: z.string("Название обязательно").min(3, {
    message: "Название слишком короткое",
  }),
  boardId: z.string(),
  listId: z.string(),
});
