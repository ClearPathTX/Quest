"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const supportBlocks = [
  {
    title: "Real Support for Real Life",
    description: "We know that mental health challenges affect every part of your life. That's why our treatment goes beyond just therapy. We teach practical life skills, coping strategies, and stress management techniques you can use long after leaving our care.",
  },
  {
    title: "Family-Centered Approach",
    description: "Your family plays an important role in your recovery journey. We involve loved ones through family therapy sessions and education programs, helping build a strong support system for long-term success.",
  },
  {
    title: "Insurance & Payment Options",
    description: "Getting help shouldn't add financial stress. We work with most major insurance providers and offer flexible payment options. Our admissions team will help you understand your coverage and find the best solution for your situation.",
  },
];

export default function HolisticSupport() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/yourJourney.jpg"
                alt="Woman feeling grateful and at peace"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {supportBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <h3 className="text-2xl font-bold text-text-heading mb-3">
                  {block.title}
                </h3>
                <p className="text-lg text-text-body leading-relaxed">
                  {block.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
