// actions/create-board/schema.ts
import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string()
    .min(3, "Минимум 3 символа")
    .max(60, "Максимум 60 символов"),
  /**
   * В проекте Antonio это обычно строка формата:
   * "id|thumbUrl|fullUrl|linkHtml|authorName"
   */
  image: z.string().min(1, "Выберите обложку"),
});
