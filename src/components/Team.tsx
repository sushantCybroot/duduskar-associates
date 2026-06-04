"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TEAM_MEMBERS } from "@/lib/constants";

export default function Team() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  // Separate featured member from others
  const featuredMember = TEAM_MEMBERS[0];
  const otherMembers = TEAM_MEMBERS.slice(1);

  return (
    <section id="team" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-dark-950">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              Experienced advocates dedicated to providing exceptional legal
              representation and client service
            </p>
          </motion.div>

          {/* Featured Founder Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group"
          >
            <div className="bg-gradient-to-br from-dark-50 via-gray-50 to-dark-50 rounded-3xl overflow-hidden shadow-md hover:shadow-luxury transition-all duration-300 border-2 border-gold-500/20 hover:border-gold-500/40 bg-opacity-80 backdrop-blur-sm">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image - Landscape/Horizontal */}
                <div className="md:col-span-3 relative h-96 md:h-full bg-gradient-to-br from-navy-900 to-dark-950 flex items-center justify-center overflow-hidden">
                  {featuredMember.image ? (
                    <img
                      src={featuredMember.image}
                      alt={featuredMember.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="text-center text-white">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/40 bg-white/10 text-3xl font-serif">
                        {featuredMember.name
                          .replace("Adv.", "")
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <p className="text-sm text-gold-100">Photo to be updated</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content - Premium Typography */}
                <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-600 text-xs font-semibold rounded-full tracking-widest">
                      FOUNDER & LEADER
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-dark-950 mb-2 mt-3">
                    {featuredMember.name}
                  </h3>
                  
                  <div className="flex flex-col gap-2 mb-6 border-b border-gold-500/20 pb-6">
                    <p className="text-lg text-gold-600 font-semibold">{featuredMember.title}</p>
                    <p className="text-sm text-gray-600 font-medium">{featuredMember.designation}</p>
                  </div>
                  
                  <p className="text-gray-700 text-base leading-relaxed font-light">
                    {featuredMember.bio}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Other Team Members - 2x2 Grid */}
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {otherMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-dark-50 to-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-300 border border-gold-500/10 hover:border-gold-500/30 h-full flex flex-col">
                  {/* Image - Portrait/Vertical */}
                  <div className="relative h-96 bg-gradient-to-br from-navy-900 to-dark-950 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center 18%",
                        }}
                      />
                    ) : (
                      <div className="text-center text-white">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/40 bg-white/10 text-2xl font-serif">
                          {member.name
                            .replace("Adv.", "")
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <p className="text-xs text-gold-100">Photo to be updated</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-serif font-bold text-dark-950 mb-1">
                      {member.name}
                    </h3>
                    <div className="flex flex-col gap-0.5 mb-4">
                      <p className="text-gold-500 font-semibold text-sm">{member.title}</p>
                      <p className="text-xs text-gray-600">{member.designation}</p>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={itemVariants} className="text-center pt-8">
            <p className="text-gray-700 mb-6 font-light">
              Need legal assistance from our expert team?
            </p>
            <a href="#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gold-500 text-dark-950 rounded-lg font-semibold hover:bg-gold-600 hover:shadow-glow transition-all duration-300 text-lg"
              >
                Schedule Consultation
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
