import { z } from "zod";

export const UpdateCard = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string("description is required.")
      .min(3, { message: "minimum length is 3." })
  ),
  title: z.optional(
    z.optional(
      z.string("title is required.").min(3, { message: "minimum length is 3." })
    )
  ),
  id: z.string(),
});
