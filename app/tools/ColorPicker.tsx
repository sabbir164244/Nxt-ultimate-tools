
'use client';

import { useState, useRef } from 'react';

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const [colorFormat, setColorFormat] = useState('hex');
  const [savedColors, setSavedColors] = useState([
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ]);
  const [colorHistory, setColorHistory] = useState([]);
  const canvasRef = useRef(null);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const getColorValue = () => {
    const rgb = hexToRgb(selectedColor);
    const hsl = hexToHsl(selectedColor);
    
    switch (colorFormat) {
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'rgba':
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
      case 'hsl':
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      case 'hsla':
        return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`;
      default:
        return selectedColor.toUpperCase();
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const addToSaved = () => {
    if (!savedColors.includes(selectedColor)) {
      setSavedColors(prev => [selectedColor, ...prev].slice(0, 24));
    }
  };

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setSelectedColor(randomColor);
    addToHistory(randomColor);
  };

  const addToHistory = (color) => {
    setColorHistory(prev => [color, ...prev.filter(c => c !== color)].slice(0, 10));
  };

  const generateColorPalette = () => {
    const baseHsl = hexToHsl(selectedColor);
    const palette = [];
    
    // Generate complementary colors
    for (let i = 0; i < 5; i++) {
      const hue = (baseHsl.h + (i * 72)) % 360;
      const color = hslToHex(hue, baseHsl.s, baseHsl.l);
      palette.push(color);
    }
    
    return palette;
  };

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;
    let r = 0, g = 0, b = 0;
    
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  const palette = generateColorPalette();

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-palette-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Color Picker</h2>
            <p className="text-white/70">Pick, generate, and manage colors with professional tools</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Color Picker */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 rounded-xl p-6">
                {/* Color Display */}
                <div className="mb-6">
                  <div 
                    className="w-full h-32 rounded-xl border-4 border-white/20 mb-4 shadow-lg"
                    style={{ backgroundColor: selectedColor }}
                  />
                  
                  <div className="flex items-center space-x-4">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => {
                        setSelectedColor(e.target.value);
                        addToHistory(e.target.value);
                      }}
                      className="w-16 h-16 rounded-lg border-2 border-white/20 cursor-pointer"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <select
                          value={colorFormat}
                          onChange={(e) => setColorFormat(e.target.value)}
                          className="bg-white/10 border border-white/20 rounded-lg text-white text-sm p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 pr-8"
                        >
                          <option value="hex" className="bg-slate-800">HEX</option>
                          <option value="rgb" className="bg-slate-800">RGB</option>
                          <option value="rgba" className="bg-slate-800">RGBA</option>
                          <option value="hsl" className="bg-slate-800">HSL</option>
                          <option value="hsla" className="bg-slate-800">HSLA</option>
                        </select>
                        
                        <input
                          type="text"
                          value={getColorValue()}
                          readOnly
                          className="flex-1 p-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none"
                        />
                        
                        <button
                          onClick={() => copyToClipboard(getColorValue())}
                          className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                          title="Copy color value"
                        >
                          <i className="ri-file-copy-line text-blue-400"></i>
                        </button>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={generateRandomColor}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-refresh-line mr-2"></i>Random
                        </button>
                        
                        <button
                          onClick={addToSaved}
                          className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-heart-line mr-2"></i>Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {(() => {
                    const rgb = hexToRgb(selectedColor);
                    const hsl = hexToHsl(selectedColor);
                    return (
                      <>
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <h4 className="text-white font-medium mb-2">RGB</h4>
                          <div className="text-white/70 text-sm space-y-1">
                            <div>R: {rgb.r}</div>
                            <div>G: {rgb.g}</div>
                            <div>B: {rgb.b}</div>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <h4 className="text-white font-medium mb-2">HSL</h4>
                          <div className="text-white/70 text-sm space-y-1">
                            <div>H: {hsl.h}°</div>
                            <div>S: {hsl.s}%</div>
                            <div>L: {hsl.l}%</div>
                          </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <h4 className="text-white font-medium mb-2">HEX</h4>
                          <div className="text-white/70 text-sm">
                            {selectedColor.toUpperCase()}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Generated Palette */}
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Color Harmony Palette</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {palette.map((color, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 border-2 border-white/20 hover:border-white/40"
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setSelectedColor(color);
                          addToHistory(color);
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Saved Colors */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Saved Colors</h3>
                <div className="grid grid-cols-4 gap-2">
                  {savedColors.map((color, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg cursor-pointer hover:scale-110 transition-transform duration-200 border-2 border-white/20 hover:border-white/40"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedColor(color);
                        addToHistory(color);
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Colors */}
              {colorHistory.length > 0 && (
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Colors</h3>
                  <div className="space-y-2">
                    {colorHistory.map((color, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
                        onClick={() => setSelectedColor(color)}
                      >
                        <div
                          className="w-8 h-8 rounded-lg border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-white/80 text-sm font-mono">{color.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Tools */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Tools</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => copyToClipboard(getColorValue())}
                    className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Copy Color Value
                  </button>
                  <button
                    onClick={generateRandomColor}
                    className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Generate Random
                  </button>
                  <button
                    onClick={() => setColorHistory([])}
                    className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Clear History
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
