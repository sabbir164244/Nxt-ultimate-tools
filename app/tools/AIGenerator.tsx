'use client';

import { useState, useRef } from 'react';
import { marked } from 'marked';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

// Professional fonts ki list
const googleFonts = ["Roboto", "Open Sans", "Lato", "Montserrat", "Merriweather", "PT Sans", "Playfair Display", "Noto Sans", "Arial"];

// Component ke props ka structure define karna
interface AIGeneratorProps {
  toolName: string;
  icon: string;
  description: string;
  promptPlaceholder: string;
  initialPrompt: string;
  generatePrompt: (input: string, language: string) => string;
  isExcelTool?: boolean;
}

export default function AIGenerator({ toolName, icon, description, promptPlaceholder, initialPrompt, generatePrompt, isExcelTool = false }: AIGeneratorProps) {
  const [userInput, setUserInput] = useState(initialPrompt);
  const [language, setLanguage] = useState('English');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [font, setFont] = useState('Roboto');
  const previewRef = useRef<HTMLDivElement>(null);

  // AI se content generate karne ka function (UPDATED FOR BETTER ERROR HANDLING)
  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedContent('');
    const prompt = generatePrompt(userInput, language);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGeneratedContent(data.generatedContent);
      } else {
        // Asli error ko screen par dikhayein
        const errorMessage = `API ERROR (Status: ${response.status}): ${data.error || 'Failed to fetch from server.'}`;
        setGeneratedContent(errorMessage);
        console.error(errorMessage, data);
      }
    } catch (error) {
      const clientErrorMessage = `CLIENT-SIDE ERROR: Could not connect to the API. Check network. Details: ${(error as Error).message}`;
      setGeneratedContent(clientErrorMessage);
      console.error(clientErrorMessage);
    }
    setIsGenerating(false);
  };

  // --- Triple Download System ---
  const downloadPDF = () => {
    if (!previewRef.current) return;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    doc.html(previewRef.current, {
      callback: (doc) => doc.save(`${toolName.replace(/ /g, '_')}.pdf`),
      margin: [15, 15, 15, 15],
      autoPaging: 'text',
      width: 180,
      windowWidth: previewRef.current.scrollWidth,
    });
  };

  const downloadImage = () => {
    if (!previewRef.current) return;
    html2canvas(previewRef.current, { scale: 2, backgroundColor: '#1e293b' }).then(canvas => {
      const link = document.createElement('a');
      link.download = `${toolName.replace(/ /g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };
  
  const downloadText = () => {
    const blob = new Blob([generatedContent], { type: 'text/markdown;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${toolName.replace(/ /g, '_')}.md`;
    link.click();
  };
  
  const downloadExcel = () => {
    if (!generatedContent) return;
    try {
      const lines = generatedContent.trim().split('\n').filter(line => line.includes('|'));
      const data = lines.map(line => line.split('|').map(s => s.trim()).slice(1, -1));
      if (data.length < 2) throw new Error("No valid table data found.");
      const header = data[0];
      const body = data.slice(2);
      const ws = XLSX.utils.aoa_to_sheet([header, ...body]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "Generated_Sheet.xlsx");
    } catch(e) {
      alert("Could not parse table data for Excel export.");
    }
  };

  // Har tool ka user interface
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className={`${icon} text-white text-3xl`}></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{toolName}</h2>
            <p className="text-white/70">{description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">1. Enter Your Details</h3>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder={promptPlaceholder} rows={12} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <h3 className="text-lg font-semibold text-white">2. Select Language</h3>
              <input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="e.g., English, Urdu, French" className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 disabled:opacity-50">
                {isGenerating ? 'Generating...' : `3. Generate ${toolName}`}
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
              <div ref={previewRef} className="prose prose-invert max-w-none w-full h-[50vh] p-4 bg-slate-800 border border-white/10 rounded-xl text-white overflow-auto" style={{ fontFamily: font, background: '#1e293b' }}>
                {isGenerating ? <p>AI is working its magic... ✨</p> : <div dangerouslySetInnerHTML={{ __html: marked(generatedContent) }} />}
                {!isGenerating && !generatedContent && <p className="text-white/50">Your result will appear here.</p>}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                 <button onClick={downloadPDF} disabled={!generatedContent || isGenerating} className="bg-red-500/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-file-pdf-line mr-2"></i>PDF</button>
                 <button onClick={downloadImage} disabled={!generatedContent || isGenerating} className="bg-blue-500/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-image-line mr-2"></i>Image</button>
                 <button onClick={downloadText} disabled={!generatedContent || isGenerating} className="bg-green-500/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-file-text-line mr-2"></i>Text</button>
                 {isExcelTool && <button onClick={downloadExcel} disabled={!generatedContent || isGenerating} className="bg-emerald-600/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-file-excel-2-line mr-2"></i>Excel</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
        }
