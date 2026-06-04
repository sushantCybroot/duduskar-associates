"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FIRM, STATISTICS } from "@/lib/constants";
import AnimatedCounter from "./AnimatedCounter";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  return (
    <section className="min-h-screen relative overflow-hidden bg-dark-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-20 h-[40vh] bg-dark-950 md:hidden">
          <Image
            src="/images/home-page-background.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "62% top" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950/15 via-transparent to-dark-950" />
        </div>
        <div className="absolute inset-y-0 right-0 hidden bg-dark-950 md:block md:w-[76vw]">
          <Image
            src="/images/home-page-background.jpeg"
            alt=""
            fill
            priority
            sizes="76vw"
            className="object-contain"
            style={{ objectPosition: "right center" }}
          />
        </div>
        {/* overlay: dark left to clear right */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background: `linear-gradient(
              180deg,
              transparent 0%,
              transparent 28%,
              rgba(5, 10, 20, 0.4) 58%,
              rgba(5, 10, 20, 0.6) 100%
            )`,
          }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background: `linear-gradient(
              90deg,
              transparent 0%,
              transparent 28%,
              rgba(5, 10, 20, 0.05) 45%,
              rgba(5, 10, 20, 0.15) 60%,
              transparent 75%
            )`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom flex min-h-screen flex-col justify-end pb-10 pt-[46vh] md:justify-center md:pb-14 md:pt-32 lg:pt-36 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full space-y-3 rounded-lg md:max-w-md md:p-0"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-block px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full">
              <p className="text-gold-500 text-sm font-semibold">
                Trusted Legal Excellence Since {FIRM.established}
              </p>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-xl font-serif font-bold leading-tight text-white drop-shadow-2xl md:text-2xl lg:text-3xl"
          >
            {FIRM.tagline}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="max-w-lg text-xs leading-relaxed text-white drop-shadow-xl md:text-sm"
          >
            Over three decades of dedicated legal practice, providing expert
            advocacy and strategic solutions in civil litigation, property
            matters, and dispute resolution.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2 sm:flex-row lg:justify-start">
            <Link href="#contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-lg bg-gold-500 px-6 py-3 font-semibold text-dark-950 transition-all duration-300 hover:bg-gold-600 hover:shadow-glow sm:w-auto"
              >
                Consult Now
              </motion.button>
            </Link>
            <Link href="#services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-lg border-2 border-gold-500 bg-dark-950/25 px-6 py-3 font-semibold text-gold-500 backdrop-blur-sm transition-all duration-300 hover:bg-gold-500/10 sm:w-auto"
              >
                Explore Services
              </motion.button>
            </Link>
          </motion.div>

          {/* Statistics */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 border-t border-gold-500/25 pt-5"
          >
            {STATISTICS.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="group cursor-default"
              >
                <div className="mb-1 font-serif text-2xl font-bold text-gold-500 md:text-3xl">
                  <AnimatedCounter target={parseInt(stat.number)} />+
                </div>
                <p className="text-xs text-white transition-colors group-hover:text-gold-500 md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="text-center text-gold-500">
            <svg
              className="w-6 h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
