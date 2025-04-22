'use client';
import { useSearchParams } from 'next/navigation';
import { complectData, nameDevices } from '@/app/data/data.js';
import { useState, useRef, Suspense } from 'react';
import LogoutButton from '@/components/LogoutButton/LogoutButton.jsx';

const DashboardContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const selectButton = useRef({
    deviceName: null,
    categoryJobName: null,
  });

  const selectedButton = (type, name) => {
    if (type === 'deviceName') {
      setSelectedDevice(name);
      selectButton.current.deviceName = name;
    }
    if (type === 'categoryJobName') {
      setSelectedCategory(name);
      selectButton.current.categoryJobName = name;
    }
    console.log(selectButton);
  };

  const handleSubmit = async () => {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbytIOGuXjiL7jxjrjZ3ij5MK_AI5zHKXNxcWj0nAoZuDfS005mUdti7q-aOR7ZAPgP4mg/exec',
      {
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
      }
    );

    console.log('Response:', response);

    const result = await response.json();
    console.log(result);
    setSelectedDevice(null);
    setSelectedCategory(null);
    setInputValue('');
  };
  // console.log('Submit to Excel:', {
  //   email,
  //   selectedDevice,
  //   selectedCategory,
  //   value: inputValue,
  // });

  // Тут можна додати реальний експорт до Excel або API-виклик
  return (
    <div className={'mt-5 flex flex-col items-center'}>
      <div
        className={
          'flex flex-col items-center w-full text-center border-b-3 border-emerald-700 pb-3'
        }
      >
        <h1 className="text-emerald-950 text-lg ">Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        <p>Hey User {email}!</p>
      </div>
      <div className="flex flex-col items-center aliggn-items-center m-3">
        <h2 className="text-3xl text-center">Обери номер виробу:</h2>
        <div
          className="mt-2 text-center flex flex-col items-center"
          style={{ marginTop: '20px' }}
        >
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введіть число"
            className="p-2 border rounded-md mt-2"
            style={{ padding: '20px', marginBottom: '10px' }}
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 mt-3">
          <h2 className="text-3xl text-center m-3">Обери вироб:</h2>
          <ul className="flex gap-2 flex-wrap ">
            {Object.values(nameDevices).map(({ id, name }) => (
              <li
                key={id}
                className="w-full sm:w-1/2 md:w-1/3 text-1xl bg-emerald-950 text-white text-center rounded-md"
                onClick={() => selectedButton('deviceName', name)}
                style={
                  selectedDevice === name ? { backgroundColor: 'blue' } : {}
                }
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl text-center m-3">
            Обери тут категорію роботи:
          </h2>
          <ul className="flex gap-2 flex-wrap">
            {complectData.categories.map(({ id, nameCategory }) => (
              <li
                key={id}
                className="w-full sm:w-1/2 md:w-1/3 text-1xl bg-emerald-950 text-white text-center rounded-md"
                onClick={() => selectedButton('categoryJobName', nameCategory)}
                style={
                  selectedCategory === nameCategory
                    ? { backgroundColor: 'blue' }
                    : {}
                }
              >
                {nameCategory}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => handleSubmit()}
          className="bg-emerald-700 text-white px-4 py-2 rounded-md flex justify-center items-center mt-4"
          style={{ padding: '10px', marginTop: '20px' }}
        >
          Submit
        </button>
        <LogoutButton />
      </div>
    </div>
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
