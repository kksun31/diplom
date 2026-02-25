import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      error: (iss) =>
        iss.input === undefined ? "Field is required" : "Invalid input.",
    })
    .min(3, {
      message: "Title is too short",
    }),
  image: z.string("image is required"),
});
