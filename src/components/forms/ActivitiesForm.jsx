import React from 'react';
import { useResume } from '../../context/ResumeContext';

const ActivitiesForm = () => {
  const { resumeData, updateActivities } = useResume();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Extra-Curricular Activities</h2>
        <p className="text-sm text-gray-500">List your activities, roles, or organizations (use bullet points or new lines)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Activities</label>
        <textarea
          rows={8}
          value={resumeData.activities || ''}
          onChange={(e) => updateActivities(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none resize-none"
          placeholder={`- Volunteered for local tech workshops\n- Member of the college programming club`}
        />
      </div>
    </div>
  );
};

export default ActivitiesForm;
