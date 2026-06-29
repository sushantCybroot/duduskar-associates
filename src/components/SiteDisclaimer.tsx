"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FIRM } from "@/lib/constants";

const DISCLAIMER_KEY = "duduskar-public-disclaimer-accepted";
const LEGACY_DISCLAIMER_KEYS = [
  "duduskar-disclaimer-accepted",
  "duduskar-public-disclaimer-accepted",
];

export default function SiteDisclaimer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      setIsOpen(false);
      setIsReady(true);
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const shouldForceShow = searchParams.get("disclaimer") === "1";
    const shouldReset = searchParams.get("resetDisclaimer") === "1";

    if (shouldReset) {
      LEGACY_DISCLAIMER_KEYS.forEach((key) => {
        window.localStorage.removeItem(key);
        window.sessionStorage.removeItem(key);
      });
    }

    const hasAccepted =
      window.sessionStorage.getItem(DISCLAIMER_KEY) === "true";
    setIsOpen(shouldForceShow || !hasAccepted);
    setIsReady(true);
  }, [pathname]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, isReady]);

  const handleAgree = () => {
    window.sessionStorage.setItem(DISCLAIMER_KEY, "true");
    setIsOpen(false);
  };

  if (!isReady) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-dark-950/70 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-disclaimer-title"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-gold-500/20 bg-white shadow-[0_24px_70px_rgba(10,10,10,0.32)]"
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-gold-500 via-gold-300 to-navy-700" />

            <div className="p-5 sm:p-7">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 inline-flex rounded-full bg-gold-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-800">
                    Legal Disclaimer
                  </p>
                  <h2
                    id="site-disclaimer-title"
                    className="text-2xl font-serif font-semibold text-dark-950 sm:text-3xl"
                  >
                    Before You Enter
                  </h2>
                </div>
                <div className="hidden rounded-2xl bg-navy-950 px-4 py-3 text-right text-white sm:block">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-gold-300">
                    Firm
                  </p>
                  <p className="mt-1 text-sm font-medium">{FIRM.name}</p>
                </div>
              </div>

              <p className="mb-4 max-w-2xl text-sm leading-6 text-dark-600 sm:text-[15px]">
                The Bar Council of India Rules prohibit advocates from
                soliciting work or advertising directly or indirectly. By
                clicking <span className="font-semibold">"I Agree"</span>, you
                acknowledge the following:
              </p>

              <div className="max-h-[42vh] space-y-3 overflow-y-auto rounded-2xl border border-dark-200 bg-dark-50 p-4 pr-3 text-sm leading-6 text-dark-700 sm:max-h-[46vh] sm:p-5 sm:text-[15px]">
                <p>
                  This website and the information and details therein are
                  solely for the purpose of the User&apos;s information and
                  personal consumption, and there has been no advertisement,
                  personal communication, solicitation, invitation or any other
                  inducement of any sort whatsoever by or on behalf of the firm
                  or any of its partners, associates or advocates to solicit
                  any work.
                </p>
                <p>
                  The User has accessed this website of their own accord. Any
                  information obtained or material downloaded from this website
                  is completely at the User&apos;s discretion and for personal
                  consumption not amounting to advertising and not creating any
                  advocate-client relationship.
                </p>
                <p>
                  The firm, including its partners, associates and advocates,
                  are not responsible for any loss, damage or consequence of
                  actions taken or not taken by the User based on or as a
                  result of the information provided on this website.
                </p>
                <p>
                  The contents of this website are the intellectual property of
                  the firm.
                </p>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="https://google.com"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-dark-300 px-5 text-sm font-semibold text-dark-700 transition hover:border-dark-950 hover:text-dark-950"
                >
                  Exit Site
                </a>
                <button
                  type="button"
                  onClick={handleAgree}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-dark-950 px-6 text-sm font-semibold text-white transition hover:bg-navy-900"
                >
                  I Agree
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
