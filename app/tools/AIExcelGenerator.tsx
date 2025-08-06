'use client';

import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import ExcelTemplate from './ExcelTemplate'; // Naya Excel Template

export default function AIExcelGenerator() {
  const [userInput, setUserInput] = useState("A salary sheet for 5 employees with columns: Employee Name, Basic, Allowances, Deductions, Net Salary");
  const [language, setLanguage] = useState('English');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef(null);

  const generatePrompt = (input: string, lang: string) => {
    return `Create a data table in ${lang} based on this request: "${input}". The output MUST be a valid Markdown table format. Do not add any text before or after the table.`;
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
    } catch(e) { alert("Could not parse table data for Excel export."); }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-excel-2-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI Excel Sheet Generator</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">1. Describe Data</h3>
              <textarea value={userInput} onChange={(e) => setUserInput(e.target.value)} rows={15} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <h3 className="text-lg font-semibold text-white">2. Select Language</h3>
              <input value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              <button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105">
                {isGenerating ? 'Generating...' : `3. Generate Sheet`}
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Preview</h3>
              <div className="w-full overflow-auto h-[60vh] bg-slate-900 rounded-lg p-2">
                {generatedContent && <ExcelTemplate ref={previewRef} markdownContent={generatedContent} />}
              </div>
              <div className="flex justify-center">
                 <button onClick={downloadExcel} disabled={!generatedContent || isGenerating} className="bg-emerald-600/80 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"><i className="ri-file-excel-2-line mr-2"></i>Download Excel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
