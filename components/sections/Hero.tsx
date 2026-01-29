"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Section from "../ui/Section";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <Section ref={ref} className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl relative z-10"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="relative inline-block mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-400 font-light">
            {personalInfo.title}
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-white/50 via-white/20 to-transparent" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl"
        >
          {personalInfo.primaryPositioning}
        </motion.p>

        {/* Floating accent element */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="absolute -right-20 top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        />
      </motion.div>
    </Section>
  );
}
