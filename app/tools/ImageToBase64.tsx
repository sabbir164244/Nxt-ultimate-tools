// app/tools/ImageToBase64.tsx

'use client';

import { useState } from 'react';

export default function ImageToBase64() {
  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImage(result);
        setBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
  };

  const handleReset = () => {
    setImage(null);
    setBase64('');
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-image-edit-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Image to Base64 Converter</h2>
            <p className="text-white/70">Convert images into Base64 strings for web development.</p>
          </div>

          {!image ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${dragActive ? 'border-purple-400 bg-purple-400/10' : 'border-white/30 hover:border-white/50'}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            >
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4"><i className="ri-upload-cloud-line text-white/70 text-2xl"></i></div>
              <h3 className="text-xl font-semibold text-white mb-2">Drop your image here</h3>
              <p className="text-white/70 mb-4">or click to browse</p>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-colors cursor-pointer">Choose Image</label>
            </div>
          ) : (
            <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-4 flex justify-center">
                    <img src={image} alt="Preview" className="max-h-48 rounded-lg" />
                </div>
                <div>
                    <label className="block text-white font-medium mb-2">Base64 Output</label>
                    <textarea
                        value={base64}
                        readOnly
                        rows={8}
                        className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/40 resize-none font-mono text-xs"
                    />
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    <button onClick={handleCopy} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105">Copy Base64</button>
                    <button onClick={handleReset} className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transform hover:scale-105">Reset</button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
              }
