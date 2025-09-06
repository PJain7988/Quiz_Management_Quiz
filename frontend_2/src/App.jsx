import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import VerifyEmail from './pages/VerifyEmail.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import TakeQuiz from './pages/student/TakeQuiz.jsx'

const Layout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">QuizMS</Link>
          <nav className="space-x-4">
            {user ? (
              <>
                <span className="text-sm">Hi, {user.name}</span>
                <button className="btn" onClick={() => { localStorage.clear(); window.location.href='/' }}>Logout</button>
              </>
            ) : (<Link to="/login" className="btn">Login</Link>)}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">{children}</main>
    </div>
  )
}

const Private = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if(!user) return <Navigate to="/login" />
  if(role && user.role !== role) return <Navigate to="/" />
  return children;
}

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/admin" element={<Private role="admin"><AdminDashboard/></Private>} />
        <Route path="/student" element={<Private role="student"><StudentDashboard/></Private>} />
        <Route path="/quiz/:quizId/take" element={<Private role="student"><TakeQuiz/></Private>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  )
}

function Home(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">Quiz Management System</h1>
        <p className="text-gray-600 mb-4">Create subjects, build question banks, schedule quizzes, and track results.</p>
        <div className="space-x-2">
          {!user && <><a className="btn" href="/register">Get Started</a><a className="btn" href="/login">Login</a></>}
          {user?.role==='admin' && <a className="btn" href="/admin">Go to Admin</a>}
          {user?.role==='student' && <a className="btn" href="/student">Go to Student</a>}
        </div>
      </div>
      <div className="card">
        <ul className="list-disc pl-6 space-y-2">
          <li>Create Subjects</li>
          <li>Question Bank (MCQ/True-False)</li>
          <li>Create/Randomize Quizzes with Duration</li>
          <li>Timer, one-question-at-a-time attempts</li>
          <li>View Results and Correct Answers</li>
          <li>Email verification on sign up</li>
        </ul>
      </div>
    </div>
  )
}
