"use client";

import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const timelineItems = [
    { year: "1989", event: "Firm Established", description: "Founded by Adv. Yashwant Duduskar" },
    { year: "2000s", event: "Reputation Building", description: "Established strong presence in Thane's legal community" },
    { year: "2020s", event: "Modern Expansion", description: "Gaurav Duduskar joins with international legal expertise" },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-dark-950">
              Our Legacy of Excellence
            </h2>
            <p className="text-lg text-gray-600">
              35+ years of dedicated service, building trust one case at a time
            </p>
          </motion.div>

          {/* Main content */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-bold text-dark-950">
                Duduskar & Associates: A Tradition of Trust
              </h3>
              <p className="text-gray-600 leading-relaxed">
                For over three decades, Duduskar & Associates has been a trusted
                name in civil litigation and legal advisory services in Thane.
                The firm was founded by Adv. Yashwant Duduskar, who came to
                Thane from his native place with no backing or support and built
                his practice entirely through hard work, perseverance, and
                dedication to the legal profession.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Through years of sincere advocacy and client trust, he
                established a strong reputation in the field of law. The firm
                has extensive experience in Civil Litigation, Injunction
                Matters, Land Revenue Matters, Arbitration, Property Matters,
                Cooperative Society Matters, and Motor Accident Claim (MACT)
                Cases, with a particularly respected practice in MACT matters.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Continuing this legacy, Gaurav Duduskar, with a Masters in
                Comparative and International Dispute Resolution from Queen Mary
                University of London, has returned to join his father&apos;s firm
                with the vision of taking the practice to greater heights.
                Combining decades of courtroom experience with a modern legal
                perspective, Duduskar & Associates remains committed to
                providing practical, effective, and client-focused legal
                solutions.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-navy-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    {index < timelineItems.length - 1 && (
                      <div className="absolute top-12 left-6 w-0.5 h-12 bg-gradient-to-b from-gold-500 to-transparent" />
                    )}
                  </div>
                  <div className="pt-2">
                    <h4 className="text-lg font-bold text-dark-950">{item.year}</h4>
                    <h5 className="font-semibold text-gold-500 mb-1">{item.event}</h5>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key achievements */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expertise",
                description: "Comprehensive legal experience across multiple practice areas",
              },
              {
                title: "Dedication",
                description: "Unwavering commitment to client success and justice",
              },
              {
                title: "Heritage",
                description: "Three decades of trusted advocacy and proven results",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="p-8 bg-gradient-to-br from-dark-50 to-gray-50 rounded-xl border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h4 className="text-lg font-bold text-dark-950 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
