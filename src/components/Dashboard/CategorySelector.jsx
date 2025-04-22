const CategorySelector = ({
  selectedCategory,
  onSelectCategory,
  complectData,
}) => {
  const handleSelect = (name) => {
    onSelectCategory(name);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 mt-3">
      <h2 className="text-xl text-emerald-400 uppercase mb-2 text-center">
        Обери тут категорію роботи:
      </h2>
      <ul className="flex gap-2 flex-wrap">
        {complectData.categories.map(({ id, nameCategory }) => (
          <li
            key={id}
            className={`w-full sm:w-1/2 md:w-1/3 text-sm px-4 py-3 rounded-md border border-emerald-700 text-center cursor-pointer transition-all duration-200 transform ${
              selectedCategory === nameCategory
                ? 'bg-emerald-700 text-white scale-95'
                : 'bg-emerald-950 text-emerald-100 hover:bg-emerald-800 hover:text-white hover:scale-[0.98]'
            }`}
            onClick={() => handleSelect(nameCategory)}
          >
            {nameCategory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
