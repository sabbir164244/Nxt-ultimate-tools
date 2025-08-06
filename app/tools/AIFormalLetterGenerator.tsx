'use client';

import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import LetterTemplate from './LetterTemplate'; // Naya Letter Template

const googleFonts = ["Roboto", "Open Sans", "Lato", "Montserrat", "Merriweather", "PT Sans", "Playfair Display"];

export default function AIFormalLetterGenerator() {
  const [userInput, setUserInput] = useState("Subject: Request for Information\nRecipient: The Manager, XYZ Corp\nKey points: I am writing to request details about your new product line. Please provide a brochure and pricing information.");
  const [language, setLanguage] = useState('English');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [font, setFont] = useState('Merriweather');
  const previewRef = useRef(null);

  const generatePrompt = (input: string, lang: string) => {
    return `Write a formal letter in ${lang} using Markdown. Details: ${input}. Structure it as a proper formal letter with sender's address, date, recipient's address, subject line, body paragraphs, and closing. Use formal language.`;
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

  const downloadPDF = () => {
    if (!previewRef.current) return;
    const element = previewRef.current;
    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("formal_letter.pdf");
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-draft-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI Formal Letter Generator</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">1. Enter Details</h3>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} rows={15} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <h3 className="text-lg font-semibold text-white">2. Select Language</h3>
              <input value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105">
                {isGenerating ? 'Generating...' : `3. Generate Letter`}
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Preview</h3>
                 <select value={font} onChange={(e) => setFont(e.target.value)} className="p-1 bg-white/10 rounded border text-white text-xs">
                    {googleFonts.map(f => <option key={f} value={f} className="bg-slate-800">{f}</option>)}
                 </select>
              </div>
              <div className="w-full overflow-auto h-[60vh] bg-slate-900 rounded-lg p-2">
                {generatedContent && <LetterTemplate ref={previewRef} markdownContent={generatedContent} font={font} />}
              </div>
              <div className="flex justify-center">
                 <button onClick={downloadPDF} disabled={!generatedContent || isGenerating} className="bg-red-500/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-file-pdf-line mr-2"></i>Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
        }
