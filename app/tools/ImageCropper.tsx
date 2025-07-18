
'use client';

import { useState, useRef } from 'react';

export default function ImageCropper() {
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragActive, setDragActive] = useState(false);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

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
        setCropArea({ x: 50, y: 50, width: Math.min(200, img.width - 100), height: Math.min(200, img.height - 100) });
        setCroppedImage(null);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDragging(true);
    setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragStart.x;
    const y = e.clientY - rect.top - dragStart.y;
    
    const maxX = rect.width - cropArea.width;
    const maxY = rect.height - cropArea.height;
    
    setCropArea(prev => ({
      ...prev,
      x: Math.max(0, Math.min(maxX, x)),
      y: Math.max(0, Math.min(maxY, y))
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const cropImage = () => {
    if (!originalImage || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const rect = imageRef.current.getBoundingClientRect();
      const scaleX = originalImage.width / rect.width;
      const scaleY = originalImage.height / rect.height;
      
      const sourceX = cropArea.x * scaleX;
      const sourceY = cropArea.y * scaleY;
      const sourceWidth = cropArea.width * scaleX;
      const sourceHeight = cropArea.height * scaleY;
      
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;
      
      ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);
      
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCroppedImage({
            dataUrl: e.target.result,
            blob
          });
        };
        reader.readAsDataURL(blob);
      }, 'image/png');
    };
    
    img.src = originalImage.dataUrl;
  };

  const downloadCropped = () => {
    if (!croppedImage) return;

    const link = document.createElement('a');
    link.download = `cropped_${originalImage.file.name}`;
    link.href = croppedImage.dataUrl;
    link.click();
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-crop-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Image Cropper</h2>
            <p className="text-white/70">Crop your images to the perfect size and composition</p>
          </div>

          {!originalImage ? (
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-orange-400 bg-orange-400/10'
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
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 cursor-pointer"
              >
                Choose Image
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Original Image - Drag to Crop</h3>
                  <div className="relative inline-block">
                    <img
                      ref={imageRef}
                      src={originalImage.dataUrl}
                      alt="Original"
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px' }}
                    />
                    <div
                      className="absolute border-2 border-orange-400 bg-orange-400/20 cursor-move"
                      style={{
                        left: cropArea.x,
                        top: cropArea.y,
                        width: cropArea.width,
                        height: cropArea.height
                      }}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i className="ri-drag-move-line text-orange-400 text-xl"></i>
                      </div>
                    </div>
                  </div>
                </div>

                {croppedImage && (
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Cropped Image</h3>
                    <img
                      src={croppedImage.dataUrl}
                      alt="Cropped"
                      className="max-w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                )}
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Crop Settings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">X Position</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.x)}
                      onChange={(e) => setCropArea(prev => ({ ...prev, x: Number(e.target.value) }))}
                      min="0"
                      className="w-full p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Y Position</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.y)}
                      onChange={(e) => setCropArea(prev => ({ ...prev, y: Number(e.target.value) }))}
                      min="0"
                      className="w-full p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Width</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.width)}
                      onChange={(e) => setCropArea(prev => ({ ...prev, width: Number(e.target.value) }))}
                      min="10"
                      className="w-full p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm">Height</label>
                    <input
                      type="number"
                      value={Math.round(cropArea.height)}
                      onChange={(e) => setCropArea(prev => ({ ...prev, height: Number(e.target.value) }))}
                      min="10"
                      className="w-full p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={cropImage}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  Crop Image
                </button>

                {croppedImage && (
                  <button
                    onClick={downloadCropped}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Download
                  </button>
                )}

                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setCroppedImage(null);
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
