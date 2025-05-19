import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [formError, setFormError] = useState(null);

  const onSubmit = async (data) => {
    setFormError(null);
    try {
      await login(data.username, data.password);
    } catch (err) {
      setFormError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">KoBot Login</h2>
        
        {formError && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {formError}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block mb-1 text-gray-800 dark:text-gray-200">Username</label>
          <input
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-800 dark:text-gray-200">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Don't have an account? Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;