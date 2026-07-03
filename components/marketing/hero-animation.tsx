"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { motionTokens } from "@/lib/constants";
import { cn } from "@/lib/utils";

const QR_SIZE = 7;
const TOTAL_MODULES = QR_SIZE * QR_SIZE;

const qrPattern = [
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1,
  0, 0, 0, 0, 0, 0, 0,
  1, 0, 1, 1, 0, 1, 0,
  0, 1, 0, 1, 1, 0, 1,
  1, 1, 0, 0, 1, 1, 1,
];

const timeSlots = ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"];

export function HeroAnimation() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(0);
  const [visibleModules, setVisibleModules] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showScan, setShowScan] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleModules(TOTAL_MODULES);
      setPhase(4);
      setShowConfirmation(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase(1), 400));

    let moduleIndex = 0;
    const moduleInterval = setInterval(() => {
      moduleIndex++;
      setVisibleModules(moduleIndex);
      if (moduleIndex >= TOTAL_MODULES) {
        clearInterval(moduleInterval);
        timers.push(setTimeout(() => setShowScan(true), 300));
        timers.push(setTimeout(() => setShowScan(false), 1200));
        timers.push(setTimeout(() => setPhase(2), 1400));
        timers.push(setTimeout(() => setSelectedSlot(1), 2200));
        timers.push(setTimeout(() => setPhase(3), 2800));
        timers.push(setTimeout(() => setShowConfirmation(true), 3400));
        timers.push(setTimeout(() => setPhase(4), 4000));
      }
    }, 35);

    return () => {
      clearInterval(moduleInterval);
      timers.forEach(clearTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      className="relative mx-auto flex w-full max-w-2xl items-center justify-center gap-6 lg:max-w-3xl lg:gap-10"
      aria-hidden="true"
    >
      {/* Booking Card */}
      <motion.div
        className="w-full max-w-[280px] rounded-xl border border-border bg-surface p-5 shadow-card lg:max-w-[300px] lg:p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionTokens.duration.slow, ease: motionTokens.ease }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold">Alex Morgan</p>
            <p className="text-xs text-muted">30 min · Intro call</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
            Thursday, July 10
          </p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot, i) => (
              <motion.button
                key={slot}
                type="button"
                tabIndex={-1}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition-all duration-fast",
                  selectedSlot === i
                    ? "border-accent bg-accent text-white"
                    : phase >= 2
                      ? "border-border bg-background text-foreground"
                      : "border-transparent bg-background/50 text-muted/40"
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: phase >= 2 ? 1 : 0.3,
                  scale: 1,
                }}
                transition={{
                  delay: phase >= 2 ? i * 0.08 : 0,
                  duration: motionTokens.duration.default,
                  ease: motionTokens.ease,
                }}
              >
                {slot}
              </motion.button>
            ))}
          </div>
        </div>

        {showConfirmation && (
          <motion.div
            className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2.5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionTokens.duration.default, ease: motionTokens.ease }}
          >
            <Check className="h-4 w-4 text-success" />
            <span className="text-xs font-medium text-success">Booked · 10:30 AM</span>
          </motion.div>
        )}
      </motion.div>

      {/* QR Code */}
      <div className="relative shrink-0">
        <motion.div
          className="rounded-xl border border-border bg-surface p-4 shadow-card lg:p-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: motionTokens.duration.slow,
            ease: motionTokens.ease,
          }}
        >
          <div
            className="grid gap-[3px]"
            style={{ gridTemplateColumns: `repeat(${QR_SIZE}, 1fr)` }}
          >
            {qrPattern.map((filled, i) => (
              <div
                key={i}
                className={cn(
                  "h-[14px] w-[14px] rounded-[2px] transition-colors duration-fast lg:h-4 lg:w-4",
                  i < visibleModules
                    ? filled
                      ? "bg-foreground"
                      : "bg-border"
                    : "bg-background"
                )}
              />
            ))}
          </div>
          <p className="mt-3 text-center font-mono text-[10px] text-muted">
            calie.app/alex
          </p>
        </motion.div>

        {/* Phone scan silhouette */}
        {showScan && (
          <motion.div
            className="absolute -right-4 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.default, ease: motionTokens.ease }}
          >
            <div className="h-28 w-14 rounded-2xl border-2 border-foreground/20 bg-foreground/5 p-1.5">
              <div className="h-full w-full rounded-xl bg-surface">
                <motion.div
                  className="h-0.5 w-full bg-accent"
                  animate={{ y: [0, 80, 0] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
