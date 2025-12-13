"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Quest Behavioral Health"
                width={180}
                height={50}
                className="h-10 w-auto"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-semibold px-6 py-2.5 rounded-full transition-all duration-300"
            >
              Get Help Today
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
