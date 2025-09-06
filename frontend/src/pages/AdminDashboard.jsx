// src/pages/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link
          to="/"
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </Link>
      </header>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Quizzes */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Quizzes</h2>
          <p className="text-gray-500 mb-6">
            Create, edit, and delete quizzes for students.
          </p>
          <Link
            to="/admin/quizzes"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Go to Quizzes
          </Link>
        </div>

        {/* Manage Students */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Students</h2>
          <p className="text-gray-500 mb-6">
            View and manage registered students.
          </p>
          <Link
            to="/admin/students"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Go to Students
          </Link>
        </div>

        {/* View Results */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">View Results</h2>
          <p className="text-gray-500 mb-6">
            Track quiz performance and student results.
          </p>
          <Link
            to="/admin/results"
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Go to Results
          </Link>
        </div>
      </div>
    </div>
  );
}
