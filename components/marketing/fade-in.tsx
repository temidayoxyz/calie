"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              y: direction === "up" ? motionTokens.scroll.y : 0,
            }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
