// app/tools/JSONFormatter.tsx

'use client';

import { useState, useMemo } from 'react';

export default function JSONFormatter() {
  const [inputJson, setInputJson] = useState('');
  const [error, setError] = useState('');

  const formattedJson = useMemo(() => {
    if (!inputJson.trim()) {
      setError('');
      return '';
    }
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2); // 2 spaces for indentation
      setError('');
      return formatted;
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
      return '';
    }
  }, [inputJson]);

  const handleCopy = () => {
    if (formattedJson) {
      navigator.clipboard.writeText(formattedJson);
    }
  };
  
  const handleClear = () => {
    setInputJson('');
    setError('');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputJson(text);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-code-s-slash-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">JSON Formatter & Validator</h2>
            <p className="text-white/70">Format, beautify, and validate your JSON data instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Area */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Input JSON</h3>
              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="Paste your minified or unformatted JSON here..."
                className="w-full h-80 p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
              />
            </div>

            {/* Output Area */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Formatted JSON</h3>
              <pre className="w-full h-80 p-4 bg-black/30 border border-white/10 rounded-xl text-white overflow-auto font-mono text-sm whitespace-pre-wrap">
                {error ? <span className="text-red-400">{error}</span> : formattedJson || <span className="text-white/50">Formatted output will appear here...</span>}
              </pre>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mt-6">
              <button onClick={handlePaste} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                <i className="ri-clipboard-line mr-2"></i>Paste
              </button>
              <button onClick={handleCopy} disabled={!formattedJson || !!error} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                <i className="ri-file-copy-line mr-2"></i>Copy
              </button>
              <button onClick={handleClear} disabled={!inputJson} className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                <i className="ri-delete-bin-line mr-2"></i>Clear
              </button>
          </div>
        </div>
      </div>
    </div>
  );
        }
