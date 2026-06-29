"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_SUBJECTS, FIRM } from "@/lib/constants";
import { validateContactForm, ValidationErrors } from "@/lib/validation";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }

      setSubmitStatus({
        type: "success",
        message:
          result.message ||
          "Thank you for contacting us! We will respond within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit form. Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="section-padding bg-dark-950 text-white">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12 max-w-5xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Get Legal Help Today
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Contact us for a confidential consultation with our experienced legal team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <motion.a
              variants={itemVariants}
              href={`tel:${FIRM.phone}`}
              className="p-6 bg-gradient-to-br from-gold-500/10 to-navy-700/10 border border-gold-500/30 rounded-xl hover:border-gold-500/50 transition-all duration-300 text-center hover:shadow-glow"
            >
              <div className="text-4xl mb-4">📞</div>
              <h4 className="text-lg font-bold mb-2">Phone</h4>
              <p className="text-gold-500 font-semibold">{FIRM.phone}</p>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href={`mailto:${FIRM.email}`}
              className="p-6 bg-gradient-to-br from-gold-500/10 to-navy-700/10 border border-gold-500/30 rounded-xl hover:border-gold-500/50 transition-all duration-300 text-center hover:shadow-glow"
            >
              <div className="text-4xl mb-4">📧</div>
              <h4 className="text-lg font-bold mb-2">Email</h4>
              <p className="text-gold-500 font-semibold break-all text-sm">
                {FIRM.email}
              </p>
            </motion.a>

            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-gold-500/10 to-navy-700/10 border border-gold-500/30 rounded-xl text-center"
            >
              <div className="text-4xl mb-4">📍</div>
              <h4 className="text-lg font-bold mb-2">Address</h4>
              <p className="text-sm text-gray-300">{FIRM.location}</p>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-dark-900/50 to-dark-950/50 border border-gold-500/20 rounded-2xl p-8 backdrop-blur-sm"
          >
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 border border-green-500/50 text-green-300"
                    : "bg-red-500/20 border border-red-500/50 text-red-300"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-gold-500/20 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white placeholder-gray-500"
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-gold-500/20 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white placeholder-gray-500"
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-gold-500/20 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white placeholder-gray-500"
                  placeholder="+91 98765 43210"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-900/50 border border-gold-500/20 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white"
                  disabled={isSubmitting}
                >
                  <option value="">Select a subject</option>
                  {CONTACT_SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-semibold mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-dark-900/50 border border-gold-500/20 rounded-lg focus:outline-none focus:border-gold-500 transition-colors text-white placeholder-gray-500 resize-none"
                placeholder="Tell us about your legal matter..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-400 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gold-500 text-dark-950 rounded-lg font-semibold hover:bg-gold-600 hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
            </motion.button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              *Required fields. All information is kept confidential.
            </p>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
