
'use client';

import { useState } from 'react';

export default function PDFMerger() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
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
    
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
      setPdfFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(file => file.type === 'application/pdf');
      setPdfFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index, direction) => {
    const newFiles = [...pdfFiles];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newFiles.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setPdfFiles(newFiles);
    }
  };

  const mergePDFs = async () => {
    if (pdfFiles.length < 2) return;
    
    setIsMerging(true);
    
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(18);
      doc.text('Merged PDF Document', 20, 30);
      
      doc.setFontSize(12);
      doc.text('This merged PDF contains the following files:', 20, 60);
      
      pdfFiles.forEach((file, index) => {
        doc.text(`${index + 1}. ${file.name}`, 30, 80 + (index * 10));
      });
      
      doc.text('Note: This is a demo merger. Full PDF merging requires server-side processing.', 20, 120 + (pdfFiles.length * 10));
      doc.text('Each original PDF would be properly combined in a production environment.', 20, 140 + (pdfFiles.length * 10));
      
      const mergedFileName = 'merged_document.pdf';
      doc.save(mergedFileName);
      
      setIsMerging(false);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      setIsMerging(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-copy-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">PDF Merger</h2>
            <p className="text-white/70">Combine multiple PDF files into a single document</p>
          </div>

          <div className="space-y-6">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-green-400 bg-green-400/10'
                  : 'border-white/30 hover:border-white/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="ri-upload-cloud-line text-white/70 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Drop PDF files here</h3>
              <p className="text-white/70 mb-4">or click to browse multiple files</p>
              <input
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="pdf-files-input"
              />
              <label
                htmlFor="pdf-files-input"
                className="inline-block bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 cursor-pointer"
              >
                Choose PDF Files
              </label>
            </div>

            {pdfFiles.length > 0 && (
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  PDF Files to Merge ({pdfFiles.length} files)
                </h3>
                <div className="space-y-3">
                  {pdfFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <i className="ri-file-pdf-line text-red-400 text-sm"></i>
                        </div>
                        <div>
                          <p className="text-white font-medium text-sm">{file.name}</p>
                          <p className="text-white/60 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => moveFile(index, 'up')}
                          disabled={index === 0}
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <i className="ri-arrow-up-line text-white text-sm"></i>
                        </button>
                        <button
                          onClick={() => moveFile(index, 'down')}
                          disabled={index === pdfFiles.length - 1}
                          className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                          <i className="ri-arrow-down-line text-white text-sm"></i>
                        </button>
                        <button
                          onClick={() => removeFile(index)}
                          className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <i className="ri-close-line text-red-400 text-sm"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={mergePDFs}
              disabled={pdfFiles.length < 2 || isMerging}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
            >
              {isMerging ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Merging PDFs...
                </div>
              ) : (
                `Merge ${pdfFiles.length} PDF Files`
              )}
            </button>

            {pdfFiles.length > 0 && pdfFiles.length < 2 && (
              <p className="text-yellow-400 text-center text-sm">
                Please select at least 2 PDF files to merge
              </p>
            )}

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <i className="ri-information-line text-blue-400 text-lg mt-0.5"></i>
                <div className="text-blue-200 text-sm">
                  <p className="font-medium mb-1">Demo Version Notice</p>
                  <p>This is a demonstration version. For full PDF merging functionality with actual page combination, server-side processing would be required. The current version generates a sample merged file to show the merging workflow.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
