import React, { useState } from 'react';
import LoginTabs from './LoginTabs';
import StudentLoginForm from './StudentLoginForm';
import AdminLoginForm from './AdminLoginForm';
import RegisterForm from './RegistrationForm';

const AuthWrapper = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md m-auto mt-20">
      <LoginTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="transition-all duration-300 mt-4">
        {!showRegister ? (
          <>
            {activeTab === 'student' ? <StudentLoginForm /> : <AdminLoginForm />}
            <p className="text-center text-sm mt-4">
              New here?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm />
            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthWrapper;
