"use client";

import { motion } from "framer-motion";
import { personalInfo, coreFocusAreas } from "@/lib/data";
import Section from "../ui/Section";
import GradientDivider from "../ui/GradientDivider";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section id="about">
      <GradientDivider className="mb-16" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          About
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed whitespace-pre-line text-gray-300"
          >
            {personalInfo.expandedPositioning}
          </motion.p>
          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed whitespace-pre-line text-gray-300"
          >
            {personalInfo.backgroundSummary}
          </motion.p>
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-white mb-6">
              Core Focus Areas
            </h3>
            <ul className="space-y-3">
              {coreFocusAreas.map((area, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-lg text-gray-300"
                >
                  <span className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0" />
                  {area}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
