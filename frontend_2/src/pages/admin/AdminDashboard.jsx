import Subjects from './Subjects.jsx'
import Questions from './Questions.jsx'
import Quizzes from './Quizzes.jsx'

export default function AdminDashboard(){
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 card"><Subjects/></div>
      <div className="md:col-span-2 space-y-6">
        <div className="card"><Questions/></div>
        <div className="card"><Quizzes/></div>
      </div>
    </div>
  )
}
