import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../components/Signup/AuthHeader';
import InputField from '../components/Signup/InputField';
import SkillsInput from '../components/Signup/SkillsInput';
import { registerApi } from '../services/authService'; // Phải có dòng này!

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Khai báo đủ các trường dữ liệu
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Kiểm tra mật khẩu
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }

    setLoading(true);
    try {
      // 2. Gom dữ liệu gửi lên Backend
      const newUserData = {
        name: formData.fullName, 
        email: formData.email,
        password: formData.password,
        skills: skills,
        avatar: "https://i.pravatar.cc/150?u=" + formData.email
      };

      // 3. Thực hiện gửi (Đây là lúc "động tĩnh" xảy ra)
      await registerApi(newUserData);
      
      alert('Đăng ký thành công! Đang chuyển về trang đăng nhập...');
      navigate('/login'); // Chuyển trang sau khi xong

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl border border-slate-100">
          
          <AuthHeader title="Create Account" subtitle="Join ProManage today." showBack={true} />

          <form onSubmit={handleSignup}>
            <InputField label="Full Name" name="fullName" placeholder="Jane Doe" value={formData.fullName} onChange={handleChange} />
            <InputField label="Email Address" type="email" name="email" placeholder="jane@example.com" value={formData.email} onChange={handleChange} />
            <InputField label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
            
            {/* Ô nhập lại mật khẩu */}
            <InputField label="Confirm Password" type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />

            <SkillsInput skills={skills} setSkills={setSkills} />

            {error && <div className="mb-4 text-red-500 text-sm text-center bg-red-50 p-2 rounded">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg font-semibold text-white bg-[#5b61f4] hover:bg-indigo-700 disabled:bg-indigo-300 transition-all"
            >
              {loading ? "Processing..." : "Signup"}
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
    </div>
  );
};

export default Signup;