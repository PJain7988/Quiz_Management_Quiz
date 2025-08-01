import React from 'react';

const RegisterForm = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">Create New Account</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 border border-gray-300 rounded" required />
        <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 rounded" required />
        <input type="password" placeholder="Password" className="w-full p-3 border border-gray-300 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
