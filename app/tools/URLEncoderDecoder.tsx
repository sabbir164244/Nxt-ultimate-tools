// app/tools/URLEncoderDecoder.tsx

'use client';

import { useState } from 'react';

export default function URLEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setOutput('Error encoding text.');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('Error: Invalid URI to decode.');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    setInput(text);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-link text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">URL Encoder / Decoder</h2>
            <p className="text-white/70">Encode or decode your text and URLs safely.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-white font-medium">Input Text / URL</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste your text or URL here..."
                    rows={6}
                    className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none font-mono text-sm"
                />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
                <button onClick={handleEncode} disabled={!input} className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 disabled:opacity-50">Encode</button>
                <button onClick={handleDecode} disabled={!input} className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 disabled:opacity-50">Decode</button>
                <button onClick={handlePaste} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">Paste</button>
            </div>

            <div className="space-y-2">
                <label className="block text-white font-medium">Output</label>
                <div className="relative">
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Output will appear here..."
                        rows={6}
                        className="w-full p-4 pr-12 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/50 resize-none font-mono text-sm"
                    />
                    <button onClick={handleCopy} disabled={!output} className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center disabled:opacity-50">
                        <i className="ri-file-copy-line text-white"></i>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                      }
