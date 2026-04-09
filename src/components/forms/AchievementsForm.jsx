import React from 'react';
import { useResume } from '../../context/ResumeContext';

const AchievementsForm = () => {
  const { resumeData, updateAchievements } = useResume();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Achievements</h2>
        <p className="text-sm text-gray-500">List your certificates, awards or recognitions (URLs will automatically become clickable links)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
        <textarea
          rows={8}
          value={resumeData.achievements || ''}
          onChange={(e) => updateAchievements(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none resize-none"
          placeholder={`- Earned a completion certificate from IBM SkillBuild\n- Oracle Database programming certification`}
        />
      </div>
    </div>
  );
};

export default AchievementsForm;
