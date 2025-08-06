'use client';

import { useState } from 'react';
import Link from 'next/link';

// --- PURANE SABHI TOOLS YAHAN IMPORTED HAIN ---
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
import MemeGenerator from './MemeGenerator';
import GradientGenerator from './GradientGenerator';
import HashGenerator from './HashGenerator';
import DiscountCalculator from './DiscountCalculator';

// --- NAYE AI TOOLS KO IMPORT KAREIN ---
import AICVGenerator from './AICVGenerator';
import AIApplicationLetterGenerator from './AIApplicationLetterGenerator';
import AIFormalLetterGenerator from './AIFormalLetterGenerator';
import AIExcelGenerator from './AIExcelGenerator';
import AIFormGenerator from './AIFormGenerator';

// --- POORI, COMPLETE TOOLS KI LIST (34 TOOLS) ---
const allTools = [
  { id: 'age-calculator', name: 'Age Calculator', icon: 'ri-calendar-2-line', category: 'Utility', component: AgeCalculator },
  { id: 'bmi-calculator', name: 'BMI Calculator', icon: 'ri-heart-pulse-line', category: 'Health', component: BMICalculator },
  { id: 'calculator', name: 'Dynamic Calculator', icon: 'ri-calculator-line', category: 'Utility', component: Calculator },
  { id: 'case-converter', name: 'Case Converter', icon: 'ri-font-case', category: 'Text', component: CaseConverter },
  { id: 'color-picker', name: 'Color Picker', icon: 'ri-palette-line', category: 'Design', component: ColorPicker },
  { id: 'discount-calculator', name: 'Discount Calculator', icon: 'ri-price-tag-3-line', category: 'Finance', component: DiscountCalculator },
  { id: 'gradient-generator', name: 'Gradient Generator', icon: 'ri-gradienter-line', category: 'Design', component: GradientGenerator },
  { id: 'hash-generator', name: 'Hash Generator', icon: 'ri-fingerprint-2-line', category: 'Security', component: HashGenerator },
  { id: 'image-compressor', name: 'Image Compressor', icon: 'ri-image-line', category: 'Image', component: ImageCompressor },
  { id: 'image-cropper', name: 'Image Cropper', icon: 'ri-crop-line', category: 'Image', component: ImageCropper },
  { id: 'image-framing', name: 'Image Framing', icon: 'ri-image-2-line', category: 'Image', component: ImageFraming },
  { id: 'image-resizer', name: 'Image Resizer', icon: 'ri-scissors-line', category: 'Image', component: ImageResizer },
  { id: 'image-to-base64', name: 'Image to Base64', icon: 'ri-image-edit-line', category: 'Developer', component: ImageToBase64 },
  { id: 'json-formatter', name: 'JSON Formatter', icon: 'ri-code-s-slash-line', category: 'Developer', component: JSONFormatter },
  { id: 'loan-calculator', name: 'Loan/EMI Calculator', icon: 'ri-bank-card-line', category: 'Finance', component: LoanCalculator },
  { id: 'markdown-previewer', name: 'Markdown Previewer', icon: 'ri-markdown-line', category: 'Developer', component: MarkdownPreviewer },
  { id: 'meme-generator', name: 'Meme Generator', icon: 'ri-emotion-laugh-line', category: 'Fun', component: MemeGenerator },
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
  { id: 'ai-cv-generator', name: 'AI CV Generator', icon: 'ri-file-user-line', category: 'AI', component: AICVGenerator },
  { id: 'ai-application-letter-generator', name: 'AI Application Letter Generator', icon: 'ri-mail-send-line', category: 'AI', component: AIApplicationLetterGenerator },
  { id: 'ai-formal-letter-generator', name: 'AI Formal Letter Generator', icon: 'ri-draft-line', category: 'AI', component: AIFormalLetterGenerator },
  { id: 'ai-excel-generator', name: 'AI Excel Sheet Generator', icon: 'ri-file-excel-2-line', category: 'AI', component: AIExcelGenerator },
  { id: 'ai-form-generator', name: 'AI HTML Form Generator', icon: 'ri-input-method-line', category: 'AI', component: AIFormGenerator },
];

const categories = ['All', 'AI', 'PDF', 'Image', 'Text', 'Audio', 'Developer', 'Finance', 'Utility', 'Security', 'Health', 'Design', 'Game', 'Fun'];

export default function ToolsPage() {
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
      <div className="min-h-screen bg-[#120000]">
        <header className="p-6 bg-black/30 backdrop-blur-lg border-b border-[--border-color]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedTool(null)}
                className="w-10 h-10 bg-black/30 rounded-lg flex items-center justify-center hover:bg-black/50 transition-colors border border-[--border-color]"
              >
                <i className="ri-arrow-left-line text-white text-lg"></i>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF3A3A] to-[#FFD700] rounded-lg flex items-center justify-center shadow-md shadow-red-500/20">
                  <i className={`${selectedTool.icon} text-white text-sm`}></i>
                </div>
                <h1 className="text-xl font-bold text-white">{selectedTool.name}</h1>
              </div>
            </div>
            <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
          </div>
        </header>
        <ToolComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#120000] text-white">
      <header className="p-6 bg-black/30 backdrop-blur-lg border-b border-[--border-color]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF3A3A] to-[#FFD700] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
              <i className="ri-tools-line text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-white font-pacifico">All Tools</h1>
          </div>
          <Link href="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="relative mb-6">
              <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 text-lg"></i>
              <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[--card-bg] backdrop-blur-lg rounded-xl border border-[--border-color] text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#FF3A3A] to-[#a82727] text-white shadow-lg shadow-red-500/30'
                      : 'bg-[--card-bg] text-white/80 hover:bg-black/40 border border-transparent hover:border-[--border-color]'
                  }`}
                >
                  {category === 'AI' ? '✨ AI Tools' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={`bg-[--card-bg] backdrop-blur-lg rounded-xl p-6 border transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group relative overflow-hidden ${
                  tool.category === 'AI' 
                  ? 'border-yellow-400/50 hover:border-yellow-300 shadow-lg shadow-yellow-500/10' 
                  : 'border-[--border-color] hover:border-yellow-400/50'
                }`}
              >
                 {tool.category === 'AI' && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-r from-[#FFD700] to-yellow-600 text-black text-xs font-bold rounded-bl-lg shadow-md">
                    ✨ AI
                  </div>
                )}
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF3A3A] to-[#FFD700] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/20">
                  <i className={`${tool.icon} text-white text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                <span className="inline-block px-3 py-1 bg-black/30 border border-white/10 rounded-full text-xs text-white/80 mb-3">
                  {tool.category}
                </span>
                <p className="text-[#FFD700] text-sm font-medium">Click to use →</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
   }
