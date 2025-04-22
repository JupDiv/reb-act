const TaskTypePopup = ({ onSelect }) => {
  const options = ['Збірка', 'Пайка', 'Налаштування', 'Рекламація'];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-sm flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-center text-emerald-900">
          Оберіть тип операції
        </h2>
        {options.map((type) => (
          <button
            key={type}
            className="bg-emerald-800 hover:bg-emerald-600 text-white py-2 rounded-md text-lg transition-all duration-200"
            onClick={() => onSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskTypePopup;
