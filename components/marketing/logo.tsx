import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg border border-border bg-surface",
          sizes[size]
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-1.5 grid grid-cols-3 grid-rows-3 gap-px">
          <div className="rounded-[1px] bg-foreground" />
          <div className="rounded-[1px] bg-foreground/20" />
          <div className="rounded-[1px] bg-foreground" />
          <div className="rounded-[1px] bg-foreground/20" />
          <div className="rounded-full bg-accent" />
          <div className="rounded-[1px] bg-foreground/20" />
          <div className="rounded-[1px] bg-foreground" />
          <div className="rounded-[1px] bg-foreground/20" />
          <div className="rounded-[1px] bg-foreground" />
        </div>
      </div>
      <span className={cn("font-heading font-semibold tracking-tight", textSizes[size])}>
        Calie
      </span>
    </div>
  );
}
