'use client';

import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import CVTemplate from './CVTemplate'; // Hamara naya template

const googleFonts = ["Roboto", "Open Sans", "Lato", "Montserrat", "Merriweather", "PT Sans", "Playfair Display", "Noto Sans", "Arial"];

export default function AICVGenerator() {
  const [userInput, setUserInput] = useState("Full Name: Jane Doe\nProfession: Project Manager\nEmail: jane.doe@email.com\nPhone: +1 (555) 123-4567\nAddress: New York, USA\nLinkedIn: linkedin.com/in/janedoe\nSummary: Highly motivated and results-oriented professional with 5+ years of experience...\nWork Experience: - Senior Project Manager at TechCorp (2020-Present). - Led a team of 10...\nEducation: - M.Sc. in Computer Science from MIT (2015-2017).\nSkills: - Project Management\n- Agile Methodologies\n- Team Leadership");
  const [language, setLanguage] = useState('English');
  const [generatedCV, setGeneratedCV] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [font, setFont] = useState('Roboto');
  const cvPreviewRef = useRef(null);

  const generatePrompt = (input: string, lang: string) => {
    return `Generate a professional CV content in ${lang} using Markdown. The CV is for a person with these details: ${input}. 
    Structure the output strictly with these exact headings: '# FullName', '## JobTitle', '## Contact', '## Summary', '## Work Experience', '## Education', '## Skills'.
    Under '## Contact', list Email, Phone, Address, and LinkedIn. Do not add any text before or after the CV content.`;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedCV('');
    const prompt = generatePrompt(userInput, language);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setGeneratedCV(response.ok ? data.generatedContent : `Error: ${data.error}`);
    } catch (error) {
      setGeneratedCV('An unexpected error occurred.');
    }
    setIsGenerating(false);
  };

  const downloadPDF = () => {
    if (!cvPreviewRef.current) return;
    const element = cvPreviewRef.current;
    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("cv.pdf");
    });
  };

  const downloadImage = () => {
    if (!cvPreviewRef.current) return;
    html2canvas(cvPreviewRef.current, { scale: 2 }).then(canvas => {
      const link = document.createElement('a');
      link.download = `cv.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-user-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI CV Generator</h2>
            <p className="text-white/70">Create a professional CV in any language using AI.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">1. Enter Your Details</h3>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} rows={15} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <h3 className="text-lg font-semibold text-white">2. Select Language</h3>
              <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="e.g., English, Urdu, French" className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 disabled:opacity-50">
                {isGenerating ? 'Generating...' : `3. Generate AI CV`}
              </button>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">AI Generated Preview</h3>
                  <div className="flex items-center gap-2">
                    <label className="text-white/80 text-sm">Font:</label>
                    <select value={font} onChange={(e) => setFont(e.target.value)} className="p-1 bg-white/10 rounded border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs">
                        {googleFonts.map(f => <option key={f} value={f} className="bg-slate-800">{f}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="w-full overflow-auto h-[60vh] bg-slate-900 rounded-lg p-2">
                    {isGenerating && <p className="text-white text-center p-10">AI is designing your CV... ✨</p>}
                    {generatedCV && <CVTemplate ref={cvPreviewRef} markdownContent={generatedCV} font={font} />}
                    {!isGenerating && !generatedCV && <p className="text-white/50 text-center p-10">Your professional CV will appear here.</p>}
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                 <button onClick={downloadPDF} disabled={!generatedCV || isGenerating} className="bg-red-500/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-file-pdf-line mr-2"></i>PDF</button>
                 <button onClick={downloadImage} disabled={!generatedCV || isGenerating} className="bg-blue-500/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-image-line mr-2"></i>Image</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
    }
