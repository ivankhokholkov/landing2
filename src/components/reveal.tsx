"use client";

import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={clsx(className)}
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={reduce ? undefined : { duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

