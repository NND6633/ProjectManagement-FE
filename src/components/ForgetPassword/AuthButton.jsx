

const AuthButton = ({ type = "button", onClick, disabled, variant = "primary", children, className = "" }) => {
  const baseStyle = "w-full flex justify-center items-center py-2.5 px-4 rounded-lg text-sm font-semibold transition-all active:scale-[0.98]";
  
  // Định nghĩa màu sắc cho 2 loại nút
  const variants = {
    primary: "border border-transparent text-white bg-[#5b61f4] hover:bg-indigo-700 disabled:bg-indigo-300 shadow-sm",
    secondary: "border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 disabled:bg-slate-100"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default AuthButton;