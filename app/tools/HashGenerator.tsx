// app/tools/HashGenerator.tsx

'use client';

import { useState, useMemo } from 'react';
import CryptoJS from 'crypto-js';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  
  const md5Hash = useMemo(() => input ? CryptoJS.MD5(input).toString() : '', [input]);
  const sha256Hash = useMemo(() => input ? CryptoJS.SHA256(input).toString() : '', [input]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-slate-500 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-fingerprint-2-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Hash Generator</h2>
            <p className="text-white/70">Generate MD5 and SHA-256 hashes from your text.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type or paste any text here..."
                rows={5}
                className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none font-mono text-sm"
              />
            </div>

            <div className="space-y-4">
                {/* MD5 */}
                <div>
                    <label className="block text-white font-medium mb-2">MD5 Hash</label>
                    <div className="relative">
                        <input type="text" value={md5Hash} readOnly className="w-full p-3 pr-12 bg-black/30 border border-white/10 rounded-lg text-white font-mono text-sm" />
                        <button onClick={() => handleCopy(md5Hash)} disabled={!md5Hash} className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <i className="ri-file-copy-line text-white"></i>
                        </button>
                    </div>
                </div>
                {/* SHA-256 */}
                <div>
                    <label className="block text-white font-medium mb-2">SHA-256 Hash</label>
                    <div className="relative">
                        <input type="text" value={sha256Hash} readOnly className="w-full p-3 pr-12 bg-black/30 border border-white/10 rounded-lg text-white font-mono text-sm" />
                        <button onClick={() => handleCopy(sha256Hash)} disabled={!sha256Hash} className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center disabled:opacity-50">
                            <i className="ri-file-copy-line text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                          }
