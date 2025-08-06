import React from 'react';

// Yeh function AI se mile Markdown text ko alag-alag sections mein todega
const parseCVContent = (markdown: string) => {
  const sections: { [key: string]: string } = {};
  const lines = markdown.split('\n');
  let currentSection = '';
  let content = '';

  lines.forEach(line => {
    if (line.startsWith('## ')) {
      if (currentSection && content) sections[currentSection] = content.trim();
      currentSection = line.replace('## ', '').trim();
      content = '';
    } else if (line.startsWith('# ')) {
        if (currentSection && content) sections[currentSection] = content.trim();
        sections['FullName'] = line.replace('# ', '').trim();
        currentSection = '';
        content = '';
    } else {
      content += line + '\n';
    }
  });
  if (currentSection && content) sections[currentSection] = content.trim();

  // Simple parsing for contact info
  const contactInfo = sections['Contact'] || '';
  const emailMatch = contactInfo.match(/Email:\s*(.*)/);
  const phoneMatch = contactInfo.match(/Phone:\s*(.*)/);
  const addressMatch = contactInfo.match(/Address:\s*(.*)/);
  const linkedinMatch = contactInfo.match(/LinkedIn:\s*(.*)/);
  
  return {
    fullName: sections['FullName'] || 'Your Name',
    jobTitle: sections['JobTitle'] || 'Your Profession',
    email: emailMatch ? emailMatch[1] : '',
    phone: phoneMatch ? phoneMatch[1] : '',
    address: addressMatch ? addressMatch[1] : '',
    linkedin: linkedinMatch ? linkedinMatch[1] : '',
    profile: sections['Summary'] || sections['Profile'] || '',
    experience: sections['Work Experience'] || '',
    education: sections['Education'] || '',
    skills: sections['Skills'] || '',
  };
};

interface CVTemplateProps {
  markdownContent: string;
  font: string;
}

// Yeh hamara naya, khoobsurat template hai
const CVTemplate: React.FC<CVTemplateProps> = React.forwardRef(({ markdownContent, font }, ref) => {
  const cvData = parseCVContent(markdownContent);

  const renderMarkdownList = (text: string) => {
      return text.split('\n').map((item, index) => {
          if (item.trim().startsWith('* ') || item.trim().startsWith('- ')) {
              return <li key={index} className="text-sm mb-1">{item.replace(/[-*]\s*/, '')}</li>;
          }
          return null;
      }).filter(Boolean);
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="bg-white text-gray-800 shadow-lg" style={{ fontFamily: font, width: '210mm', minHeight: '297mm', display: 'flex' }}>
      {/* Left Sidebar (Blue) */}
      <div className="bg-slate-800 text-white p-6" style={{ width: '35%' }}>
        <h2 className="text-lg font-bold border-b-2 border-slate-500 pb-2 mb-4">CONTACT</h2>
        <div className="text-sm space-y-2 mb-6">
          <p>{cvData.phone}</p>
          <p>{cvData.email}</p>
          <p>{cvData.address}</p>
          <p>{cvData.linkedin}</p>
        </div>
        
        <h2 className="text-lg font-bold border-b-2 border-slate-500 pb-2 mb-4">EDUCATION</h2>
        <div className="text-sm space-y-2 mb-6" dangerouslySetInnerHTML={{ __html: cvData.education.replace(/\n/g, '<br/>') }}></div>
        
        <h2 className="text-lg font-bold border-b-2 border-slate-500 pb-2 mb-4">SKILLS</h2>
        <ul className="list-disc list-inside space-y-1">
            {renderMarkdownList(cvData.skills)}
        </ul>
      </div>

      {/* Right Main Content */}
      <div className="p-8" style={{ width: '65%' }}>
        <h1 className="text-4xl font-extrabold text-slate-800 uppercase tracking-wider">{cvData.fullName}</h1>
        <p className="text-md text-slate-600 tracking-widest mt-1 mb-6">{cvData.jobTitle}</p>
        
        <h2 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">PROFILE</h2>
        <p className="text-sm text-gray-700 mb-6">{cvData.profile}</p>
        
        <h2 className="text-xl font-bold text-slate-700 border-b-2 border-slate-300 pb-2 mb-4">WORK EXPERIENCE</h2>
        <div className="text-sm text-gray-700 space-y-4" dangerouslySetInnerHTML={{ __html: cvData.experience.replace(/\n/g, '<br/>').replace(/-\s/g, '• ') }}></div>
      </div>
    </div>
  );
});

export default CVTemplate;
