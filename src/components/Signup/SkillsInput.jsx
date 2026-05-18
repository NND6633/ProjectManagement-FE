import { useState } from 'react';

const SkillsInput = ({ skills, setSkills }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    // Thêm tag khi bấm Enter hoặc dấu phẩy
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newSkill = inputValue.trim();
      if (newSkill && !skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setInputValue('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="mb-6 text-left">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        Select your core skills
      </label>
      <div className="w-full p-2 rounded-lg border border-slate-200 bg-white flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all">
        
        {/* Render danh sách thẻ tags */}
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="flex items-center gap-1 bg-indigo-50 text-[#5b61f4] text-xs font-semibold px-2.5 py-1 rounded-md"
          >
            {skill}
            <button 
              type="button" 
              onClick={() => removeSkill(skill)}
              className="text-[#5b61f4] hover:text-indigo-800 focus:outline-none"
            >
              &times;
            </button>
          </span>
        ))}

        {/* Ô nhập liệu */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={skills.length === 0 ? "Type to add..." : ""}
          className="flex-1 min-w-[120px] outline-none text-sm text-slate-700 bg-transparent py-1"
        />
      </div>
      <p className="text-xs text-slate-400 mt-1">Press Enter or comma to add a skill</p>
    </div>
  );
};

export default SkillsInput;