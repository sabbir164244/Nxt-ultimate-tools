import React from 'react';
import { marked } from 'marked';

interface LetterTemplateProps {
  markdownContent: string;
  font: string;
}

const LetterTemplate: React.FC<LetterTemplateProps> = React.forwardRef(({ markdownContent, font }, ref) => {
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="bg-white p-8 shadow-lg prose" style={{ fontFamily: font, width: '210mm', minHeight: '297mm', color: '#333' }}>
      <div dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
    </div>
  );
});

export default LetterTemplate;
