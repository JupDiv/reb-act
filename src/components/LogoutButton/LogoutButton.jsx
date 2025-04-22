'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Очистити localStorage / cookies / session
    localStorage.clear();

    // Редірект на логін-сторінку
    router.push('/login-page');
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition z-50"
    >
      Вийти
    </button>
  );
}
