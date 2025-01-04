"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const team = [
    {
        name: "Alex Johnson",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        github: "#",
        linkedin: "#",
        email: "alex@example.com",
    },
    {
        name: "Sarah Chen",
        role: "UI/UX Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        github: "#",
        linkedin: "#",
        email: "sarah@example.com",
    },
    // Add more team members as needed
];

export function TeamGrid() {
    return (
        <section className="py-24">
            <div className="container">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {team.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={item}
                            className="group relative overflow-hidden rounded-lg bg-card"
                        >
                            <div className="aspect-square relative">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="flex justify-center space-x-4">
                                            <a
                                                href={member.github}
                                                className="text-white hover:text-primary"
                                            >
                                                <Github className="h-6 w-6" />
                                            </a>
                                            <a
                                                href={member.linkedin}
                                                className="text-white hover:text-primary"
                                            >
                                                <Linkedin className="h-6 w-6" />
                                            </a>
                                            <a
                                                href={`mailto:${member.email}`}
                                                className="text-white hover:text-primary"
                                            >
                                                <Mail className="h-6 w-6" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold">
                                    {member.name}
                                </h3>
                                <p className="text-muted-foreground">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
