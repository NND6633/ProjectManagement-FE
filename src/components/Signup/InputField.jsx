import  { useState } from 'react';

const InputField = ({ label, type = "text", name, placeholder, value, onChange }) => {
  // 1. Tạo state quản lý ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // 2. Kiểm tra xem ô này có phải là ô mật khẩu không
  const isPasswordType = type === "password";
  
  // 3. Nếu là ô mật khẩu và showPassword = true -> chuyển thành text. Ngược lại giữ nguyên.
  const inputType = isPasswordType && showPassword ? "text" : type;

  return (
    <div className="mb-4 text-left">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      
      {/* Container cần có relative để đặt con mắt bên trong */}
      <div className="relative">
        <input
          type={inputType}
          name={name} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          // Thêm pr-10 nếu là password để chữ không đè lên con mắt
          className={`w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400 ${
            isPasswordType ? 'pr-10' : ''
          }`}
          required
        />
        
        {/* Nút con mắt định vị tuyệt đối (absolute) bên phải */}
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
            title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          >
            {showPassword ? (
              // Icon Mắt gạch chéo (Ẩn)
              <svg xmlns="http://www.w0.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              // Icon Mắt mở (Hiện)
              <svg xmlns="http://www.w0.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;