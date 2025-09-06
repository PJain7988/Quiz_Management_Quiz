import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
export default function VerifyEmail(){
  const [search] = useSearchParams();
  useEffect(()=>{ async function v(){ const token = search.get('token'); const id = search.get('id'); if(token){ try{ await axios.get(`/api/auth/verify/${token}`); alert('Verified'); }catch(e){ alert('Invalid or expired'); } } } v(); },[]);
  return <div className="p-6 max-w-md mx-auto bg-white rounded mt-6">Verifying... If not automatic, open the link sent to your mail.</div>
}
