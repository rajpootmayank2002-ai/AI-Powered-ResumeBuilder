import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { generateExperienceBulletPoints } from '../../services/aiService';
import { Sparkles, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ExperienceForm = () => {
  const { resumeData, updateExperience } = useResume();
  const [loadingIndex, setLoadingIndex] = useState(-1);

  const handleChange = (index, event) => {
    const newExperience = [...resumeData.experience];
    newExperience[index][event.target.name] = event.target.value;
    updateExperience(newExperience);
  };

  const addExperience = () => {
    updateExperience([
      ...resumeData.experience,
      {
        title: '',
        company: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummary: ''
      }
    ]);
  };

  const removeExperience = (index) => {
    const newExperience = [...resumeData.experience];
    newExperience.splice(index, 1);
    updateExperience(newExperience);
  };

  const generateAIBulletPoints = async (index) => {
    const exp = resumeData.experience[index];
    if (!exp.title || !exp.company) {
      toast.error('Please enter Title and Company first');
      return;
    }

    setLoadingIndex(index);
    try {
      const currentText = exp.workSummary || "Worked as a " + exp.title;
      const bullets = await generateExperienceBulletPoints(exp.title, exp.company, currentText);
      const newExperience = [...resumeData.experience];
      newExperience[index].workSummary = bullets;
      updateExperience(newExperience);
      toast.success('Generated bullet points!');
    } catch (error) {
      toast.error('Error: ' + error.message);
    } finally {
      setLoadingIndex(-1);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Professional Experience</h2>
      <p className="text-sm text-gray-500 mb-6">Add your previous Job experience</p>

      {resumeData.experience.map((exp, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Experience #{index + 1}</h3>
            <button 
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position Title</label>
              <input 
                type="text" 
                name="title"
                value={exp.title}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input 
                type="text" 
                name="company"
                value={exp.company}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                type="text" 
                name="city"
                value={exp.city}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input 
                type="text" 
                name="state"
                value={exp.state}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
              />
            </div>
          </div>

          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Summary / Responsibilities</label>
              <button 
                onClick={() => generateAIBulletPoints(index)}
                disabled={loadingIndex === index}
                className="flex items-center gap-1.5 px-3 py-1 border border-brand text-brand hover:bg-brand hover:text-white rounded-md transition text-xs font-medium disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
                {loadingIndex === index ? 'Generating...' : 'Enhance with AI'}
              </button>
            </div>
            <textarea
              name="workSummary"
              rows={4}
              value={exp.workSummary}
              onChange={(e) => handleChange(index, e)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none resize-none"
              placeholder="Added features, fixed bugs, etc."
            />
          </div>
        </div>
      ))}

      <button 
        onClick={addExperience}
        className="flex items-center gap-2 px-4 py-2 text-brand hover:bg-brand/10 rounded-lg transition font-medium"
      >
        <Plus className="w-4 h-4" />
        Add More Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
