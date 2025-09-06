import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Register(){
  const [form, setForm] = useState({ name: '', email: '', password: '', rollNumber: '', role: 'student' })
  const [message, setMessage] = useState('')

  async function submit(e){
    e.preventDefault()
    const { data } = await api.post('/auth/register', form)
    setMessage(data.message || 'Registered. Check email.')
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      {message && <p className="text-green-700 mb-2">{message}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <input className="input" placeholder="Roll number (optional)" value={form.rollNumber} onChange={e=>setForm({...form, rollNumber:e.target.value})}/>
        <select className="input" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn w-full">Register</button>
      </form>
      <p className="mt-3 text-sm">Already have an account? <Link className="link" to="/login">Login</Link></p>
    </div>
  )
}
