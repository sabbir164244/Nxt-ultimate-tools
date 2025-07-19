// app/tools/MemeGenerator.tsx

'use client';

import { useState, useRef, useEffect } from 'react';

export default function MemeGenerator() {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => setImage(img);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions to match image
      const aspectRatio = image.width / image.height;
      const maxWidth = 500;
      canvas.width = maxWidth;
      canvas.height = maxWidth / aspectRatio;

      // Draw image
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      // Style text
      const fontSize = canvas.width / 10;
      ctx.font = `bold ${fontSize}px Impact`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = fontSize / 20;
      ctx.textAlign = 'center';

      // Draw top text
      ctx.textBaseline = 'top';
      ctx.strokeText(topText.toUpperCase(), canvas.width / 2, 10);
      ctx.fillText(topText.toUpperCase(), canvas.width / 2, 10);
      
      // Draw bottom text
      ctx.textBaseline = 'bottom';
      ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
      ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
    }
  }, [image, topText, bottomText]);

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-emotion-laugh-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Meme Generator</h2>
            <p className="text-white/70">Create and share your own viral memes in seconds.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" value={topText} onChange={(e) => setTopText(e.target.value)} placeholder="Top Text" className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                <input type="text" value={bottomText} onChange={(e) => setBottomText(e.target.value)} placeholder="Bottom Text" className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>

            <div>
                <label className="block text-white font-medium mb-2">Upload Meme Template</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
            </div>

            <div className="bg-black rounded-lg p-2">
                <canvas ref={canvasRef} className="w-full h-auto" />
            </div>

            <div className="text-center">
                <button onClick={downloadMeme} disabled={!image} className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 disabled:opacity-50 text-lg">
                    <i className="ri-download-2-line mr-2"></i>Download Meme
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
                     }
