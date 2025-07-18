
'use client';

import { useState } from 'react';

export default function PDFSplitter() {
  const [pdfFile, setPdfFile] = useState(null);
  const [splitType, setSplitType] = useState('pages');
  const [pageRange, setPageRange] = useState('1-5');
  const [isSplitting, setIsSplitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const splitPDF = async () => {
    if (!pdfFile) return;
    
    setIsSplitting(true);
    
    try {
      const { jsPDF } = await import('jspdf');
      
      if (splitType === 'pages') {
        const ranges = pageRange.split(',').map(range => range.trim());
        
        ranges.forEach((range, index) => {
          const doc = new jsPDF();
          doc.setFontSize(16);
          doc.text('PDF Split Result', 20, 30);
          doc.setFontSize(12);
          doc.text(`Original PDF: ${pdfFile.name}`, 20, 50);
          doc.text(`Page Range: ${range}`, 20, 70);
          doc.text('Note: This is a demo split. Full PDF splitting requires server-side processing.', 20, 90);
          
          doc.save(`${pdfFile.name.replace('.pdf', '')}_pages_${range.replace('-', '_to_')}.pdf`);
        });
      } else {
        const numParts = parseInt(pageRange) || 2;
        
        for (let i = 1; i <= numParts; i++) {
          const doc = new jsPDF();
          doc.setFontSize(16);
          doc.text('PDF Split Result', 20, 30);
          doc.setFontSize(12);
          doc.text(`Original PDF: ${pdfFile.name}`, 20, 50);
          doc.text(`Part ${i} of ${numParts}`, 20, 70);
          doc.text('Note: This is a demo split. Full PDF splitting requires server-side processing.', 20, 90);
          
          doc.save(`${pdfFile.name.replace('.pdf', '')}_part_${i}.pdf`);
        }
      }
      
      setIsSplitting(false);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      setIsSplitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-reduce-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">PDF Splitter</h2>
            <p className="text-white/70">Split PDF files into multiple documents by pages or equal parts</p>
          </div>

          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-yellow-400 bg-yellow-400/10'
                  : 'border-white/30 hover:border-white/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {pdfFile ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <i className="ri-file-pdf-line text-red-400 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{pdfFile.name}</h3>
                  <p className="text-white/70">Size: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button
                    onClick={() => setPdfFile(null)}
                    className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto">
                    <i className="ri-upload-cloud-line text-white/70 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Drop your PDF file here</h3>
                  <p className="text-white/70">or click to browse files</p>
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="pdf-file-input"
                  />
                  <label
                    htmlFor="pdf-file-input"
                    className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Choose PDF File
                  </label>
                </div>
              )}
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Split Options</h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="splitType"
                      value="pages"
                      checked={splitType === 'pages'}
                      onChange={(e) => setSplitType(e.target.value)}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <span>Split by page ranges</span>
                  </label>
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="splitType"
                      value="equal"
                      checked={splitType === 'equal'}
                      onChange={(e) => setSplitType(e.target.value)}
                      className="w-4 h-4 text-yellow-500"
                    />
                    <span>Split into equal parts</span>
                  </label>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    {splitType === 'pages' ? 'Page Ranges (e.g., 1-5, 6-10, 11-15)' : 'Number of Parts'}
                  </label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder={splitType === 'pages' ? '1-5, 6-10, 11-15' : '3'}
                    className="w-full p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                  />
                  <p className="text-white/50 text-sm mt-2">
                    {splitType === 'pages' 
                      ? 'Separate multiple ranges with commas' 
                      : 'Enter the number of equal parts to split into'
                    }
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={splitPDF}
              disabled={!pdfFile || !pageRange || isSplitting}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
            >
              {isSplitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Splitting PDF...
                </div>
              ) : (
                'Split PDF'
              )}
            </button>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <i className="ri-information-line text-blue-400 text-lg mt-0.5"></i>
                <div className="text-blue-200 text-sm">
                  <p className="font-medium mb-1">Demo Version Notice</p>
                  <p>This is a demonstration version. For full PDF splitting functionality with actual page extraction, server-side processing would be required. The current version generates sample split files to show the splitting workflow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
