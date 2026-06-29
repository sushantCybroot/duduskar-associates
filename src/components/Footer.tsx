"use client";

import Link from "next/link";
import { FIRM, NAV_LINKS, PRACTICE_AREAS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Split services into two columns
  const servicesCol1 = PRACTICE_AREAS.slice(0, 8);
  const servicesCol2 = PRACTICE_AREAS.slice(8);

  const quickLinks = NAV_LINKS.filter((l) => l.label !== "Contact");

  return (
    <footer className="bg-dark-950 text-white">
      {/* Main footer */}
      <div className="py-12 border-t border-gold-500/20">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Column 1: Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <Link href="/" className="flex items-center space-x-2 mb-4 group">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-500 via-gold-400 to-navy-700 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/20 ring-1 ring-white/20">
                  <svg
                    className="h-6 w-6 text-white drop-shadow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3v18" />
                    <path d="M7 21h10" />
                    <path d="M9 6h6" />
                    <path d="M5 8l-3 6h6L5 8Z" />
                    <path d="M19 8l-3 6h6l-3-6Z" />
                    <path d="M5 8h14" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-serif font-bold text-sm">
                    {FIRM.name}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-400">
                    <span className="h-px w-5 bg-gold-500/70" />
                    <span className="font-serif italic normal-case tracking-wide">
                      Legal Excellence
                    </span>
                  </div>
                </div>
              </Link>
              
              <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                35+ years of trusted legal practice in Thane, Maharashtra.
              </p>
              
              <p className="text-gold-500 font-semibold text-xs">
                Serving clients since {FIRM.established}
              </p>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 text-gold-500 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3-4: Services Grid (2 columns x 8 rows) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <h4 className="font-semibold mb-4 text-gold-500 text-sm">
                Services
              </h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                {servicesCol1.map((area) => (
                  <Link
                    key={area.id}
                    href="/#services"
                    className="text-gray-400 hover:text-gold-500 transition-colors text-sm leading-6"
                  >
                    {area.title}
                  </Link>
                ))}
                {servicesCol2.map((area) => (
                  <Link
                    key={area.id}
                    href="/#services"
                    className="text-gray-400 hover:text-gold-500 transition-colors text-sm leading-6"
                  >
                    {area.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact info - Bottom Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-gold-500/20 mt-8 pt-6 grid md:grid-cols-3 gap-8"
          >
            <div>
              <h5 className="text-gold-500 font-semibold mb-2 text-sm">Phone</h5>
              <a
                href={`tel:${FIRM.phone}`}
                className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
              >
                {FIRM.phone}
              </a>
            </div>
            <div>
              <h5 className="text-gold-500 font-semibold mb-2 text-sm">Email</h5>
              <a
                href={`mailto:${FIRM.email}`}
                className="text-gray-400 hover:text-gold-500 transition-colors text-sm"
              >
                {FIRM.email}
              </a>
            </div>
            <div>
              <h5 className="text-gold-500 font-semibold mb-2 text-sm">Location</h5>
              <div className="text-gray-400 text-xs space-y-0.5 leading-relaxed">
                <p>First Floor, B Wing,</p>
                <p>JOE Apartment, 101,</p>
                <p>Edulji Road, Near Sharma Dairy,</p>
                <p>Charai, Thane West,</p>
                <p>Thane, Maharashtra 400601</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-500/20 py-6">
        <div className="container-custom flex justify-center items-center text-center text-sm text-gray-500">
          <p>
            &copy; {currentYear} {FIRM.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
