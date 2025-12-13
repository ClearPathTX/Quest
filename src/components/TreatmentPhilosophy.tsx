"use client";

import { motion } from "framer-motion";

export default function TreatmentPhilosophy() {
  return (
    <section className="py-20 lg:py-28 bg-background-teal">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-8">
            Making Treatment Work For You
          </h2>
          <p className="text-lg md:text-xl text-text-body leading-relaxed">
            We know life doesn&apos;t stop while you&apos;re healing. That&apos;s why we create
            flexible treatment plans that fit your schedule and needs. Whether you need
            full-time care or weekly sessions, we&apos;ll find an approach that works for your life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
