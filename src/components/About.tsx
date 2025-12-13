"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-6">
              Begin Your Story Today
            </h2>
            <div className="space-y-6 text-lg text-text-body leading-relaxed">
              <p>
                We believe everyone deserves a chance at a healthier, happier life. Our
                dedicated team of mental health professionals has been serving the Lancaster
                community and beyond since 2015, providing comprehensive behavioral health
                services in a warm, welcoming environment.
              </p>
              <p>
                We&apos;re committed to transforming lives through personalized mental health care.
                Our approach combines evidence-based treatments with compassionate support,
                ensuring each person who walks through our doors feels heard, valued, and understood.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/beginStorytoday.jpg"
                alt="Supportive group therapy session"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
