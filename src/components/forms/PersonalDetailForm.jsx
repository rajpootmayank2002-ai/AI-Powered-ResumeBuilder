import React from 'react';
import { useResume } from '../../context/ResumeContext';

const PersonalDetailForm = () => {
  const { resumeData, updatePersonalDetails, setResumeData } = useResume();

  const handleChange = (e) => {
    updatePersonalDetails({ [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">Personal Details</h2>
      <p className="text-sm text-gray-500 mb-6">Get started with the basic information</p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Resume Title</label>
        <input 
          type="text" 
          value={resumeData.title}
          onChange={(e) => setResumeData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input 
            type="text" 
            name="firstName"
            value={resumeData.personalDetails.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input 
            type="text" 
            name="lastName"
            value={resumeData.personalDetails.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input 
            type="text" 
            name="jobTitle"
            value={resumeData.personalDetails.jobTitle}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input 
            type="text" 
            name="address"
            value={resumeData.personalDetails.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input 
            type="text" 
            name="phone"
            value={resumeData.personalDetails.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            name="email"
            value={resumeData.personalDetails.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input 
            type="text" 
            name="linkedin"
            value={resumeData.personalDetails.linkedin || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-brand focus:border-brand outline-none bg-blue-50/50"
            placeholder="e.g. linkedin.com/in/mayankrajput"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailForm;
