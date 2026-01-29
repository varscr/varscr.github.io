"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import Section from "../ui/Section";
import GradientDivider from "../ui/GradientDivider";

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section id="experience">
      <GradientDivider className="mb-16" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Experience
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-[#111111] border border-white/10 rounded-lg p-6 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Professional Experience
            </h3>
            <p className="text-lg leading-relaxed whitespace-pre-line text-gray-300">
              {experience.professionalExperience}
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-[#111111] border border-white/10 rounded-lg p-6 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Project Philosophy
            </h3>
            <p className="text-lg leading-relaxed text-gray-300">
              {experience.projectPhilosophy}
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-[#111111] border border-white/10 rounded-lg p-6 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Approach to Learning
            </h3>
            <p className="text-lg leading-relaxed text-gray-300">
              {experience.approachToLearning}
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-[#111111] border border-white/10 rounded-lg p-6 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Values as a Developer
            </h3>
            <ul className="space-y-3">
              {experience.valuesAsDeveloper.map((value, index) => (
                <li key={index} className="flex items-center text-lg text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-3 flex-shrink-0" />
                  {value}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
