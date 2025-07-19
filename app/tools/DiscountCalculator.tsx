// app/tools/DiscountCalculator.tsx

'use client';

import { useState, useMemo } from 'react';

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState('1000');
  const [discount, setDiscount] = useState('25');

  const result = useMemo(() => {
    const price = parseFloat(originalPrice);
    const disc = parseFloat(discount);

    if (price > 0 && disc >= 0 && disc <= 100) {
      const savings = (price * disc) / 100;
      const finalPrice = price - savings;
      
      return {
        finalPrice,
        savings,
      };
    }
    return null;
  }, [originalPrice, discount]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-price-tag-3-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Discount Calculator</h2>
            <p className="text-white/70">Calculate the final price after a discount.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Original Price (₹)</label>
                <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Discount Percentage (%)</label>
                <input type="number" step="1" min="0" max="100" value={discount} onChange={e => setDiscount(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="text-center mb-6">
                    <p className="text-white/70 mb-2">Final Price</p>
                    <p className="text-4xl font-bold text-green-400">{formatCurrency(result.finalPrice)}</p>
                </div>
                <div className="text-center">
                    <p className="text-white/80 text-lg">You save <span className="font-bold text-pink-400">{formatCurrency(result.savings)}</span>!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
                }
