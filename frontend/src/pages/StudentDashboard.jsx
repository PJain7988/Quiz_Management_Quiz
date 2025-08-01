import React from 'react';
import QuizList from '../components/Student/QuizList';
import StudentResult from '../components/Student/StudentResult';

export default function StudentDashboard() {
  const handleJoinQuiz = (quizId) => {
    console.log('Joining quiz:', quizId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow mb-6 p-6 rounded">
        <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
        <p className="text-gray-500">Join quizzes and view your results</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white shadow rounded hover:shadow-lg transition">
          <QuizList onJoin={handleJoinQuiz} />
        </div>
        <div className="p-6 bg-white shadow rounded hover:shadow-lg transition">
          <StudentResult />
        </div>
      </main>
    </div>
  );
}
