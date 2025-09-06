import React, { useState } from 'react';
import axios from 'axios';

export default function QuizCreator() {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState('');
  const [marks, setMarks] = useState('');
  const [schedule, setSchedule] = useState('');
  const [newQuestionId, setNewQuestionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addQuestionId = () => {
    const id = newQuestionId.trim();
    if (id && !questions.includes(id)) {
      setQuestions([...questions, id]);
      setNewQuestionId('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (questions.length === 0) {
      setError('Please add at least one question to create a quiz.');
      return;
    }

    const quizData = {
      subject,
      questionIds: questions,
      duration,
      totalMarks: marks,
      scheduleTime: schedule,
    };

    setLoading(true);
    try {
      // Replace with your backend endpoint
      const token = localStorage.getItem('token'); // optional auth token
      const res = await axios.post('/api/quizzes', quizData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Quiz created successfully!');
      // Reset form
      setSubject('');
      setQuestions([]);
      setDuration('');
      setMarks('');
      setSchedule('');
      setNewQuestionId('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-2">Create Quiz</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        placeholder="Subject"
        className="input mb-2 w-full"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />

      <div className="mb-2 flex">
        <input
          type="text"
          placeholder="Add Question ID"
          className="input mr-2 flex-1"
          value={newQuestionId}
          onChange={(e) => setNewQuestionId(e.target.value)}
        />
        <button
          type="button"
          onClick={addQuestionId}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          Add
        </button>
      </div>

      <div className="mb-2">
        <strong>Added Questions:</strong>{' '}
        {questions.length > 0 ? questions.join(', ') : 'No questions added yet'}
      </div>

      <input
        type="number"
        placeholder="Duration (minutes)"
        className="input mb-2 w-full"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Total Marks"
        className="input mb-2 w-full"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        required
      />

      <input
        type="datetime-local"
        className="input mb-4 w-full"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? 'Creating Quiz...' : 'Create Quiz'}
      </button>
    </form>
  );
}
