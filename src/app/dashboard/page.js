'use client';

import { complectData, nameDevices } from '@/app/data/data.js';
import { useState, useRef, Suspense, useEffect } from 'react';
import LogoutButton from '@/components/LogoutButton/LogoutButton.jsx';

const DashboardContent = () => {
  const [email, setEmail] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const selectButton = useRef({
    deviceName: null,
    categoryJobName: null,
  });

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    if (!localEmail) {
      window.location.href = '/login-page';
    } else {
      setEmail(localEmail);
    }
  }, []);

  useEffect(() => {
    if (showDialog) {
      const timeout = setTimeout(() => {
        setShowDialog(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showDialog]);

  const selectedButton = (type, name) => {
    if (type === 'deviceName') {
      setSelectedDevice(name);
      selectButton.current.deviceName = name;
    }
    if (type === 'categoryJobName') {
      setSelectedCategory(name);
      selectButton.current.categoryJobName = name;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify({
          email,
          selectedDevice,
          selectedCategory,
          value: inputValue,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setSelectedDevice(null);
      setSelectedCategory(null);
      setInputValue('');
      setShowDialog(true);
    } catch (error) {
      console.error('Помилка при відправці:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full bg-emerald-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold tracking-widest uppercase">
          REB Action Panel
        </h1>
        <div className="flex items-center gap-2 text-sm opacity-90">
          <span
            className="h-3 w-3 rounded-full bg-green-400 animate-pulse shadow-md"
            title="Працює"
          ></span>
          <span>{email}</span>
        </div>
      </div>
      <div className={'mt-5 flex flex-col items-center'}>
        <div
          className={
            'flex flex-col items-center w-full text-center border-b-3 border-emerald-700 pb-3'
          }
        >
          <h1 className="text-emerald-700 text-xl font-semibold uppercase tracking-wide">
            Dashboard
          </h1>
          <p className="text-emerald-500">Це дашборд для сбірки виробів!</p>
        </div>
        <div className="flex flex-col items-center aliggn-items-center m-3">
          <h2 className="text-xl text-emerald-400 uppercase mb-2 text-center">
            Обери номер виробу:
          </h2>
          <div
            className="mt-2 text-center flex flex-col items-center"
            style={{ marginTop: '20px' }}
          >
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введіть число"
              className="p-3 border border-emerald-800 bg-emerald-100 text-emerald-950 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              style={{ marginBottom: '10px' }}
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/3 mt-3">
            <h2 className="text-xl text-emerald-400 uppercase mb-2 text-center">
              Обери вироб:
            </h2>
            <ul className="flex gap-2 flex-wrap ">
              {Object.values(nameDevices).map(({ id, name }) => (
                <li
                  key={id}
                  className={`w-full sm:w-1/2 md:w-1/3 text-sm px-2 py-2 rounded-md border border-emerald-700 ${
                    selectedDevice === name
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-950 text-emerald-100'
                  }`}
                  onClick={() => selectedButton('deviceName', name)}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl text-emerald-400 uppercase m-3 text-center">
              Обери тут категорію роботи:
            </h2>
            <ul className="flex gap-2 flex-wrap">
              {complectData.categories.map(({ id, nameCategory }) => (
                <li
                  key={id}
                  className={`w-full sm:w-1/2 md:w-1/3 text-sm px-2 py-2 rounded-md border border-emerald-700 ${
                    selectedCategory === nameCategory
                      ? 'bg-emerald-700 text-white'
                      : 'bg-emerald-950 text-emerald-100'
                  }`}
                  onClick={() =>
                    selectedButton('categoryJobName', nameCategory)
                  }
                >
                  {nameCategory}
                </li>
              ))}
            </ul>
          </div>
          {isSubmitting ? (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
            </div>
          ) : (
            <button
              onClick={() => handleSubmit()}
              className="bg-emerald-800 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-md mt-6 tracking-wide transition-all duration-200"
              style={{ marginTop: '20px' }}
            >
              Submit
            </button>
          )}
          {showDialog && (
            <div className="mt-4 p-4 bg-emerald-900 text-white rounded-md shadow-md text-center border border-emerald-700 animate-fade-in-down">
              <p className="text-lg font-semibold">
                ✅ Дані успішно надіслані!
              </p>
              <button
                className="mt-3 text-sm underline text-emerald-300 hover:text-white"
                onClick={() => setShowDialog(false)}
              >
                Закрити
              </button>
            </div>
          )}
          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-700 border-solid"></div>
      </div>
    }
  >
    <DashboardContent />
  </Suspense>
);
export default Dashboard;
