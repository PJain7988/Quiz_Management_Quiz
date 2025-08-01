import React from 'react';

const LoginTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around mb-6">
      <button
        className={`text-lg font-semibold pb-2 border-b-2 ${
          activeTab === 'student' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
        }`}
        onClick={() => setActiveTab('student')}
      >
        Student
      </button>
      <button
        className={`text-lg font-semibold pb-2 border-b-2 ${
          activeTab === 'admin' ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500'
        }`}
        onClick={() => setActiveTab('admin')}
      >
        Admin
      </button>
    </div>
  );
};

export default LoginTabs;
