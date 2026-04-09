import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResume();

  const handleRatingChange = (index, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index].rating = value;
    updateSkills(newSkills);
  };

  const handleNameChange = (index, value) => {
    const newSkills = [...resumeData.skills];
    newSkills[index].name = value;
    updateSkills(newSkills);
  };

  const addSkill = () => {
    updateSkills([...resumeData.skills, { name: '', rating: '' }]);
  };

  const removeSkill = (index) => {
    const newSkills = [...resumeData.skills];
    newSkills.splice(index, 1);
    updateSkills(newSkills);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Skills</h2>
      <p className="text-sm text-gray-500 mb-6">Group your skills by categories to match ATS standard templates</p>

      {resumeData.skills.map((skill, index) => (
        <div key={index} className="flex flex-col sm:flex-row gap-4 mb-4 items-center">
          <div className="w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input 
              type="text" 
              value={skill.name}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
              placeholder="e.g. Technical Skills"
            />
          </div>
          
          <div className="flex-1 w-full">
             <label className="block text-sm font-medium text-gray-700 mb-1">Skills List</label>
             <input type="text" value={skill.rating} onChange={(e) => handleRatingChange(index, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none" placeholder="e.g. HTML, CSS, JavaScript, React" />
          </div>

          <button 
            onClick={() => removeSkill(index)}
            className="mt-6 p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg shrink-0 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      <button 
        onClick={addSkill}
        className="flex items-center gap-2 px-4 py-2 mt-4 text-brand hover:bg-brand/10 rounded-lg transition font-medium"
      >
        <Plus className="w-4 h-4" />
        Add More Skill
      </button>
    </div>
  );
};

export default SkillsForm;
