"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { PRACTICE_AREAS } from "@/lib/constants";

export default function PracticeAreas() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="section-padding bg-dark-50">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-dark-950">
              Our Practice Areas
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive legal services across diverse practice areas with
              proven expertise and successful outcomes
            </p>
          </motion.div>

          {/* Practice areas grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PRACTICE_AREAS.map((area) => (
              <motion.div
                key={area.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => setExpandedId(expandedId === area.id ? null : area.id)}
                className="group cursor-pointer"
              >
                <div className="h-full p-6 bg-white rounded-xl border border-gold-500/20 hover:border-gold-500/50 shadow-sm hover:shadow-luxury transition-all duration-300">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-bold text-dark-950 mb-3 group-hover:text-gold-500 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {area.description}
                  </p>

                  {/* Expandable content */}
                  {expandedId === area.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-gold-500/20"
                    >
                      <p className="text-sm text-gray-600">
                        {area.fullDescription}
                      </p>
                    </motion.div>
                  )}

                  <div className="text-gold-500 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                    {expandedId === area.id ? "Show Less ↑" : "Learn More →"}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
