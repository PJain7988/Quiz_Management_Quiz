// src/pages/CreateQuiz.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSaveQuiz = () => {
    if (!title.trim()) {
      alert("Please enter a title for the quiz.");
      return;
    }

    const newQuiz = { title, description, questions };
    const existingQuizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    localStorage.setItem("quizzes", JSON.stringify([...existingQuizzes, newQuiz]));

    alert("Quiz created successfully!");
    navigate("/quizzes");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create Quiz</h2>

      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 mb-3 border rounded"
      />

      <textarea
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="block w-full p-2 mb-3 border rounded"
      />

      <h3 className="font-semibold mb-2">Questions</h3>
      {questions.map((q, index) => (
        <div key={index} className="mb-3 p-3 border rounded">
          <input
            type="text"
            placeholder="Enter Question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
            className="block w-full p-2 mb-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter Answer"
            value={q.answer}
            onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
            className="block w-full p-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleAddQuestion}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2"
      >
        Add Question
      </button>

      <button
        onClick={handleSaveQuiz}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4 ml-3"
      >
        Save Quiz
      </button>
    </div>
  );
}
