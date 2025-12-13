"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "My time there was nothing but perfect. The staff is very supportive… 15/10 would recommend to anyone in need.",
    author: "Heather Marie",
  },
  {
    quote: "Quest was amazing — it forever changed my life… ACTUALLY caring what happens in the future to their clients.",
    author: "Victoria Zanoni",
  },
  {
    quote: "This place saved my life. So thankful it exists.",
    author: "Thomas Fernandez",
  },
  {
    quote: "Quest not only helped me with my mental health, but my life. The staff there is like family.",
    author: "Michael C",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-background-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4">
            Success Stories That Inspire
          </h2>
          <div className="flex items-center justify-center gap-2">
            <StarRating />
            <span className="text-text-body font-medium">Google Reviews</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <StarRating />
              <blockquote className="mt-4 text-lg text-text-body leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-4 font-semibold text-text-heading">
                — {testimonial.author}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://www.google.com/search?q=Quest+Behavioral+Health+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Read More Reviews
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
