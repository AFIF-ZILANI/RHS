"use client";

import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export function MissionVision() {
    return (
        <section className="py-24 bg-gradient-to-b from-background to-primary/5">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-center items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                            <Target className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Our Mission</h2>
                        <p className="text-muted-foreground text-center">
                            To provide quality education that empowers students
                            to become responsible global citizens, fostering
                            academic excellence, character development, and
                            lifelong learning.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 flex flex-col items-center"
                    >
                        <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary">
                            <Eye className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Our Vision</h2>
                        <p className="text-muted-foreground text-center">
                            To be a leading institution that nurtures innovative
                            thinkers, ethical leaders, and responsible citizens
                            who contribute positively to society.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
