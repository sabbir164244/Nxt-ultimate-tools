
'use client';

import { useState, useRef } from 'react';

export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isResizing, setIsResizing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const canvasRef = useRef(null);

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
      const img = new Image();
      img.onload = () => {
        setOriginalImage({
          file,
          dataUrl: e.target.result,
          width: img.width,
          height: img.height
        });
        setWidth(img.width);
        setHeight(img.height);
        setResizedImage(null);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
    if (maintainAspectRatio && originalImage) {
      const aspectRatio = originalImage.width / originalImage.height;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
    if (maintainAspectRatio && originalImage) {
      const aspectRatio = originalImage.width / originalImage.height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };

  const resizeImage = () => {
    if (!originalImage) return;

    setIsResizing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setResizedImage({
            dataUrl: e.target.result,
            width,
            height,
            blob
          });
          setIsResizing(false);
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
    };

    img.src = originalImage.dataUrl;
  };

  const downloadResized = () => {
    if (!resizedImage) return;

    const link = document.createElement('a');
    link.download = `resized_${originalImage.file.name}`;
    link.href = resizedImage.dataUrl;
    link.click();
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-scissors-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Image Resizer</h2>
            <p className="text-white/70">Resize your images to any dimension while maintaining quality</p>
          </div>

          {!originalImage ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-400 bg-blue-400/10'
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
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 cursor-pointer"
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
                    className="w-full h-64 object-contain rounded-lg mb-4"
                  />
                  <div className="text-white/70 text-sm">
                    <p>Dimensions: {originalImage.width} × {originalImage.height}px</p>
                    <p>File: {originalImage.file.name}</p>
                  </div>
                </div>

                {resizedImage && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Resized Image</h3>
                    <img
                      src={resizedImage.dataUrl}
                      alt="Resized"
                      className="w-full h-64 object-contain rounded-lg mb-4"
                    />
                    <div className="text-white/70 text-sm">
                      <p>Dimensions: {resizedImage.width} × {resizedImage.height}px</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Resize Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Width (px)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      min="1"
                      max="5000"
                      className="w-full p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Height (px)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      min="1"
                      max="5000"
                      className="w-full p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                      className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span>Maintain aspect ratio</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={resizeImage}
                  disabled={isResizing}
                  className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
                >
                  {isResizing ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Resizing...
                    </div>
                  ) : (
                    'Resize Image'
                  )}
                </button>

                {resizedImage && (
                  <button
                    onClick={downloadResized}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Download
                  </button>
                )}

                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setResizedImage(null);
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
