
'use client';

import { useState, useRef } from 'react';

export default function ImageFraming() {
  const [originalImage, setOriginalImage] = useState(null);
  const [framedImage, setFramedImage] = useState(null);
  const [frameStyle, setFrameStyle] = useState('classic');
  const [frameColor, setFrameColor] = useState('#8B4513');
  const [frameWidth, setFrameWidth] = useState(20);
  const [isFraming, setIsFraming] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const canvasRef = useRef(null);

  const frameStyles = [
    { id: 'classic', name: 'Classic', preview: '▢' },
    { id: 'modern', name: 'Modern', preview: '◻' },
    { id: 'vintage', name: 'Vintage', preview: '◈' },
    { id: 'elegant', name: 'Elegant', preview: '◇' },
    { id: 'rustic', name: 'Rustic', preview: '▣' },
    { id: 'minimal', name: 'Minimal', preview: '□' }
  ];

  const predefinedColors = [
    '#8B4513', '#000000', '#FFFFFF', '#D4AF37', '#C0C0C0', '#654321',
    '#2F4F4F', '#800000', '#000080', '#006400', '#8B008B', '#FF4500'
  ];

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage({
        file,
        dataUrl: e.target.result
      });
      setFramedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const applyFrame = () => {
    if (!originalImage) return;

    setIsFraming(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const padding = frameWidth;
      canvas.width = img.width + (padding * 2);
      canvas.height = img.height + (padding * 2);

      // Draw frame background
      ctx.fillStyle = frameColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply frame style effects
      if (frameStyle === 'vintage') {
        // Add vintage texture
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        for (let i = 0; i < 100; i++) {
          ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
        }
      } else if (frameStyle === 'elegant') {
        // Add elegant gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, frameColor);
        gradient.addColorStop(0.5, '#ffffff20');
        gradient.addColorStop(1, frameColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (frameStyle === 'rustic') {
        // Add rustic texture
        ctx.fillStyle = 'rgba(139, 69, 19, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(160, 82, 45, 0.5)';
        for (let i = 0; i < 50; i++) {
          ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 3, 1);
        }
      }

      // Draw inner border for some styles
      if (frameStyle === 'classic' || frameStyle === 'elegant') {
        ctx.strokeStyle = frameColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.strokeRect(padding - 5, padding - 5, img.width + 10, img.height + 10);
      }

      // Draw the image
      ctx.drawImage(img, padding, padding);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFramedImage({
            dataUrl: e.target.result,
            blob
          });
          setIsFraming(false);
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
    };

    img.src = originalImage.dataUrl;
  };

  const downloadFramed = () => {
    if (!framedImage) return;

    const link = document.createElement('a');
    link.download = `framed_${originalImage.file.name}`;
    link.href = framedImage.dataUrl;
    link.click();
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-image-2-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Image Framing</h2>
            <p className="text-white/70">Add beautiful frames to your images with various styles and colors</p>
          </div>

          {!originalImage ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-pink-400 bg-pink-400/10'
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
              <h3 className="text-xl font-semibold text-white mb-2">Drop your image here</h3>
              <p className="text-white/70 mb-4">or click to browse files</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-block bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-700 transition-all duration-300 cursor-pointer"
              >
                Choose Image
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Original Image</h3>
                  <img
                    src={originalImage.dataUrl}
                    alt="Original"
                    className="w-full h-64 object-contain rounded-lg"
                  />
                </div>

                {framedImage && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Framed Image</h3>
                    <img
                      src={framedImage.dataUrl}
                      alt="Framed"
                      className="w-full h-64 object-contain rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Frame Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-3">Frame Style</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {frameStyles.map(style => (
                        <button
                          key={style.id}
                          onClick={() => setFrameStyle(style.id)}
                          className={`p-3 rounded-lg text-center transition-all duration-300 cursor-pointer ${
                            frameStyle === style.id
                              ? 'bg-pink-500 text-white'
                              : 'bg-white/10 text-white/80 hover:bg-white/20'
                          }`}
                        >
                          <div className="text-2xl mb-1">{style.preview}</div>
                          <div className="text-xs">{style.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">Frame Color</label>
                    <div className="flex flex-wrap gap-3 mb-3">
                      {predefinedColors.map(color => (
                        <button
                          key={color}
                          onClick={() => setFrameColor(color)}
                          className={`w-10 h-10 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                            frameColor === color ? 'border-white scale-110' : 'border-white/30 hover:border-white/60'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <input
                      type="color"
                      value={frameColor}
                      onChange={(e) => setFrameColor(e.target.value)}
                      className="w-20 h-10 rounded-lg border border-white/20 bg-transparent cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">
                      Frame Width: {frameWidth}px
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={frameWidth}
                      onChange={(e) => setFrameWidth(Number(e.target.value))}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={applyFrame}
                  disabled={isFraming}
                  className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
                >
                  {isFraming ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Applying Frame...
                    </div>
                  ) : (
                    'Apply Frame'
                  )}
                </button>

                {framedImage && (
                  <button
                    onClick={downloadFramed}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Download
                  </button>
                )}

                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setFramedImage(null);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}
