import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api'

export default function StudentDashboard(){
  const [quizzes, setQuizzes] = useState([])
  const [results, setResults] = useState([])
  useEffect(()=>{
    async function load(){
      setQuizzes((await api.get('/quizzes')).data)
      setResults((await api.get('/attempts/results/my')).data)
    }
    load()
  },[])

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="font-semibold text-lg mb-3">Available Quizzes</h3>
        <div className="space-y-2">
          {quizzes.map(q => (
            <div key={q._id} className="border rounded-xl p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{q.title}</div>
                <div className="text-sm text-gray-600">{q.subject?.name} · {q.durationMinutes} mins</div>
              </div>
              <Link className="btn" to={`/quiz/${q._id}/take`}>Join</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h3 className="font-semibold text-lg mb-3">My Results</h3>
        <div className="space-y-2">
          {results.map(r => (
            <div key={r._id} className="border rounded-xl p-3">
              <div className="font-medium">{r.quiz?.title}</div>
              <div className="text-sm text-gray-600">Score: {r.score} · Time: {r.timeTakenSeconds}s</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
