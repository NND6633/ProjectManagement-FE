import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/Signup/AuthHeader';
import InputField from '../../components/Signup/InputField';
import SkillsInput from '../../components/Signup/SkillsInput';
import { registerApi } from '../../services/authService';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [skills, setSkills] = useState(['React', 'NodeJS']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ==========================================
  // LOGIC KIỂM TRA MẬT KHẨU TRỰC TIẾP (ON-THE-FLY)
  // ==========================================
  const passwordRules = [
    { id: 1, label: "At least 7 characters long", isValid: formData.password.length >= 7 },
    { id: 2, label: "1 uppercase letter", isValid: /[A-Z]/.test(formData.password) },
    { id: 3, label: "1 lowercase letter", isValid: /[a-z]/.test(formData.password) },
    { id: 4, label: "1 special character", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ];

  // Kiểm tra xem tất cả các quy tắc đã xanh hết chưa
  const isPasswordValid = passwordRules.every(rule => rule.isValid);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError("Full Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email Address is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email Address is invalid.");
      return;
    }

    if (!formData.password) {
      setError("Password is required.");
      return;
    }

    // Nếu mật khẩu chưa xanh hết các tích thì chặn lại
    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (!formData.confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const newUserData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        skills: skills,
        avatar: "https://i.pravatar.cc/150?u=" + formData.email
      };

      await registerApi(newUserData);
      setSuccessMsg("Registration successful! Please check your email to confirm your account.");

    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl border border-slate-100 relative z-10">

          <AuthHeader title="Create Account" subtitle="Join ProManage today." showBack={true} />

          <form onSubmit={handleSignup} noValidate>
            <InputField label="Full Name" name="fullName"  value={formData.fullName} onChange={handleChange} />
            <InputField label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} />

            <div className="mb-4">
              <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />
              
              {/* UI: DANH SÁCH CHECK ĐIỀU KIỆN MẬT KHẨU */}
              <div className="mt-2 space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-100">
                {passwordRules.map(rule => (
                  <div key={rule.id} className="flex items-center text-xs">
                    {rule.isValid ? (
                      // Dấu tích xanh
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                      </svg>
                    ) : (
                      // Dấu X đỏ
                      <svg className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    )}
                    <span className={rule.isValid ? "text-slate-700" : "text-slate-500"}>
                      {rule.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <InputField label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />

            <SkillsInput skills={skills} setSkills={setSkills} />

            {error && <div className="mb-4 text-red-500 text-sm text-center bg-red-50 p-2.5 rounded border border-red-100 font-medium">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-[#5b61f4] hover:bg-indigo-700 disabled:bg-indigo-300 transition-all"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="font-semibold text-[#5b61f4] hover:underline">Login</button>
            </p>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center transform transition-all">

            <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-4">
              <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-2">Success!</h3>
            <p className="text-sm text-slate-600 mb-6">{successMsg}</p>

            <button
              onClick={() => {
                setSuccessMsg('');
                navigate('/login');
              }}
              className="w-full py-2.5 px-4 bg-[#5b61f4] hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              OK, Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;