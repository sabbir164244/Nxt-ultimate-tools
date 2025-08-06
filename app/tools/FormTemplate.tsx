import React from 'react';

// Yeh function Markdown code block se HTML nikalta hai
const extractHtmlContent = (markdown: string) => {
    const match = markdown.match(/```html\n([\s\S]*?)\n```/);
    return match ? match[1] : markdown;
};

interface FormTemplateProps {
  markdownContent: string;
}

const FormTemplate: React.FC<FormTemplateProps> = React.forwardRef(({ markdownContent }, ref) => {
    const htmlContent = extractHtmlContent(markdownContent);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="bg-white p-4 shadow-lg w-full h-full">
        <iframe
            srcDoc={htmlContent}
            title="Form Preview"
            className="w-full h-full border-0"
            sandbox="allow-forms allow-scripts"
        />
    </div>
  );
});

export default FormTemplate;
