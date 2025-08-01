import React from 'react';

export default function StudentResult() {
  // Replace this with data fetched from backend
  const results = [
    { quizId: '123', marks: 85, timeTaken: '12m 30s' },
    { quizId: '124', marks: 90, timeTaken: '10m 10s' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Results</h2>
      <ul className="space-y-2">
        {results.map((res, idx) => (
          <li
            key={idx}
            className="border p-3 rounded shadow-sm bg-white flex justify-between items-center"
          >
            <span>
              Quiz ID: <strong>{res.quizId}</strong>
            </span>
            <span>Marks: {res.marks}</span>
            <span>Time: {res.timeTaken}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
