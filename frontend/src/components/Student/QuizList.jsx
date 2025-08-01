import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuizList({ onJoin }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError("You must be logged in to view quizzes.");
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:3000/api/quizzes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(res.data)) {
          setQuizzes(res.data);
        } else {
          console.error("Expected array but got:", res.data);
          setQuizzes([]);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (quizzes.length === 0) return <p>No quizzes available.</p>;

  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="mb-2">
            <div className="flex justify-between">
              <span>{quiz.title} - {quiz.subject?.name || 'N/A'}</span>
              <button
                onClick={() => onJoin(quiz._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Join
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
