const StatusDialog = ({ showDialog, submitError, onClose }) => {
  if (!showDialog && !submitError) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-emerald-900 text-white p-6 rounded-md shadow-lg border border-emerald-700 text-center w-80">
        <p className="text-lg font-semibold">
          {submitError
            ? '❌ Дані не вдалося надіслати!'
            : '✅ Дані успішно надіслані!'}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 rounded-md text-sm"
          onClick={onClose}
        >
          Закрити
        </button>
      </div>
    </div>
  );
};

export default StatusDialog;
