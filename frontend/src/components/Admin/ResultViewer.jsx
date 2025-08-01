import React, { useState } from 'react';

export default function ResultViewer() {
  const [roll, setRoll] = useState('');
  const [quizId, setQuizId] = useState('');

  const handleSearch = () => {
    console.log('Searching for result:', { roll, quizId });
    // TODO: fetch result from backend
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
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
