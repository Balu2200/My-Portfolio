import React from "react";
import { motion } from "framer-motion";

// Simple animated section wrapper for fade/slide in on scroll
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function AnimatedSection({ id, className, children }) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
}
