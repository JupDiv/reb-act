const NumberInput = ({ inputValue, setInputValue, taskType }) => {
  return (
    <div
      className="mt-2 text-center flex flex-col items-center"
      style={{ marginTop: '20px' }}
    >
      <h2 className="text-xl text-emerald-400 uppercase mb-2 text-center">
        {taskType === 'Налаштування'
          ? 'Обери потужність:'
          : 'Обери номер виробу:'}
      </h2>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введіть число"
        className="p-3 border border-emerald-800 bg-emerald-100 text-emerald-950 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        style={{ marginBottom: '10px' }}
      />
    </div>
  );
};

export default NumberInput;
