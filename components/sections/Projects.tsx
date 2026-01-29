"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import Section from "../ui/Section";
import Card from "../ui/Card";
import GradientDivider from "../ui/GradientDivider";

export default function Projects() {
  return (
    <Section id="projects">
      <GradientDivider className="mb-16" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Featured Projects
        </h2>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-black/40 border border-white/10 text-gray-300 text-sm rounded-md transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-white hover:text-gray-300 transition-colors font-medium group"
                >
                  View on GitHub
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.a>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
