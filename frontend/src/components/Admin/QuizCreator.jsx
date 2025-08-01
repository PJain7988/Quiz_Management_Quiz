import React, { useState } from 'react';

export default function QuizCreator() {
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]); // array of question objects or IDs
  const [duration, setDuration] = useState('');
  const [marks, setMarks] = useState('');
  const [schedule, setSchedule] = useState('');

  // For demo, let's just add question IDs manually (you can change to full question objects later)
  const [newQuestionId, setNewQuestionId] = useState('');

  const addQuestionId = () => {
    if (newQuestionId.trim() && !questions.includes(newQuestionId.trim())) {
      setQuestions([...questions, newQuestionId.trim()]);
      setNewQuestionId(''); // clear input after add
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quizData = {
      subject,
      questionIds: questions, // array
      duration,
      totalMarks: marks,
      scheduleTime: schedule,
    };

    console.log('Creating Quiz:', quizData);
    // TODO: send to backend

    // Clear all form fields after submit
    setSubject('');
    setQuestions([]);
    setDuration('');
    setMarks('');
    setSchedule('');
    setNewQuestionId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-2">Create Quiz</h2>

      <input
        type="text"
        placeholder="Subject"
        className="input mb-2 w-full"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />

      <div className="mb-2">
        <input
          type="text"
          placeholder="Add Question ID"
          className="input mr-2"
          value={newQuestionId}
          onChange={(e) => setNewQuestionId(e.target.value)}
        />
        <button
          type="button"
          onClick={addQuestionId}
          className="bg-gray-500 text-white px-3 py-1 rounded"
        >
          Add Question
        </button>
      </div>

      <div className="mb-2">
        <strong>Added Questions:</strong>{' '}
        {questions.length > 0
          ? questions.join(', ')
          : 'No questions added yet'}
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
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Create Quiz
      </button>
    </form>
  );
}
