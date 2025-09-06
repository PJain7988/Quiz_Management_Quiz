import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'

export default function TakeQuiz(){
  const { quizId } = useParams()
  const [attemptId, setAttemptId] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [startTime, setStartTime] = useState(null)
  const navigate = useNavigate()

  const timeLeft = useTimer(quiz?.durationMinutes || 0, () => finish())

  useEffect(()=>{
    async function start(){
      const { data } = await api.post(`/attempts/start/${quizId}`)
      setAttemptId(data.attemptId); setQuiz(data.quiz); setQuestions(data.questions); setStartTime(Date.now());
    }
    start()
  },[quizId])

  async function answer(){
    const q = questions[index]
    await api.post(`/attempts/answer/${attemptId}`, { questionId: q.id, selected })
    setSelected('')
    if(index + 1 < questions.length) setIndex(index + 1)
    else finish()
  }

  async function finish(){
    const timeTakenSeconds = Math.floor((Date.now() - startTime)/1000)
    const { data } = await api.post(`/attempts/finish/${attemptId}`, { timeTakenSeconds })
    alert(`Quiz finished! Score: ${data.score}`)
    navigate('/student')
  }

  if(!quiz) return <div className="card">Loading quiz...</div>

  const q = questions[index]
  return (
    <div className="max-w-2xl mx-auto card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">{quiz.title}</h3>
        <div className="font-mono">Time left: {timeLeft} s</div>
      </div>
      <div className="mb-3">{index+1}. {q.questionText}</div>
      <div className="space-y-2">
        {q.options?.map((o,i)=>(
          <label key={i} className={"block border rounded-xl p-2 cursor-pointer " + (selected===o.text ? "border-indigo-600" : "")}>
            <input type="radio" className="mr-2" name="opt" checked={selected===o.text} onChange={()=>setSelected(o.text)}/>
            {o.text}
          </label>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button className="btn" onClick={answer}>{index+1 < questions.length ? 'Next' : 'Finish'}</button>
      </div>
    </div>
  )
}

function useTimer(minutes, onExpire){
  const [left, setLeft] = useState(minutes*60)
  useEffect(()=>{
    setLeft(minutes*60)
    if(!minutes) return
    const id = setInterval(()=>{
      setLeft(prev=>{
        if(prev<=1){ clearInterval(id); onExpire && onExpire(); return 0 }
        return prev-1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [minutes])
  return left
}
