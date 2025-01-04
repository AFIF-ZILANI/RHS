"use client";

import { motion } from "framer-motion";

export function AboutHero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-muted-foreground">
            Founded in 1970, Raigon High School has been a cornerstone of academic
            excellence and character development for over five decades. Our journey
            is marked by continuous growth, innovation, and unwavering commitment
            to nurturing future leaders.
          </p>
        </motion.div>
      </div>
    </section>
  );
}