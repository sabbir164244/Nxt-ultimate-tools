// app/tools/GradientGenerator.tsx

'use client';

import { useState } from 'react';

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#8A2BE2');
  const [color2, setColor2] = useState('#4169E1');
  const [angle, setAngle] = useState(90);

  const gradientCss = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  
  const handleCopyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
  };
  
  const randomizeColors = () => {
    const randomColor1 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    const randomColor2 = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomColor1);
    setColor2(randomColor2);
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-gradienter-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">CSS Gradient Generator</h2>
            <p className="text-white/70">Create beautiful gradients and get the CSS code instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="bg-white/5 rounded-xl p-6 space-y-6">
                <div>
                    <label className="block text-white font-medium mb-2">Color 1</label>
                    <div className="flex items-center gap-4">
                        <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer"/>
                        <input type="text" value={color1.toUpperCase()} onChange={(e) => setColor1(e.target.value)} className="w-full p-2 bg-black/30 rounded-lg text-white font-mono text-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-white font-medium mb-2">Color 2</label>
                    <div className="flex items-center gap-4">
                        <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer"/>
                        <input type="text" value={color2.toUpperCase()} onChange={(e) => setColor2(e.target.value)} className="w-full p-2 bg-black/30 rounded-lg text-white font-mono text-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-white font-medium mb-2">Angle: {angle}°</label>
                    <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"/>
                </div>
                 <button onClick={randomizeColors} className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                    <i className="ri-shuffle-line mr-2"></i>Randomize
                </button>
            </div>

            {/* Preview & Code */}
            <div className="space-y-4">
                <div
                    className="w-full h-56 rounded-xl border-2 border-white/20"
                    style={{ background: gradientCss }}
                />
                <div className="relative">
                    <textarea
                        value={`background: ${gradientCss};`}
                        readOnly
                        rows={3}
                        className="w-full p-4 pr-12 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/50 resize-none font-mono text-xs"
                    />
                    <button onClick={handleCopyCss} className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center">
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
