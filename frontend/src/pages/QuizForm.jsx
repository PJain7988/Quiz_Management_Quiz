import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import api from "../utilis/axios";

export default function QuizForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);

  useEffect(() => {
    if (id) {
      api.get(`/quizzes/${id}`).then((res) => {
        setTitle(res.data.title);
        setQuestions(res.data.questions || [{ question: "", answer: "" }]);
      });
    }
  }, [id]);

  // Add new question
  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  // Handle question/answer input
  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/quizzes/${id}`, { title, questions });
      } else {
        await api.post("/quizzes", { title, questions });
      }
      navigate("/admin/quizzes");
    } catch (err) {
      console.error("Error saving quiz", err);
      alert(err.response?.data?.message || "Failed to save quiz");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{id ? "Edit Quiz" : "Create Quiz"}</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {/* Quiz title */}
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        {/* Questions */}
        {questions.map((q, i) => (
          <div key={i} className="border p-3 rounded mb-3">
            <input
              type="text"
              placeholder="Question"
              value={q.question}
              onChange={(e) => updateQuestion(i, "question", e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Answer"
              value={q.answer}
              onChange={(e) => updateQuestion(i, "answer", e.target.value)}
              className="border p-2 w-full"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Add Question
        </button>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Save Quiz
          </button>
        </div>
      </form>
    </div>
  );
}
