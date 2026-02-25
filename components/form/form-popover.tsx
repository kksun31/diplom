"use client";

import * as React from "react";
import Image from "next/image";

import { createBoard } from "@/actions/create-board";
import { getPexelsImages } from "@/actions/get-pexels-image";
import { X } from "lucide-react";

import { toast } from "sonner";



// shadcn/radix popover (пути могут отличаться в твоём проекте)
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PexelsImageItem = {
  id: string;
  thumbUrl: string;
  fullUrl: string;
  linkHTML: string;
  userName: string;
};

type Props = {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
};

export function FormPopover({
  children,
  side = "bottom",
  sideOffset = 8,
  align = "center",
}: Props) {
  const [title, setTitle] = React.useState("");
  const [images, setImages] = React.useState<PexelsImageItem[]>([]);
  const [selected, setSelected] = React.useState<PexelsImageItem | null>(null);

  const [isLoadingImages, setIsLoadingImages] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<"title" | "image", string[]>>
  >({});

  const [open, setOpen] = React.useState(false);

  const loadImages = React.useCallback(async () => {
    setError(null);
    setIsLoadingImages(true);
    try {
      const data = await getPexelsImages(9);
      setImages(data);
      setSelected(data[0] || null);
    } catch {
      setError("Не удалось загрузить изображения Pexels.");
    } finally {
      setIsLoadingImages(false);
    }
  }, []);

  React.useEffect(() => {
    if (!open) return;
    // подгружаем картинки только когда поповер открылся
    if (images.length === 0) loadImages();
  }, [open, images.length, loadImages]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      if (!selected) {
        setFieldErrors({ image: ["Выберите обложку"] });
        return;
      }

      // формат строки такой же, как парсится в server action
      const image = `${selected.id}|${selected.thumbUrl}|${selected.fullUrl}|${selected.linkHTML}|${selected.userName}`;

      const res = await createBoard({ title, image });

      if (res?.fieldErrors) {
        setFieldErrors(res.fieldErrors as any);
        return;
      }

      if (res?.error) {
        setError(res.error);
        return;
      }

      // успех: закрываем поповер и сбрасываем форму
      toast.success("Получилось!", {
        description: `Доска «${title}» успешно создана`,
    });

    setTitle("");
    setSelected(null);
    setImages([]);
    setOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>

      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="w-80"
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-neutral-700">
                Создать доску
            </div>

            <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-sm p-1 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition"
                aria-label="Закрыть"
            >
                <X className="h-4 w-4" />
            </button>
            </div>


          {/* Images */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-neutral-600">Обложка </p>
              <button
                type="button"
                className="text-xs underline"
                onClick={loadImages}
                disabled={isLoadingImages || isSubmitting}
              >
                Обновить
              </button>
            </div>

            {isLoadingImages ? (
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-video w-full animate-pulse rounded-md border"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {images.map((img) => {
                  const isSelected = selected?.id === img.id;

                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setSelected(img)}
                      className={[
                        "relative aspect-video w-full overflow-hidden rounded-md border",
                        isSelected ? "ring-2" : "",
                      ].join(" ")}
                      disabled={isSubmitting}
                      aria-label="Выбрать обложку"
                    >
                      <Image
                        src={img.thumbUrl}
                        alt="Board cover"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 200px"
                        unoptimized
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {fieldErrors.image?.length ? (
              <p className="text-xs text-red-500">{fieldErrors.image[0]}</p>
            ) : null}
          </div>

          {/* Title */}
          <form onSubmit={onSubmit} className="space-y-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-neutral-600">
                Название
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2"
                placeholder="Например: Мои задачи"
                disabled={isSubmitting}
              />
              {fieldErrors.title?.length ? (
                <p className="text-xs text-red-500">{fieldErrors.title[0]}</p>
              ) : null}
            </div>

            {error ? <p className="text-xs text-red-500">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting || isLoadingImages}
              className="w-full rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-60"
            >
              {isSubmitting ? "Создаю..." : "Создать"}
            </button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
