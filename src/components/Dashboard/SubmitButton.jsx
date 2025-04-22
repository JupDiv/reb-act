const SubmitButton = ({ isSubmitting, handleSubmit }) => {
  return isSubmitting ? (
    <div className="flex justify-center mt-4">
      <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
    </div>
  ) : (
    <button
      onClick={handleSubmit}
      className="bg-emerald-800 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-md mt-6 tracking-wide transition-all duration-200"
      style={{ marginTop: '20px' }}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
