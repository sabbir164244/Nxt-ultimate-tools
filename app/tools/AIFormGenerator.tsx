'use client';

import { useState, useRef } from 'react';
import FormTemplate from './FormTemplate'; // Naya Form Template

export default function AIFormGenerator() {
  const [userInput, setUserInput] = useState("A contact form with fields for Name, Email, and Message, and a Submit button.");
  const [language, setLanguage] = useState('English');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);

  const generatePrompt = (input: string, lang: string) => {
    return `Generate a complete, single-file HTML code for a form in ${lang} based on this request: "${input}". The output MUST be a valid HTML code block starting with \`\`\`html and ending with \`\`\`. Include a <style> tag in the HTML for professional styling (e.g., dark theme, clean inputs).`;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedContent('');
    const prompt = generatePrompt(userInput, language);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setGeneratedContent(response.ok ? data.generatedContent : `Error: ${data.error}`);
    } catch (error) { setGeneratedContent('An unexpected error occurred.'); }
    setIsGenerating(false);
  };
  
  const downloadText = () => {
    const match = generatedContent.match(/```html\n([\s\S]*?)\n```/);
    const htmlContent = match ? match[1] : generatedContent;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `form.html`;
    link.click();
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-input-method-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI HTML Form Generator</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">1. Describe Form</h3>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} rows={15} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <h3 className="text-lg font-semibold text-white">2. Select Language</h3>
              <input value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105">
                {isGenerating ? 'Generating...' : `3. Generate Form`}
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Live Preview</h3>
              <div className="w-full h-[60vh] bg-slate-900 rounded-lg">
                {generatedContent && <FormTemplate ref={previewRef} markdownContent={generatedContent} />}
              </div>
              <div className="flex justify-center">
                 <button onClick={downloadText} disabled={!generatedContent || isGenerating} className="bg-green-500/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-file-code-line mr-2"></i>Download HTML</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
