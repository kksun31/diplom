"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "primary",
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size={"sm"}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
