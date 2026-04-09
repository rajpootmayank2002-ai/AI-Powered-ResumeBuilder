import React from 'react';
import { useResume } from '../context/ResumeContext';

const ResumePreview = ({ id }) => {
  const { resumeData } = useResume();
  const themeColor = resumeData.themeColor || '#000000';
  const [scale, setScale] = React.useState(0.48);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 380) setScale(0.35);
      else if (window.innerWidth < 640) setScale(0.4);
      else if (window.innerWidth < 1024) setScale(0.45);
      else setScale(0.48);
    };
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="glass-card sticky top-6 shadow-2xl h-[95vh] w-full flex flex-col items-center p-4 bg-gray-50/50 overflow-y-auto overflow-x-hidden pt-8">
      
      {/* Wrapper to contain the physical size of the scaled child */}
      <div 
        className="relative mx-auto flex justify-center"
        style={{ width: `${210 * scale}mm`, height: `${297 * scale}mm` }}
      >
        <div 
          id={id} 
          className="bg-white shadow-sm text-black absolute top-0"
          style={{
            width: '210mm',
            height: '297mm',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            padding: '20mm',
            fontFamily: '"Times New Roman", Times, serif'
          }}
        >
        {/* Header - Personal Info */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-1.5 text-black">
            {resumeData.personalDetails.firstName} {resumeData.personalDetails.lastName}
          </h1>
          <div className="text-[13px] flex justify-center items-center flex-wrap gap-2 text-black mb-0.5">
            {[
              resumeData.personalDetails.phone,
              resumeData.personalDetails.address
            ].filter(Boolean).map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span>o</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="text-[13px] flex justify-center items-center flex-wrap gap-2">
            {[
              resumeData.personalDetails.email,
              resumeData.personalDetails.linkedin,
              resumeData.personalDetails.jobTitle
            ].filter(Boolean).map((item, index) => {
              const isLinkedin = item === resumeData.personalDetails.linkedin && item !== '';
              return (
                <React.Fragment key={index}>
                  {index > 0 && <span className="text-black">o</span>}
                  {isLinkedin ? (
                    <a 
                      id="linkedin-link-node"
                      href={item.startsWith('http') ? item : `https://${item}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:underline cursor-pointer dynamic-link-node"
                      style={{ color: themeColor !== '#000000' && themeColor !== '#ffffff' ? themeColor : '#2563eb' }}
                    >
                      {item}
                    </a>
                  ) : (
                    <span style={{ color: themeColor !== '#000000' && themeColor !== '#ffffff' ? themeColor : '#2563eb' }}>
                      {item}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Objective */}
        {resumeData.summary && (
          <div className="mb-4">
             <h2 className="text-[14px] font-bold uppercase text-black tracking-wide mb-1">
               Objective
             </h2>
             <div className="w-full border-t-[1.5px] border-black mb-2" />
             <p className="text-[13px] text-justify leading-snug">
               {resumeData.summary}
             </p>
          </div>
        )}

        {/* Education */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[14px] font-bold uppercase text-black tracking-wide mb-1">
              Education
            </h2>
            <div className="w-full border-t-[1.5px] border-black mb-2" />
            <div className="space-y-3 text-[13px]">
              {resumeData.education.map((edu, index) => (
                <div key={index}>
                   <div className="font-bold mb-0.5">
                     {edu.degree} {edu.major ? `(${edu.major}),` : ''}
                   </div>
                   <div className="flex justify-between items-start">
                     <div>{edu.universityName}</div>
                     <div className="whitespace-nowrap ml-4">
                       {edu.startDate} {edu.startDate && edu.endDate && ' - '} {edu.endDate}
                     </div>
                   </div>
                   {edu.description && <div className="mt-1">{edu.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="mb-4">
             <h2 className="text-[14px] font-bold uppercase text-black tracking-wide mb-1">
               Skills
             </h2>
             <div className="w-full border-t-[1.5px] border-black mb-2" />
             <div className="space-y-1 text-[13px]">
               {resumeData.skills.map((skill, index) => (
                 <div key={index} className="flex">
                   <div className="font-bold w-[140px] flex-shrink-0">{skill.name}</div>
                   <div className="flex-grow leading-snug">{skill.rating}</div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Professional Experience */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="mb-4">
            <h2 className="text-[14px] font-bold uppercase text-black tracking-wide mb-1">
              Experience
            </h2>
            <div className="w-full border-t-[1.5px] border-black mb-2" />
            <div className="space-y-3">
              {resumeData.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <span className="text-[13px] font-bold">{exp.title}</span>
                    <span className="text-[13px] whitespace-nowrap ml-4">
                      {exp.startDate} {exp.startDate && exp.endDate && ' - '} {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[13px] mb-1 italic text-gray-700">
                    {exp.company}{exp.city && `, ${exp.city}`}{exp.state && `, ${exp.state}`}
                  </div>
                  {exp.workSummary && (
                    <div className="text-[13px] leading-snug pl-4 ml-1 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: exp.workSummary.replace(/-/g, '• ') }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="mb-4">
             <h2 className="text-[14px] font-bold uppercase text-black tracking-wide mb-1">
               Projects
             </h2>
             <div className="w-full border-t-[1.5px] border-black mb-2" />
             <div className="space-y-3 text-[13px]">
               {resumeData.projects.map((proj, index) => (
                 <div key={index} className="leading-tight text-[13px] text-justify mb-2">
                   <div>
                     <span className="font-bold">{proj.title} </span>
                     {proj.link && (
                       <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="dynamic-link-node hover:underline ml-1" style={{ color: themeColor !== '#000000' && themeColor !== '#ffffff' ? themeColor : '#2563eb' }}>
                         [{proj.link.replace(/^https?:\/\//, '')}]
                       </a>
                     )}
                   </div>
                   <span>{proj.description}</span>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* Extra-Curricular Activities */}
        {resumeData.activities && (
          <div className="mb-4">
             <h2 className="text-[14px] font-bold uppercase text-black tracking-wide mb-1">
               Extra-Curricular Activities
             </h2>
             <div className="w-full border-t-[1.5px] border-black mb-2" />
             <div className="text-[13px] leading-snug space-y-1 pl-4 mx-2">
               {resumeData.activities.split('\n').filter(Boolean).map((item, i) => {
                 const text = item.replace(/^-\s*/, '');
                 const urlRegex = /(https?:\/\/[^\s]+)/g;
                 const parts = text.split(urlRegex);
                 return (
                   <div key={i} className="flex items-start">
                     <span className="mr-2 font-bold">•</span>
                     <span className="leading-tight text-justify">
                       {parts.map((p, pIndex) => 
                         p.match(urlRegex) ? (
                           <a key={pIndex} href={p} target="_blank" rel="noopener noreferrer" className="dynamic-link-node hover:underline" style={{ color: themeColor !== '#000000' && themeColor !== '#ffffff' ? themeColor : '#2563eb' }}>
                             {p.replace(/^https?:\/\//, '')}
                           </a>
                         ) : p
                       )}
                     </span>
                   </div>
                 );
               })}
             </div>
          </div>
        )}

        {/* Achievements */}
         {resumeData.achievements && (
          <div className="mb-4">
             <h2 className="text-[14px] font-bold uppercase text-black tracking-wide mb-1">
               Achievements
             </h2>
             <div className="w-full border-t-[1.5px] border-black mb-2" />
             <div className="text-[13px] leading-snug space-y-1 pl-4 mx-2">
               {resumeData.achievements.split('\n').filter(Boolean).map((item, i) => {
                 const text = item.replace(/^-\s*/, '');
                 const urlRegex = /(https?:\/\/[^\s]+)/g;
                 const parts = text.split(urlRegex);
                 return (
                   <div key={i} className="flex items-start">
                     <span className="mr-2 font-bold">•</span>
                     <span className="leading-tight text-justify">
                       {parts.map((p, pIndex) => 
                         p.match(urlRegex) ? (
                           <a key={pIndex} href={p} target="_blank" rel="noopener noreferrer" className="dynamic-link-node hover:underline" style={{ color: themeColor !== '#000000' && themeColor !== '#ffffff' ? themeColor : '#2563eb' }}>
                             {p.replace(/^https?:\/\//, '')}
                           </a>
                         ) : p
                       )}
                     </span>
                   </div>
                 );
               })}
             </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
