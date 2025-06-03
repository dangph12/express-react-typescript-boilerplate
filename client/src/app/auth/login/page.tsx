import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/authContext';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleLogin}
        className='bg-white p-6 rounded shadow-md w-96'
      >
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            required
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium mb-1'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            required
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
