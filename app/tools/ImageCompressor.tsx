
'use client';

import { useState, useRef } from 'react';

export default function ImageCompressor() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
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
      setOriginalImage({
        file,
        dataUrl: e.target.result,
        size: file.size
      });
      setCompressedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!originalImage) return;

    setIsCompressing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCompressedImage({
            dataUrl: e.target.result,
            size: blob.size,
            blob
          });
          setIsCompressing(false);
        };
        reader.readAsDataURL(blob);
      }, 'image/jpeg', quality);
    };

    img.src = originalImage.dataUrl;
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.download = `compressed_${originalImage.file.name}`;
    link.href = compressedImage.dataUrl;
    link.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressionRatio = originalImage && compressedImage
    ? ((originalImage.size - compressedImage.size) / originalImage.size * 100).toFixed(1)
    : 0;

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-image-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Image Compressor</h2>
            <p className="text-white/70">Reduce image file sizes while maintaining quality</p>
          </div>

          {!originalImage ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-purple-400 bg-purple-400/10'
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
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 cursor-pointer"
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
                    <p>Size: {formatFileSize(originalImage.size)}</p>
                    <p>File: {originalImage.file.name}</p>
                  </div>
                </div>

                {compressedImage && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Compressed Image</h3>
                    <img
                      src={compressedImage.dataUrl}
                      alt="Compressed"
                      className="w-full h-64 object-contain rounded-lg mb-4"
                    />
                    <div className="text-white/70 text-sm space-y-1">
                      <p>Size: {formatFileSize(compressedImage.size)}</p>
                      <p className="text-green-400">Reduced by: {compressionRatio}%</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <label className="block text-white font-medium mb-3">
                  Compression Quality: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-white/50 text-sm mt-2">
                  <span>Lower Quality (Smaller Size)</span>
                  <span>Higher Quality (Larger Size)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={compressImage}
                  disabled={isCompressing}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
                >
                  {isCompressing ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Compressing...
                    </div>
                  ) : (
                    'Compress Image'
                  )}
                </button>

                {compressedImage && (
                  <button
                    onClick={downloadCompressed}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Download
                  </button>
                )}

                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setCompressedImage(null);
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
