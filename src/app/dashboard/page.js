'use client';

import { complectData, nameDevices } from '@/app/data/data.js';
import { useState, useRef, Suspense, useEffect } from 'react';
import LogoutButton from '@/components/Dashboard/LogoutButton';
import Header from '@/components/Dashboard/Header';
import NumberInput from '@/components/Dashboard/NumberInput';
import DeviceSelector from '@/components/Dashboard/DeviceSelector';
import CategorySelector from '@/components/Dashboard/CategorySelector';
import SubmitButton from '@/components/Dashboard/SubmitButton';
import StatusDialog from '@/components/Dashboard/StatusDialog';

const DashboardContent = () => {
  const [email, setEmail] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [submitError, setSubmitError] = useState(false);
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

  const handleSelectDevice = (name) => {
    setSelectedDevice(name);
    selectButton.current.deviceName = name;
  };

  const handleSelectCategory = (name) => {
    setSelectedCategory(name);
    selectButton.current.categoryJobName = name;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      setSubmitError(false);
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
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header email={email} />

      <div className="mt-5 flex flex-col items-center">
        <div className="flex flex-col items-center w-full text-center border-b-3 border-emerald-700 pb-3">
          <h1 className="text-emerald-700 text-xl font-semibold uppercase tracking-wide">
            Dashboard
          </h1>
          <p className="text-emerald-500">Це дашборд для збірки виробів!</p>
        </div>

        <div className="flex flex-col items-center m-3">
          <NumberInput inputValue={inputValue} setInputValue={setInputValue} />
          <DeviceSelector
            selectedDevice={selectedDevice}
            selectButton={selectButton}
            nameDevices={nameDevices}
            onSelectDevice={handleSelectDevice}
          />
          <CategorySelector
            selectedCategory={selectedCategory}
            selectButton={selectButton}
            complectData={complectData}
            onSelectCategory={handleSelectCategory}
          />
          <SubmitButton
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
          <div className="mt-6">
            <LogoutButton />
          </div>
        </div>
      </div>

      <StatusDialog
        showDialog={showDialog}
        submitError={submitError}
        onClose={() => {
          setShowDialog(false);
          setSubmitError(false);
        }}
      />
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
