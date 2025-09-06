// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/quizzes"); // ✅ Make sure backend runs on 5000
      const data = Array.isArray(res.data) ? res.data : res.data.quizzes || [];
      setQuizzes(data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setError("Failed to load quizzes. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Quizzes</h2>

      {loading && <p className="text-gray-600">Loading quizzes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.length > 0 ? (
            quizzes.map((q) => (
              <div
                key={q._id}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-gray-700">{q.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Subject: {q.subject?.name || "General"}
                </p>
                <p className="text-sm text-gray-500">
                  Duration: {q.durationMinutes} mins
                </p>
                <Link
                  to={`/take-quiz/${q._id}`}
                  className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Take Quiz
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No quizzes available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
}
