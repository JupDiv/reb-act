'use client';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import { analytics } from '@/firebase/config';
import { logEvent } from 'firebase/analytics';

import {
  complectCategories,
  nameDevices,
  setupDevices,
} from '@/app/data/data.js';
import { useState, useRef, Suspense, useEffect } from 'react';
import LogoutButton from '@/components/Dashboard/LogoutButton';
import Header from '@/components/Dashboard/Header';
import NumberInput from '@/components/Dashboard/NumberInput';
import DeviceSelector from '@/components/Dashboard/DeviceSelector';
import CategorySelector from '@/components/Dashboard/CategorySelector';
import SubmitButton from '@/components/Dashboard/SubmitButton';
import StatusDialog from '@/components/Dashboard/StatusDialog';
import TaskTypePopup from '@/components/Dashboard/TaskTypePopup';

const DashboardContent = () => {
  const { loading } = useFirebaseAuth();

  const [email, setEmail] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputValueCat, setInputValueCat] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [taskType, setTaskType] = useState('Збірка');
  const selectButton = useRef({
    deviceName: null,
    categoryJobName: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && analytics) {
      logEvent(analytics, 'task_submitted', {
        category: 'Налаштування',
        value: 'dashboard',
      });
    }
  }, []);

  useEffect(() => {
    const localEmail = localStorage.getItem('email');
    const localTaskType = localStorage.getItem('taskType');
    if (!localEmail) {
      window.location.href = '/login-page';
    } else {
      setEmail(localEmail);
    }
    if (localTaskType) {
      setTaskType(localTaskType);
    }
  }, []);

  useEffect(() => {
    if (taskType) {
      localStorage.setItem('taskType', taskType);
    }
  }, [taskType]);

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

  const handleSelectCategory = (newArray) => {
    setSelectedCategory(newArray);
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
          taskType,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setSelectedDevice(null);
      setSelectedCategory([]);
      setInputValue('');
      setShowDialog(true);
    } catch (error) {
      console.error('Помилка при відправці:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loading) return null;

  return (
    <>
      {!taskType && <TaskTypePopup onSelect={setTaskType} />}
      <Header email={email} />
      {taskType && (
        <div className="mt-5 flex flex-col items-center">
          <div className="flex flex-col items-center m-3">
            <NumberInput
              inputValue={inputValue}
              setInputValue={setInputValue}
              textForInput={'Обери номер вибора'}
            />
            <DeviceSelector
              selectedDevice={selectedDevice}
              selectButton={selectButton}
              nameDevices={nameDevices}
              onSelectDevice={handleSelectDevice}
            />
            {(() => {
              const currentCategories =
                taskType === 'Налаштування' ? setupDevices : complectCategories;
              return (
                <>
                  {taskType === 'Налаштування' ? (
                    <NumberInput
                      inputValue={inputValueCat}
                      setInputValue={setInputValueCat}
                      textForInput={'Обери потужність модуля'}
                    />
                  ) : null}
                  <CategorySelector
                    selectedCategory={selectedCategory}
                    selectButton={selectButton}
                    currentCategories={currentCategories}
                    onSelectCategory={handleSelectCategory}
                  />
                </>
              );
            })()}
            <SubmitButton
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />
            <div className="mt-6">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}

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
