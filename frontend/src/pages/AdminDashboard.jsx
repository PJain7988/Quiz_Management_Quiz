import React from 'react';
import SubjectManager from '../components/Admin/subjectManager';
import QuestionCreator from '../components/Admin/QuestionCreator'; // updated version with multiple questions
import QuizCreator from '../components/Admin/QuizCreator';
import ResultViewer from '../components/Admin/ResultViewer';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow mb-6 p-6 rounded">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500">Manage quizzes, subjects, questions, and results</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded hover:shadow-lg transition">
          <SubjectManager />
        </div>
        <div className="p-6 bg-white shadow rounded hover:shadow-lg transition">
          <QuestionCreator />
        </div>
        <div className="p-6 bg-white shadow rounded hover:shadow-lg transition">
          <QuizCreator />
        </div>
        <div className="p-6 bg-white shadow rounded hover:shadow-lg transition">
          <ResultViewer />
        </div>
      </main>
    </div>
  );
}
