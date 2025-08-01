import React, { useState } from 'react';

export default function QuestionCreator() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const [questions, setQuestions] = useState([]); // store multiple questions locally

  // Add single question to questions array (local)
  const addQuestion = (e) => {
    e.preventDefault();

    const questionData = {
      questionText: question,
      options,
      correctAnswer,
      subject,
      difficulty,
    };

    setQuestions((prev) => [...prev, questionData]);

    // Clear input fields
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setSubject('');
    setDifficulty('easy');
  };

  // Submit all questions to backend
  const submitAllQuestions = async () => {
    if (questions.length === 0) {
      alert('No questions to submit');
      return;
    }

    try {
      // TODO: Replace URL with your backend endpoint
      const response = await fetch('/api/questions/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions }),
      });

      if (!response.ok) throw new Error('Failed to submit questions');

      alert('Questions submitted successfully!');
      setQuestions([]); // clear after submit
    } catch (err) {
      console.error(err);
      alert('Error submitting questions');
    }
  };

  return (
    <div>
      <form onSubmit={addQuestion}>
        <h2 className="text-xl font-semibold mb-2">Add Question</h2>

        <input
          type="text"
          placeholder="Question Text"
          className="input mb-2 w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        {options.map((opt, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Option ${idx + 1}`}
            className="input mb-2 w-full"
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }}
            required
          />
        ))}

        <input
          type="text"
          placeholder="Correct Answer"
          className="input mb-2 w-full"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Subject"
          className="input mb-2 w-full"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="input mb-4 w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Questions Added:</h3>
        {questions.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <ul className="mb-4 max-h-48 overflow-auto border p-3 rounded">
            {questions.map((q, i) => (
              <li key={i} className="mb-2 border-b pb-2">
                <p><strong>Q:</strong> {q.questionText}</p>
                <p><strong>Options:</strong> {q.options.join(', ')}</p>
                <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                <p><strong>Subject:</strong> {q.subject}</p>
                <p><strong>Difficulty:</strong> {q.difficulty}</p>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={submitAllQuestions}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit All Questions
        </button>
      </div>
    </div>
  );
}
