// app/tools/BackgroundRemover.tsx - LITE MODE FIX

'use client';

import { useState } from 'react';

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Ready. Upload an image to start the magic.');
  const [progress, setProgress] = useState(0);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOriginalImage(URL.createObjectURL(file));
      setResultImage(null);
      setStatus('Initializing AI model...');
      setProgress(0);

      try {
        const { removeBackground } = await import('@imgly/background-removal');

        const resultBlob = await removeBackground(file, {
          mode: 'fast', // <-- YEH HAI LITE MODE
          onProgress: (p, t) => {
            const percentage = Math.round((p / t) * 100);
            setProgress(percentage);
            setStatus(`Processing... ${percentage}%`);
          }
        });
        setResultImage(URL.createObjectURL(resultBlob));
        setStatus('Background removed successfully!');
      } catch (error: any) {
        setStatus(`Error: ${error.message}. Please try again.`);
        console.error(error);
      }
    }
  };
  
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-magic-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI Background Remover</h2>
            <p className="text-white/70">Remove the background from any image with a single click. Pure magic!</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 text-center">
                <label htmlFor="image-upload" className="bg-gradient-to-r from-purple-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 cursor-pointer text-lg">
                   <i className="ri-upload-cloud-2-line mr-2"></i> Upload Image
                </label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <p className="text-white/70 text-sm mb-2">Status:</p>
                <p className="text-purple-400 font-medium">{status}</p>
                {progress > 0 && progress < 100 && (
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                       <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2 text-center">Original</h3>
                    {originalImage && <img src={originalImage} alt="Original" className="rounded-lg w-full" />}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2 text-center">Result (Background Removed)</h3>
                    {resultImage && (
                        <div>
                            <img src={resultImage} alt="Background removed" className="rounded-lg w-full" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Crect width=\'10\' height=\'10\' fill=\'%234a5568\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%234a5568\'/%3E%3Crect width=\'10\' height=\'10\' y=\'10\' fill=\'%232d3748\'/%3E%3Crect x=\'10\' width=\'10\' height=\'10\' fill=\'%232d3748\'/%3E%3C/svg%3E")' }} />
                            <a href={resultImage} download="background-removed.png" className="mt-4 block w-full text-center bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                               <i className="ri-download-2-line mr-2"></i> Download Result
                            </a>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
