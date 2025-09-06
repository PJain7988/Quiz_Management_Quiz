import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import About from "./pages/About";

import QuizList from "./pages/QuizList";
import QuizForm from "./pages/QuizForm";
import StudentList from "./pages/StudentList";
import ResultList from "./pages/ResultList";
import QuizManager from "./pages/QuizManager";
import CreateQuiz from "./pages/CreateQuiz";


function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-slate-800 text-white flex gap-4">
        <Link to="/" className="font-bold">
          QuizApp
        </Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/quizzes" element={<QuizList />} />
        <Route path="/admin/quizzes/create" element={<QuizForm />} />
        <Route path="/admin/quizzes/edit/:id" element={<QuizForm />} />
        <Route path="/admin/students" element={<StudentList />} />
        <Route path="/admin/results" element={<ResultList />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/quizzes" element={<QuizManager />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
