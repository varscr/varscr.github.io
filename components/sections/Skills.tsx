"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import Section from "../ui/Section";
import GradientDivider from "../ui/GradientDivider";

export default function Skills() {
  const allSkills = [
    { category: "Frontend", items: skills.frontend },
    { category: "Backend", items: skills.backend },
    { category: "Data", items: skills.data },
    { category: "Infrastructure & Tooling", items: skills.infrastructure },
    { category: "Other", items: skills.other },
  ];

  return (
    <Section id="skills">
      <GradientDivider className="mb-16" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Skills & Technologies
        </h2>
        <div className="space-y-10">
          {allSkills.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="px-4 py-2 bg-[#111111] border border-white/20 text-gray-200 rounded-lg text-sm font-medium cursor-default transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
