import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { resumeData, updateEducation } = useResume();

  const handleChange = (index, event) => {
    const newEducation = [...resumeData.education];
    newEducation[index][event.target.name] = event.target.value;
    updateEducation(newEducation);
  };

  const addEducation = () => {
    updateEducation([
      ...resumeData.education,
      {
        universityName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ]);
  };

  const removeEducation = (index) => {
    const newEducation = [...resumeData.education];
    newEducation.splice(index, 1);
    updateEducation(newEducation);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Education Section</h2>
      <p className="text-sm text-gray-500 mb-6">Add your educational background</p>

      {resumeData.education.map((edu, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Education #{index + 1}</h3>
            <button 
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">University / School Name</label>
              <input 
                type="text" 
                name="universityName"
                value={edu.universityName}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
              <input 
                type="text" 
                name="degree"
                value={edu.degree}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Major</label>
              <input 
                type="text" 
                name="major"
                value={edu.major}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={edu.startDate}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                type="date" 
                name="endDate"
                value={edu.endDate}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea
                name="description"
                rows={3}
                value={edu.description}
                onChange={(e) => handleChange(index, e)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none resize-none"
              />
            </div>
          </div>
        </div>
      ))}

      <button 
        onClick={addEducation}
        className="flex items-center gap-2 px-4 py-2 text-brand hover:bg-brand/10 rounded-lg transition font-medium"
      >
        <Plus className="w-4 h-4" />
        Add More Education
      </button>
    </div>
  );
};

export default EducationForm;
