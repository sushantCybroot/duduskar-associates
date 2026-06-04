"use client";

import { motion } from "framer-motion";
import { WHY_CHOOSE_US } from "@/lib/constants";

export default function WhyChooseUs() {
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
    <section className="section-padding bg-dark-950 text-white">
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Why Choose Duduskar & Associates?
            </h2>
            <p className="text-lg text-gray-400">
              We combine decades of courtroom expertise with a client-first
              approach to deliver exceptional legal results
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {WHY_CHOOSE_US.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 rounded-xl border border-gold-500/20 hover:border-gold-500/50 bg-gradient-to-br from-dark-900/50 to-dark-950/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-gold-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonial-style CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-8 lg:p-12 rounded-2xl bg-gradient-to-r from-gold-500/10 via-navy-700/10 to-gold-500/10 border border-gold-500/30 text-center"
          >
            <p className="text-xl italic text-gray-300 mb-6">
              &ldquo;Successful people give results, Unsuccessful people give reasons.&rdquo;
            </p>
            <p className="text-gold-500 font-semibold">
              — The Duduskar & Associates Team
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
