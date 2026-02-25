import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string("Описание обязательно.")
      .min(3, { message: "Минимальная длина — 3 символа." })
  ),
  title: z.optional(
    z.optional(
      z
        .string("Название обязательно.")
        .min(3, { message: "Минимальная длина — 3 символа." })
    )
  ),
  id: z.string(),
});
