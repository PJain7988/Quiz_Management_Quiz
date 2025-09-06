// src/pages/QuizList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/quizzes");
      setQuizzes(res.data);
    } catch (err) {
      console.error("Error fetching quizzes", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/quizzes/${id}`);
      fetchQuizzes();
    } catch (err) {
      console.error("Error deleting quiz", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Quiz List</h1>
      <Link
        to="/admin/quizzes/create"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Create Quiz
      </Link>

      <ul className="mt-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="flex justify-between p-2 border-b">
            <span>{quiz.title}</span>
            <div>
              <Link
                to={`/admin/quizzes/edit/${quiz._id}`}
                className="mr-2 text-green-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
