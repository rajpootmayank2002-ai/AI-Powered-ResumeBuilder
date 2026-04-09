import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { generateSummary } from '../../services/aiService';
import { Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const SummaryForm = () => {
  const { resumeData, updateSummary } = useResume();
  const [loading, setLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const generateAI = async () => {
    if (!resumeData.personalDetails.jobTitle) {
      toast.error('Please enter a Job Title in the previous step');
      return;
    }
    
    setLoading(true);
    try {
      const summary = await generateSummary(resumeData.personalDetails.jobTitle, 'mid', customPrompt);
      updateSummary(summary);
      toast.success('Summary generated!');
    } catch (error) {
      toast.error('Error generating summary: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">Summary</h2>
          <p className="text-sm text-gray-500">Add Summary for your job title</p>
        </div>
        <button 
          onClick={generateAI}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-brand text-brand hover:bg-brand hover:text-white rounded-lg transition text-sm font-medium disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? 'Generating...' : 'Generate from AI'}
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Custom AI Instructions (Optional)</label>
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
          placeholder="e.g., Focus heavily on leadership and Python skills"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Add Summary</label>
        <textarea
          rows={6}
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none resize-none"
          placeholder="Write a brief professional summary..."
        />
      </div>
    </div>
  );
};

export default SummaryForm;
