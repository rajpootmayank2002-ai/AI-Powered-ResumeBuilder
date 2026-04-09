import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, PlayCircle, FileText, Sparkles, Download } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 relative">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-[-1] top-0 left-0 w-full h-[120vh] bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,1)), url('https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=2000&auto=format&fit=crop')"
        }}
      />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/40 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">AI Resume</span>
        </div>
        <div>
          <button 
            onClick={handleGetStarted}
            className="px-5 py-2.5 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center mt-24 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-brand font-medium text-sm mb-6 border border-purple-100">
          ✨ New: Gemini AI Powered Generator
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
          Build Your Resume <br className="hidden md:block"/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-pink-500">With AI</span>
        </h1>
        
        <p className="text-lg text-gray-500 mb-10 max-w-2xl">
          Effortlessly Craft a Standout Resume with Our AI-Powered Builder. Create professional bullet points, compelling summaries, and export to PDF in minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={handleGetStarted}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand text-white font-semibold text-lg hover:bg-brand-dark transition-all hover:scale-105 shadow-lg shadow-brand/30"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
          <a 
            href="/resume_demo.webp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-lg hover:bg-gray-50 transition-all hover:scale-105"
          >
            <PlayCircle className="w-5 h-5" /> Watch video
          </a>
        </div>
      </main>

      {/* Featured In */}
      <section className="mt-28 py-10 border-t border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <p className="text-center text-sm font-semibold tracking-wider text-gray-400 uppercase mb-8">
          Featured In
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Faux Logos combining SVGs and Text */}
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
             <div className="w-8 h-6 bg-red-600 rounded-lg flex items-center justify-center text-white"><PlayCircle className="w-4 h-4 fill-current"/></div>
             YouTube
          </div>
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
             <div className="w-8 h-8 bg-[#cc4d29] rounded-full flex items-center justify-center text-white text-lg">P</div>
             Product Hunt
          </div>
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tight">
             <div className="w-8 h-8 bg-[#ff4500] rounded-full flex items-center justify-center text-white"><span className="w-5 h-5 bg-white rounded-full"></span></div>
             reddit
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mt-24 mb-32 px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it Works?</h2>
        <p className="text-gray-500 mb-16">Get your dream job in just 3 simple steps</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">1. Add Details</h3>
            <p className="text-gray-500 text-sm">Enter your personal information, education, and basic job titles into our modern forms.</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">2. AI Generation</h3>
            <p className="text-gray-500 text-sm">Let our Gemini AI analyze your profile and write out compelling summaries and professional bullet points.</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 mb-4">
              <Download className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">3. Export</h3>
            <p className="text-gray-500 text-sm">Select your favorite theme color and instantly download your production-ready PDF.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 font-medium text-sm border-t border-white/20 bg-white/30 backdrop-blur-md">
        Created by Mayank Rajput<br/>
        &copy; {new Date().getFullYear()} All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
