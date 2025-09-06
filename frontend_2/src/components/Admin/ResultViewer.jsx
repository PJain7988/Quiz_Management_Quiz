import React, { useState } from 'react';
import axios from 'axios';

export default function ResultViewer() {
  const [roll, setRoll] = useState('');
  const [quizId, setQuizId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    if (!roll || !quizId) {
      setError('Please enter both Roll Number and Quiz ID.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const token = localStorage.getItem('token'); // if backend requires auth
      const res = await axios.get(`/api/results?roll=${roll}&quizId=${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error fetching result');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">View Student Results</h2>

      <input
        type="text"
        placeholder="Roll Number"
        className="input mb-2 w-full"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />

      <input
        type="text"
        placeholder="Quiz ID"
        className="input mb-2 w-full"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {result && (
        <div className="mt-4 border p-3 rounded bg-white shadow">
          <p><strong>Roll Number:</strong> {result.roll}</p>
          <p><strong>Quiz ID:</strong> {result.quizId}</p>
          <p><strong>Marks:</strong> {result.marks}</p>
          <p><strong>Time Taken:</strong> {result.timeTaken}</p>
        </div>
      )}
    </div>
  );
}
