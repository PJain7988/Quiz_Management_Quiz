import { useEffect, useState } from 'react'
import api from '../../api'

export default function Quizzes(){
  const [subjects,setSubjects]=useState([])
  const [questions,setQuestions]=useState([])
  const [quizzes,setQuizzes]=useState([])
  const [form,setForm]=useState({ title:'', subject:'', durationMinutes:10, scheduledAt:'', randomize:false, questionIds:[] })
  const load = async () => {
    const subs = (await api.get('/subjects')).data
    setSubjects(subs)
    setQuestions((await api.get('/questions')).data)
    setQuizzes((await api.get('/quizzes')).data)
    if(!form.subject && subs[0]) setForm(f=>({...f, subject: subs[0]._id}))
  }
  useEffect(()=>{ load() },[])

  function toggleQuestion(id){
    setForm(f=>({...f, questionIds: f.questionIds.includes(id) ? f.questionIds.filter(x=>x!==id) : [...f.questionIds, id]}))
  }

  async function createQuiz(){
    await api.post('/quizzes', form)
    setForm({...form, title:'', questionIds:[]})
    load()
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Create Quizzes</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <input className="input" placeholder="Quiz title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
          <select className="input" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})}>
            {subjects.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <input className="input" type="number" min="1" placeholder="Duration minutes" value={form.durationMinutes} onChange={e=>setForm({...form, durationMinutes:Number(e.target.value)})}/>
          <input className="input" type="datetime-local" value={form.scheduledAt} onChange={e=>setForm({...form, scheduledAt:e.target.value})}/>
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.randomize} onChange={e=>setForm({...form, randomize:e.target.checked})}/> Randomize questions</label>
          <button className="btn" onClick={createQuiz}>Create Quiz</button>
        </div>
        <div className="border rounded-xl p-3 h-80 overflow-auto">
          <div className="text-sm text-gray-600 mb-2">Select questions:</div>
          {questions.filter(q=>q.subject?._id===form.subject).map(q=>(
            <label key={q._id} className="flex items-center gap-2 mb-2">
              <input type="checkbox" checked={form.questionIds.includes(q._id)} onChange={()=>toggleQuestion(q._id)}/>
              <span>{q.questionText}</span>
            </label>
          ))}
        </div>
      </div>

      <h4 className="font-semibold mt-6 mb-2">Existing Quizzes</h4>
      <div className="grid md:grid-cols-2 gap-3">
        {quizzes.map(q=>(
          <div key={q._id} className="border rounded-xl p-3">
            <div className="font-medium">{q.title}</div>
            <div className="text-sm text-gray-600">Duration: {q.durationMinutes} mins · Questions: {q.questionIds?.length}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
