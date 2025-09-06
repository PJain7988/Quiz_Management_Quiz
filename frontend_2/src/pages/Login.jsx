import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

export default function Login(){
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const { data } = await api.post('/auth/login', form)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate(data.user.role === 'admin' ? '/admin' : '/student')
    }catch(e){ setErr(e.response?.data?.message || 'Login failed') }
  }

  return (
    <div className="max-w-md mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {err && <p className="text-red-600 mb-2">{err}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="btn w-full">Login</button>
      </form>
      <p className="mt-3 text-sm">No account? <Link className="link" to="/register">Register</Link></p>
    </div>
  )
}
