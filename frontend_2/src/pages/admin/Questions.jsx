import { useEffect, useState } from 'react'
import api from '../../api'

export default function Questions(){
  const [subjects,setSubjects]=useState([])
  const [qs, setQs] = useState([])
  const [form, setForm] = useState({ subject: '', type:'mcq', questionText:'', options:['','','',''], correctAnswer:'', difficulty:'easy' })
  const load = async () => {
    const subs = (await api.get('/subjects')).data
    setSubjects(subs)
    setQs((await api.get('/questions')).data)
    if(!form.subject && subs[0]) setForm(f=>({...f, subject: subs[0]._id}))
  }
  useEffect(()=>{ load() },[])

  async function add(){
    const payload = { ...form, options: form.options.filter(Boolean).map(t=>({text:t})) }
    await api.post('/questions', payload)
    setForm({ subject: form.subject, type:'mcq', questionText:'', options:['','','',''], correctAnswer:'', difficulty:'easy' })
    load()
  }

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Question Bank</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <select className="input" value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})}>
            {subjects.map(s=><option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
          <input className="input" placeholder="Question text" value={form.questionText} onChange={e=>setForm({...form, questionText:e.target.value})}/>
          <div className="grid grid-cols-2 gap-2">
            {form.options.map((o,i)=>(
              <input key={i} className="input" placeholder={`Option ${i+1}`} value={o} onChange={e=>{
                const c=[...form.options]; c[i]=e.target.value; setForm({...form, options:c})
              }}/>
            ))}
          </div>
          <input className="input" placeholder="Correct answer (exact text)" value={form.correctAnswer} onChange={e=>setForm({...form, correctAnswer:e.target.value})}/>
          <button className="btn" onClick={add}>Add Question</button>
        </div>
        <div className="border rounded-xl p-3 h-80 overflow-auto">
          {qs.map(q=>(
            <div key={q._id} className="mb-3">
              <div className="font-medium">{q.questionText}</div>
              <div className="text-sm text-gray-600">{q.options?.map(o=>o.text).join(', ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
