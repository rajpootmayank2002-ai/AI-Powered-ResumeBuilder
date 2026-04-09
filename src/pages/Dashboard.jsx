import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MoreVertical, FileText, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const q = query(collection(db, 'resumes'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const fetchedResumes = [];
        querySnapshot.forEach((doc) => {
          fetchedResumes.push({ id: doc.id, ...doc.data() });
        });
        setResumes(fetchedResumes.sort((a, b) => b.createdAt - a.createdAt));
      } catch (error) {
        toast.error('Failed to load resumes');
      } finally {
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchResumes();
    }
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteDoc(doc(db, 'resumes', id));
        setResumes(resumes.filter(r => r.id !== id));
        toast.success('Resume deleted successfully');
      } catch (error) {
        toast.error('Failed to delete resume');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Dashboard Banner */}
      <div className="relative w-full h-48 rounded-2xl mb-10 overflow-hidden shadow-md flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-brand/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 px-8 md:px-12">
          <h1 className="text-4xl font-bold text-white mb-2 shadow-sm drop-shadow-md tracking-tight">My Resumes</h1>
          <p className="text-white/90 text-lg font-medium drop-shadow-md">Create and manage your AI-powered resumes for your next job role</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Resume Card */}
          <div 
            onClick={() => navigate('/resume/new')}
            className="h-[300px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-brand hover:bg-brand/5 hover:scale-105 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-brand" />
            </div>
            <span className="font-medium text-gray-700">Create New Resume</span>
          </div>

          {/* Existing Resumes */}
          {resumes.map((resume) => (
            <div key={resume.id} className="relative group hover:scale-105 transition-transform">
              <div 
                style={{ backgroundColor: resume.themeColor || '#8b5cf6' }}
                className="h-[300px] rounded-xl shadow-md cursor-pointer flex items-center justify-center relative overflow-hidden"
                onClick={() => navigate(`/resume/${resume.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg z-10">
                  <FileText className="w-12 h-12" style={{ color: resume.themeColor || '#8b5cf6' }} />
                </div>
                
                {/* Title and actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white flex items-center justify-between z-10">
                  <h3 className="font-medium truncate">{resume.title || 'Untitled'}</h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(resume.id);
                    }}
                    className="p-1.5 bg-white/20 hover:bg-white/40 rounded-lg backdrop-blur-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
