"use client";

import { motion } from "framer-motion";

export default function CareExperience() {
  return (
    <section className="py-20 lg:py-28 bg-background-teal">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-10">
            Expert Care From Day One
          </h2>
        </motion.div>

        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-text-body leading-relaxed"
          >
            Healing begins with truly understanding your story. Everyone&apos;s journey is
            different, and our experienced team is here to listen and create a path that fits you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-text-body leading-relaxed"
          >
            In our peaceful Lancaster setting, you&apos;ll find the support, tools, and guidance
            needed to build a healthier and more hopeful future. Our modern facility offers
            private spaces for reflection and welcoming areas for group connection.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-text-body leading-relaxed"
          >
            Each day at Quest is designed to help you grow — from calming mindfulness sessions
            to meaningful group discussions and one-on-one therapy. No matter where you are in
            your journey, we&apos;re here to walk beside you and celebrate every step forward.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
