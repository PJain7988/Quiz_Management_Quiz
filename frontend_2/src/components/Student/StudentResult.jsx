import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentResult = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      const token = localStorage.getItem('token'); // get token from localStorage
      if (!token) {
        setError('Not authenticated. Please login.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3000/api/results', {
          headers: {
            Authorization: `Bearer ${token}`, // send token in headers
          },
        });
        setResults(res.data); // make sure backend returns an array
      } catch (err) {
        console.error('Error fetching results:', err);
        setError(err.response?.data?.message || 'Failed to fetch results.');
      }
    };

    fetchResults();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Results</h2>
      {results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result._id} className="mb-2">
              {result.studentName}: {result.score}/{result.total}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentResult;
