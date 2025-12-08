import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './AuthLayout.css';

const AuthLayout = ({ children, type = 'login' }) => {
  const isLogin = type === 'login';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side - Hero Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-8 md:w-1/2 flex flex-col justify-center">
            <div className="max-w-md mx-auto text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-8">
                <FontAwesomeIcon icon={isLogin ? faShieldAlt : faCheckCircle} className="h-8 w-8 mr-3" />
                <span className="text-2xl font-bold">JSP Distributor</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {isLogin ? 'Welcome Back!' : 'Join Us Today'}
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                {isLogin 
                  ? 'Sign in to access your dashboard and manage your inventory with ease.'
                  : 'Create an account to start managing your distribution network efficiently.'
                }
              </p>
              <div className="mt-12">
                <p className="text-blue-100 text-sm">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <Link 
                    to={isLogin ? '/register' : '/login'} 
                    className="ml-2 font-medium text-white hover:text-blue-200 transition-colors"
                  >
                    {isLogin ? 'Create account' : 'Sign in'}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
