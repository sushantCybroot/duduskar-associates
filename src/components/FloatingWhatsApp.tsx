"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FIRM } from "@/lib/constants";

export default function FloatingWhatsApp() {
  const whatsappNumber = FIRM.phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent("Hi, I need legal assistance.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <Image
        src="/law-image/whatsapp.png"
        alt="WhatsApp"
        width={56}
        height={56}
        unoptimized
        className="rounded-full object-contain"
      />
    </motion.a>
  );
}
