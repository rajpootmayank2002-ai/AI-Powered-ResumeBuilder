import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

const initialResumeState = {
  title: 'Untitled Resume',
  personalDetails: {
    firstName: '',
    lastName: '',
    jobTitle: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    linkedin: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  activities: '',
  achievements: '',
  themeColor: '#8b5cf6'
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeState);
  const [activeStep, setActiveStep] = useState(1);

  const updatePersonalDetails = (details) => {
    setResumeData(prev => ({ ...prev, personalDetails: { ...prev.personalDetails, ...details } }));
  };

  const updateSummary = (summary) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const updateExperience = (experience) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateProjects = (projects) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const updateActivities = (activities) => {
    setResumeData(prev => ({ ...prev, activities }));
  };

  const updateAchievements = (achievements) => {
    setResumeData(prev => ({ ...prev, achievements }));
  };

  const updateThemeColor = (color) => {
    setResumeData(prev => ({ ...prev, themeColor: color }));
  };

  const value = {
    resumeData,
    setResumeData,
    updatePersonalDetails,
    updateSummary,
    updateExperience,
    updateEducation,
    updateSkills,
    updateProjects,
    updateActivities,
    updateAchievements,
    updateThemeColor,
    activeStep,
    setActiveStep
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  return useContext(ResumeContext);
};
