import { useEffect, useState } from 'react'
import api from '../../api'

export default function Subjects(){
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const load = async () => setList((await api.get('/subjects')).data)
  useEffect(()=>{ load() },[])
  async function add(){
    await api.post('/subjects', { name })
    setName(''); load()
  }
  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Subjects</h3>
      <div className="flex gap-2 mb-3">
        <input className="input" placeholder="New subject" value={name} onChange={e=>setName(e.target.value)}/>
        <button className="btn" onClick={add}>Add</button>
      </div>
      <ul className="space-y-2">
        {list.map(s => <li key={s._id} className="flex items-center justify-between border rounded-xl p-2">
          <span>{s.name}</span>
        </li>)}
      </ul>
    </div>
  )
}
