

const IconInput = ({ label, type = "text", name, placeholder, value, onChange, icon }) => {
  return (
    <div className="mb-4 text-left">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        {/* Vùng chứa Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          {icon}
        </div>
        
        {/* Ô Input (thêm pl-10 để chừa khoảng trống cho Icon) */}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b61f4]/50 focus:border-[#5b61f4] transition-all text-slate-800 placeholder-slate-400"
          required
        />
      </div>
    </div>
  );
};

export default IconInput;