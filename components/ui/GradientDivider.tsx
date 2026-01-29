"use client";

import { motion } from "framer-motion";

interface GradientDividerProps {
  className?: string;
}

export default function GradientDivider({ className = "" }: GradientDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-px bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`}
    />
  );
}
