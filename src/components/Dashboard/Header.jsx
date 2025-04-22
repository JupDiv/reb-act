const Header = ({ email }) => (
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
);

export default Header;
