import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', rollNumber: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post('/api/auth/register', form);
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <input type="text" placeholder="Name" className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="text" placeholder="Roll Number" className="w-full p-2 border mb-3 rounded"
          onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-4 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button onClick={handleSubmit} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
      </div>
    </div>
  );
}
