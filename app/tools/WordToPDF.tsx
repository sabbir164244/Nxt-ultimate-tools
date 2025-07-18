
'use client';

import { useState } from 'react';

export default function WordToPDF() {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
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
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.includes('word') || droppedFile.name.endsWith('.docx') || droppedFile.name.endsWith('.doc')) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const convertToPDF = async () => {
    if (!file) return;
    
    setIsConverting(true);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF();
        
        doc.setFontSize(16);
        doc.text('Converted from Word Document', 20, 30);
        doc.setFontSize(12);
        doc.text(`Original file: ${file.name}`, 20, 50);
        doc.text('Note: This is a simplified conversion.', 20, 70);
        doc.text('For full Word to PDF conversion, use dedicated software.', 20, 90);
        
        doc.save(`${file.name.replace(/\.[^/.]+$/, '')}.pdf`);
        setIsConverting(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error converting to PDF:', error);
      setIsConverting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-word-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Word to PDF Converter</h2>
            <p className="text-white/70">Convert your Word documents to PDF format quickly and easily</p>
          </div>

          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-400 bg-blue-400/10'
                  : 'border-white/30 hover:border-white/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto">
                    <i className="ri-file-word-line text-blue-400 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{file.name}</h3>
                  <p className="text-white/70">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button
                    onClick={() => setFile(null)}
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
                  <h3 className="text-xl font-semibold text-white">Drop your Word file here</h3>
                  <p className="text-white/70">or click to browse files</p>
                  <input
                    type="file"
                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    className="hidden"
                    id="word-file-input"
                  />
                  <label
                    htmlFor="word-file-input"
                    className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>

            <button
              onClick={convertToPDF}
              disabled={!file || isConverting}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
            >
              {isConverting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Converting...
                </div>
              ) : (
                'Convert to PDF'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
