import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import api from '../api'

export default function VerifyEmail(){
  const [params] = useSearchParams()
  const [status, setStatus] = useState('Verifying...')
  useEffect(() => {
    async function go(){
      try {
        const email = params.get('email')
        const token = params.get('token')
        const { data } = await api.post('/auth/verify', { email, token })
        setStatus(data.message)
      } catch (e) {
        setStatus(e.response?.data?.message || 'Verification failed')
      }
    }
    go()
  }, [])
  return (
    <div className="max-w-lg mx-auto card text-center">
      <h2 className="text-2xl font-semibold mb-2">Email Verification</h2>
      <p className="mb-4">{status}</p>
      <Link className="btn" to="/login">Go to Login</Link>
    </div>
  )
}
