// app/tools/CaseConverter.tsx

'use client';

import { useState } from 'react';

export default function CaseConverter() {
  const [text, setText] = useState('');

  const toSentenceCase = () => {
    if (!text) return '';
    return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toTitleCase = () => {
    if (!text) return '';
    return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    // Add a small notification if you want
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-font-case text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Case Converter</h2>
            <p className="text-white/70">Convert your text into different case formats instantly.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-3">Your Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                rows={8}
                className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none text-sm"
              />
               <div className="text-right mt-2 text-white/50 text-sm">
                {text.length} Characters, {text.split(/\s+/).filter(Boolean).length} Words
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => setText(text.toUpperCase())} className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300">UPPER CASE</button>
                <button onClick={() => setText(text.toLowerCase())} className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300">lower case</button>
                <button onClick={() => setText(toSentenceCase())} className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300">Sentence case</button>
                <button onClick={() => setText(toTitleCase())} className="bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300">Title Case</button>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => handleCopy(text)}
                  disabled={!text}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <i className="ri-file-copy-line mr-2"></i>
                  Copy to Clipboard
                </button>
                <button
                  onClick={() => setText('')}
                  disabled={!text}
                  className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <i className="ri-delete-bin-line mr-2"></i>
                  Clear
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                }
