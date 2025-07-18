
'use client';

import { useState } from 'react';

export default function PDFGenerator() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!content.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(20);
      doc.text(title || 'Generated Document', 20, 30);
      
      doc.setFontSize(12);
      const lines = doc.splitTextToSize(content, 170);
      doc.text(lines, 20, 50);
      
      doc.save(`${title || 'document'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-pdf-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">PDF Generator</h2>
            <p className="text-white/70">Create professional PDF documents from your text content</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-3">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-3">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your content here..."
                rows={12}
                maxLength={500}
                className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none text-sm"
              />
              <div className="text-right mt-2 text-white/50 text-sm">
                {content.length}/500 characters
              </div>
            </div>

            <button
              onClick={generatePDF}
              disabled={!content.trim() || isGenerating}
              className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Generating PDF...
                </div>
              ) : (
                'Generate PDF'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
