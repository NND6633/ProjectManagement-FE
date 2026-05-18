const Button = ({ children, type = 'button', variant = 'primary', disabled, onClick, className = '' }) => {
  const baseStyle = "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-all";
  
  // Dựa vào variant để chọn màu sắc
  const variants = {
    primary: "bg-[#5b61f4] hover:bg-indigo-600 text-white disabled:bg-indigo-300",
    google: "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-100"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {/* Thêm logo Google nếu là nút Google */}
      {variant === 'google' && (
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />
      )}
      {children}
    </button>
  );
};

export default Button;