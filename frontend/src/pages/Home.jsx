import React from "react";
import { Button } from "../components/Button.jsx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-6 text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6"
        >
          Welcome to <span className="text-indigo-600">QuizApp</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-gray-600 leading-relaxed mb-8"
        >
          A modern platform for{" "}
          <span className="font-semibold text-gray-700">learning</span> and{" "}
          <span className="font-semibold text-gray-700">assessment</span>. <br />
          <span className="font-semibold text-gray-700">Admins</span> can manage
          subjects, questions, and quizzes, while{" "}
          <span className="font-semibold text-gray-700">Students</span> can
          register, attempt quizzes, and track progress.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button onClick={() => navigate("/register")}>Get Started</Button>
          <Button variant="outline" onClick={() => navigate("/about")}>
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
