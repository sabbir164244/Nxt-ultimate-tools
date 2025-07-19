'use client';

import { useState } from 'react';
import Link from 'next/link';
// ... (all previous imports)
import PDFGenerator from './PDFGenerator';
import WordToPDF from './WordToPDF';
import TextToVoice from './TextToVoice';
import ImageCompressor from './ImageCompressor';
import ImageResizer from './ImageResizer';
import ImageCropper from './ImageCropper';
import PDFSplitter from './PDFSplitter';
import PDFMerger from './PDFMerger';
import ImageFraming from './ImageFraming';
import Calculator from './Calculator';
import PasswordGenerator from './PasswordGenerator';
import BMICalculator from './BMICalculator';
import Notepad from './Notepad';
import ColorPicker from './ColorPicker';
import Puzzle from './Puzzle';
import CaseConverter from './CaseConverter';
import QRCodeGenerator from './QRCodeGenerator';
import JSONFormatter from './JSONFormatter';
import AgeCalculator from './AgeCalculator';
import UnitConverter from './UnitConverter';
import LoanCalculator from './LoanCalculator';
import URLEncoderDecoder from './URLEncoderDecoder';
import ImageToBase64 from './ImageToBase64';
import MarkdownPreviewer from './MarkdownPreviewer';
import SignaturePad from './SignaturePad';
import MemeGenerator from './MemeGenerator'; // <-- NYA IMPORT

const allTools = [
  { id: 'age-calculator', name: 'Age Calculator', icon: 'ri-calendar-2-line', category: 'Utility', component: AgeCalculator },
  { id: 'bmi-calculator', name: 'BMI Calculator', icon: 'ri-heart-pulse-line', category: 'Health', component: BMICalculator },
  { id: 'calculator', name: 'Dynamic Calculator', icon: 'ri-calculator-line', category: 'Utility', component: Calculator },
  { id: 'case-converter', name: 'Case Converter', icon: 'ri-font-case', category: 'Text', component: CaseConverter },
  { id: 'color-picker', name: 'Color Picker', icon: 'ri-palette-line', category: 'Design', component: ColorPicker },
  { id: 'image-compressor', name: 'Image Compressor', icon: 'ri-image-line', category: 'Image', component: ImageCompressor },
  { id: 'image-cropper', name: 'Image Cropper', icon: 'ri-crop-line', category: 'Image', component: ImageCropper },
  { id: 'image-framing', name: 'Image Framing', icon: 'ri-image-2-line', category: 'Image', component: ImageFraming },
  { id: 'image-resizer', name: 'Image Resizer', icon: 'ri-scissors-line', category: 'Image', component: ImageResizer },
  { id: 'image-to-base64', name: 'Image to Base64', icon: 'ri-image-edit-line', category: 'Developer', component: ImageToBase64 },
  { id: 'json-formatter', name: 'JSON Formatter', icon: 'ri-code-s-slash-line', category: 'Developer', component: JSONFormatter },
  { id: 'loan-calculator', name: 'Loan/EMI Calculator', icon: 'ri-bank-card-line', category: 'Finance', component: LoanCalculator },
  { id: 'markdown-previewer', name: 'Markdown Previewer', icon: 'ri-markdown-line', category: 'Developer', component: MarkdownPreviewer },
  { id: 'meme-generator', name: 'Meme Generator', icon: 'ri-emotion-laugh-line', category: 'Fun', component: MemeGenerator }, // <-- NYA TOOL ADD HUA
  { id: 'notepad', name: 'Notepad', icon: 'ri-file-text-line', category: 'Utility', component: Notepad },
  { id: 'password-generator', name: 'Password Generator', icon: 'ri-lock-password-line', category: 'Security', component: PasswordGenerator },
  { id: 'pdf-generator', name: 'PDF Generator', icon: 'ri-file-pdf-line', category: 'PDF', component: PDFGenerator },
  { id: 'pdf-merger', name: 'PDF Merger', icon: 'ri-file-copy-line', category: 'PDF', component: PDFMerger },
  { id: 'pdf-splitter', name: 'PDF Splitter', icon: 'ri-file-reduce-line', category: 'PDF', component: PDFSplitter },
  { id: 'puzzle', name: 'Puzzle Game', icon: 'ri-puzzle-line', category: 'Game', component: Puzzle },
  { id: 'qr-code-generator', name: 'QR Code Generator', icon: 'ri-qr-code-line', category: 'Developer', component: QRCodeGenerator },
  { id: 'signature-pad', name: 'Signature Pad', icon: 'ri-pencil-ruler-2-line', category: 'Utility', component: SignaturePad },
  { id: 'text-to-voice', name: 'Text to Voice', icon: 'ri-mic-line', category: 'Audio', component: TextToVoice },
  { id: 'unit-converter', name: 'Unit Converter', icon: 'ri-ruler-2-line', category: 'Utility', component: UnitConverter },
  { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', icon: 'ri-link', category: 'Developer', component: URLEncoderDecoder },
  { id: 'word-to-pdf', name: 'Word to PDF', icon: 'ri-file-word-line', category: 'PDF', component: WordToPDF },
];

const categories = ['All', 'PDF', 'Image', 'Text', 'Audio', 'Developer', 'Finance', 'Utility', 'Security', 'Health', 'Design', 'Game', 'Fun']; // <-- NYI CATEGORY ADD HUI

export default function ToolsPage() {
  // ... (rest of the code is the same)
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = allTools.sort((a,b) => a.name.localeCompare(b.name)).filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedTool) {
    const ToolComponent = selectedTool.component;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <header className="p-6 bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedTool(null)}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-line text-white text-lg"></i>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className={`${selectedTool.icon} text-white text-sm`}></i>
                </div>
                <h1 className="text-xl font-bold text-white">{selectedTool.name}</h1>
              </div>
            </div>
            <Link href="/" className="text-white/80 hover:text-white transition-colors cursor-pointer">
              Home
            </Link>
          </div>
        </header>
        <ToolComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="p-6 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="ri-tools-line text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-white font-pacifico">All Tools</h1>
          </div>
          <Link href="/" className="text-white/80 hover:text-white transition-colors cursor-pointer">
            Home
          </Link>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 text-lg"></i>
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${tool.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs text-white/80 mb-3">
                  {tool.category}
                </span>
                <p className="text-blue-400 text-sm font-medium">Click to use →</p>
              </div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-white/30 text-6xl mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
              <p className="text-white/70">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
