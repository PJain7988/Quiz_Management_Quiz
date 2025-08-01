import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SubjectManager() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  // Fetch subjects from backend
  const fetchSubjects = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/subjects');
      setSubjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
      setError('Failed to load subjects');
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Add new subject
  const handleAdd = async () => {
    if (!newSubject.trim()) return;
    setAdding(true);
    setError('');
    try {
      await axios.post('/api/subjects', { name: newSubject.trim() });
      setNewSubject('');
      fetchSubjects();
    } catch (err) {
      console.error('Failed to add subject:', err);
      setError('Failed to add subject');
    } finally {
      setAdding(false);
    }
  };

  // Delete subject with confirm
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subject?')) return;
    setError('');
    try {
      await axios.delete(`/api/subjects/${id}`);
      fetchSubjects();
    } catch (err) {
      console.error('Failed to delete subject:', err);
      setError('Failed to delete subject');
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Subjects</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="New Subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          disabled={adding}
        />
        <button
          className="bg-green-500 text-white px-4 rounded disabled:opacity-50"
          onClick={handleAdd}
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add'}
        </button>
      </div>

      {loading ? (
        <p>Loading subjects...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : subjects.length === 0 ? (
        <p>No subjects found.</p>
      ) : (
        <ul>
          {subjects.map((subject) => (
            <li key={subject._id} className="flex justify-between py-1">
              <span>{subject.name}</span>
              <button
                className="text-red-500"
                onClick={() => handleDelete(subject._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
