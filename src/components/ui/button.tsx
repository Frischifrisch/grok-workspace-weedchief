import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-medium transition-[background-color,color,opacity,transform,box-shadow] duration-150 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96]",
  {
    variants: {
      variant: {
        accent: "bg-accent text-accent-fg hover:bg-accent-hover",
        raised: "border border-line bg-raised text-fg hover:border-accent/40",
        ghost: "text-muted hover:text-fg",
      },
      size: {
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-6 text-sm",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "accent", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
