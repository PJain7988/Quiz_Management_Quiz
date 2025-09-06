// src/pages/QuizManager.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function QuizManager() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(storedQuizzes);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quizzes</h2>
      <Link
        to="/create-quiz"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create New Quiz
      </Link>

      <ul className="mt-6 space-y-3">
        {quizzes.length === 0 ? (
          <p>No quizzes available. Create one!</p>
        ) : (
          quizzes.map((quiz, index) => (
            <li
              key={index}
              className="p-4 border rounded shadow-sm bg-gray-100"
            >
              <h3 className="font-semibold">{quiz.title}</h3>
              <p>{quiz.description}</p>
              <p className="text-sm text-gray-600">
                {quiz.questions.length} questions
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
