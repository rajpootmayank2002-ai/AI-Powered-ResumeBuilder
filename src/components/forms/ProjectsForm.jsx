import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { generateProjectDescription } from '../../services/aiService';
import toast from 'react-hot-toast';

const ProjectsForm = () => {
  const { resumeData, updateProjects } = useResume();
  const [loadingIndex, setLoadingIndex] = useState(null);

  const generateAI = async (index, projectTitle) => {
    if (!projectTitle) {
      toast.error('Please enter a Project Name first');
      return;
    }
    setLoadingIndex(index);
    try {
      const description = await generateProjectDescription(projectTitle);
      const newProjects = [...(resumeData.projects || [])];
      newProjects[index].description = description;
      updateProjects(newProjects);
      toast.success('Description generated!');
    } catch (error) {
      toast.error('Error generating description: ' + error.message);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleChange = (index, event) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects[index][event.target.name] = event.target.value;
    updateProjects(newProjects);
  };

  const addProject = () => {
    updateProjects([...(resumeData.projects || []), { title: '', description: '', link: '' }]);
  };

  const removeProject = (index) => {
    const newProjects = [...(resumeData.projects || [])];
    newProjects.splice(index, 1);
    updateProjects(newProjects);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Projects</h2>
      <p className="text-sm text-gray-500 mb-6">Highlight your most impactful projects. Add live URLs if available.</p>

      {(resumeData.projects || []).map((project, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-xl mb-4 bg-gray-50/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-gray-700">Project {index + 1}</h3>
            <button 
              onClick={() => removeProject(index)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input 
                  type="text" 
                  name="title"
                  value={project.title}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
                  placeholder="e.g. Heart Disease Prediction Model"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
                <input 
                  type="text" 
                  name="link"
                  value={project.link || ''}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
                  placeholder="e.g. https://github.com/my-project"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <button 
                  onClick={() => generateAI(index, project.title)}
                  disabled={loadingIndex === index}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-brand text-brand hover:bg-brand hover:text-white rounded-md transition text-xs font-medium disabled:opacity-50"
                  type="button"
                >
                  <Sparkles className="w-3 h-3" />
                  {loadingIndex === index ? 'Generating...' : 'AI Suggestion'}
                </button>
              </div>
              <textarea 
                name="description"
                value={project.description}
                onChange={(e) => handleChange(index, e)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none resize-none"
                placeholder="e.g. Developed a machine learning project using Python..."
              />
            </div>
          </div>
        </div>
      ))}

      <button 
        onClick={addProject}
        className="flex items-center gap-2 px-4 py-2 mt-2 text-brand hover:bg-brand/10 rounded-lg transition font-medium"
      >
        <Plus className="w-4 h-4" />
        Add New Project
      </button>
    </div>
  );
};

export default ProjectsForm;
