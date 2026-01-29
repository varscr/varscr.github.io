"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.3)",
      }}
      transition={{ duration: 0.3 }}
      className={`bg-[#111111] border border-white/10 rounded-lg p-6 backdrop-blur-sm transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
