// app/tools/QRCodeGenerator.tsx

'use client';

import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeGenerator() {
  const [value, setValue] = useState('');
  const qrCodeRef = useRef(null);

  const downloadQRCode = () => {
    if (!qrCodeRef.current) return;
    
    const svgElement = qrCodeRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'qrcode.png';
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-qr-code-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">QR Code Generator</h2>
            <p className="text-white/70">Create and download QR codes for any text or URL.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-3">Text or URL</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter text or a website link..."
                className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-lime-500 text-sm"
              />
            </div>

            {value && (
                <div className="bg-white p-6 rounded-xl mx-auto w-fit" ref={qrCodeRef}>
                    <QRCodeSVG 
                        value={value}
                        size={256}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                    />
                </div>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={downloadQRCode}
                  disabled={!value}
                  className="bg-gradient-to-r from-emerald-500 to-lime-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-lime-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <i className="ri-download-2-line mr-2"></i>
                  Download QR Code
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }
