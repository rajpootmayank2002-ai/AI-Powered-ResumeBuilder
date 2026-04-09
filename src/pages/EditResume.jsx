import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import PersonalDetailForm from '../components/forms/PersonalDetailForm';
import SummaryForm from '../components/forms/SummaryForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ActivitiesForm from '../components/forms/ActivitiesForm';
import AchievementsForm from '../components/forms/AchievementsForm';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeft, ArrowRight, Download, Save, Home, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const EditResume = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { activeStep, setActiveStep, resumeData, setResumeData, updateThemeColor } = useResume();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#64748b'];

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, 'resumes', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists() && docSnap.data().userId === currentUser.uid) {
          setResumeData(docSnap.data());
        } else {
          toast.error('Resume not found or access denied');
          navigate('/dashboard');
        }
      } catch (error) {
        toast.error('Failed to load resume');
      } finally {
        setLoading(false);
      }
    };
    
    fetchResume();
  }, [id, currentUser, setResumeData, navigate]);

  const FormComponents = [
    PersonalDetailForm,
    SummaryForm,
    ExperienceForm,
    ProjectsForm,
    EducationForm,
    SkillsForm,
    ActivitiesForm,
    AchievementsForm
  ];

  const MAX_STEP = FormComponents.length;
  const CurrentForm = FormComponents[activeStep - 1];

  const handleNext = () => {
    if (activeStep < MAX_STEP) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, 'resumes', id);
      await updateDoc(docRef, {
        ...resumeData,
        updatedAt: Date.now()
      });
      toast.success('Resume updated successfully!');
    } catch (error) {
      toast.error('Failed to update resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview-container');
    if (!element) return;
    
    try {
      toast.loading('Generating High-Quality PDF...', { id: 'pdf' });
      
      // Temporarily remove scale transform for crisp rendering
      const originalTransform = element.style.transform;
      element.style.transform = 'none';

      // Capture snapshot while unscaled
      const canvas = await html2canvas(element, { 
        scale: 3,
        useCORS: true
      });
      
      // Find hyperlink coordinates while still unscaled
      const linkNodes = Array.from(document.querySelectorAll('.dynamic-link-node'));
      const containerRect = element.getBoundingClientRect();
      const linkRects = linkNodes.map(node => ({
        rect: node.getBoundingClientRect(),
        href: node.href
      }));

      // Restore transform immediately so user doesn't see UI flash
      element.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Programmatically embed the clickable hyperlink areas over the image
      if (containerRect) {
        const ratio = pdfWidth / containerRect.width;
        linkRects.forEach(({ rect, href }) => {
          if (rect && href) {
            const relativeX = rect.left - containerRect.left;
            const relativeY = rect.top - containerRect.top;
            pdf.link(relativeX * ratio, relativeY * ratio, rect.width * ratio, rect.height * ratio, { url: href });
          }
        });
      }

      pdf.save(`${resumeData.title || 'Resume'}.pdf`);
      toast.success('High-Quality PDF downloaded!', { id: 'pdf' });
    } catch (error) {
      toast.error('Failed to generate PDF', { id: 'pdf' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
      {/* Form Section */}
      <div className="w-full lg:w-[45%] flex flex-col gap-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
            >
              <Home className="w-5 h-5" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <Palette className="w-4 h-4" />
                <span className="text-sm font-medium">Theme</span>
              </button>
              
              {showThemeSelector && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-white rounded-xl shadow-xl border border-gray-100 grid grid-cols-4 gap-2 z-50 w-48">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        updateThemeColor(color);
                        setShowThemeSelector(false);
                      }}
                      className="w-8 h-8 rounded-full border-2 border-transparent hover:scale-110 transition cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleBack}
              disabled={activeStep === 1}
              className="flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              disabled={activeStep === MAX_STEP}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white disabled:opacity-50 transition"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand h-2 rounded-full transition-all duration-300"
            style={{ width: `${(activeStep / MAX_STEP) * 100}%` }}
          ></div>
        </div>

        <div className="glass-card p-6 flex-1 shadow-md">
          <CurrentForm />
        </div>
        
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand hover:bg-brand-dark text-white font-medium transition shadow-sm disabled:opacity-70"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Updating...' : 'Update Resume'}
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:w-[55%] pb-8">
         <React.Suspense fallback={<div>Loading preview...</div>}>
           <ResumePreview id="resume-preview-container" />
        </React.Suspense>
      </div>
    </div>
  );
};

export default EditResume;
