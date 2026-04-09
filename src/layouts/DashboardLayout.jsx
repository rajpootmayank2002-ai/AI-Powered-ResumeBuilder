import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden relative bg-gray-50">
      {/* Background Image Setup */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=2000&auto=format&fit=crop')"
        }}
      />
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col pt-16 sm:pt-0 sm:pl-64">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 sm:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
