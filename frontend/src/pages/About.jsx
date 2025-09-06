// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <motion.div
        className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Quiz Management System
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Our Quiz Management System is designed to make learning interactive,
          engaging, and efficient. It provides features for creating quizzes,
          managing users, and analyzing performance, helping both students and
          administrators in the learning journey.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          This project was built as part of the Full Stack Internship program,
          focusing on modern web development using React, Node.js, Express, and
          MongoDB.
        </p>
      </motion.div>
    </section>
  );
}
