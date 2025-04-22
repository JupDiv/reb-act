'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { userData } from '../data/data';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      userData.some(
        ({ userLogin, userPassword }) =>
          userLogin === email && userPassword === password
      )
    ) {
      localStorage.setItem('email', email);
      router.push('/dashboard');
    } else {
      alert('Неправильний логін або пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
