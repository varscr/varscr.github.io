"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";
import Section from "../ui/Section";
import GradientDivider from "../ui/GradientDivider";

export default function Contact() {
  const links = [
    { label: "GitHub", url: contact.links.github, external: true },
    { label: "LinkedIn", url: contact.links.linkedin, external: true },
    { label: "Download CV", url: contact.links.cv, external: false },
  ];

  return (
    <Section id="contact">
      <GradientDivider className="mb-16" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Contact
        </h2>
        <div className="space-y-8">
          <p className="text-lg text-gray-300 leading-relaxed">
            {contact.availabilityStatement}
          </p>
          <div className="space-y-4">
            {links.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{
                  x: 10,
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="block text-2xl text-white hover:text-gray-300 transition-all duration-300 group"
              >
                {link.label}
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>
        <GradientDivider className="mt-16 mb-8" />
        <footer className="mt-8">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Fabio Vargas. Built with Next.js and
            Tailwind CSS.
          </p>
        </footer>
      </motion.div>
    </Section>
  );
}
