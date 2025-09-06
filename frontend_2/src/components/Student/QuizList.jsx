import React, { useEffect, useState } from 'react';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token'); // get token from localStorage
      if (!token) {
        setError('Not authenticated. Please login.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/quizzes', {
          headers: {
            Authorization: `Bearer ${token}`, // send token in headers
          },
        });
        setQuizzes(res.data); // make sure backend returns an array
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError(err.response?.data?.message || 'Failed to fetch quizzes.');
      }
    };

    fetchQuizzes();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <ul>
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="mb-2">
              {quiz.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
