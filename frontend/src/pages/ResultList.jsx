// src/pages/ResultList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ResultList() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/results");
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching results", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Quiz Results</h1>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Student</th>
            <th className="p-2 border">Quiz</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr key={i} className="border">
              <td className="p-2 border">{r.studentName}</td>
              <td className="p-2 border">{r.quizTitle}</td>
              <td className="p-2 border">{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
