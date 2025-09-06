import React from 'react';

const LoginTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around mb-6">
      <button
        type="button"
        className={`text-lg font-semibold pb-2 border-b-2 transition-all duration-300 ${
          activeTab === 'student'
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-500'
        }`}
        onClick={() => setActiveTab('student')}
      >
        Student
      </button>
      <button
        type="button"
        className={`text-lg font-semibold pb-2 border-b-2 transition-all duration-300 ${
          activeTab === 'admin'
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-500'
        }`}
        onClick={() => setActiveTab('admin')}
      >
        Admin
      </button>
    </div>
  );
};

export default LoginTabs;
