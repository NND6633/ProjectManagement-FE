const InputField = ({ label, type = "text", name, placeholder, value, onChange }) => {
  return (
    <div className="mb-4 text-left">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
        required
      />
    </div>
  );
};

export default InputField;