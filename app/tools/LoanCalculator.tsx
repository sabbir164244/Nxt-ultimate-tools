// app/tools/LoanCalculator.tsx

'use client';

import { useState, useMemo } from 'react';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('5');
  const [tenureUnit, setTenureUnit] = useState('years');

  const emiResult = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = tenureUnit === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure);

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;
      
      return {
        emi: emi,
        totalInterest: totalInterest,
        totalPayment: totalPayment,
      };
    }
    return null;
  }, [principal, rate, tenure, tenureUnit]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-bank-card-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Loan / EMI Calculator</h2>
            <p className="text-white/70">Calculate your monthly loan installments with ease.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">Loan Amount (₹)</label>
                <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Interest Rate (% p.a.)</label>
                <input type="number" step="0.1" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Loan Tenure</label>
                <div className="flex gap-2">
                    <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <select value={tenureUnit} onChange={e => setTenureUnit(e.target.value)} className="p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option value="years" className="bg-slate-800">Years</option>
                        <option value="months" className="bg-slate-800">Months</option>
                    </select>
                </div>
              </div>
            </div>

            {/* Results */}
            {emiResult && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-center">
                <div className="text-center mb-6">
                    <p className="text-white/70 mb-2">Monthly EMI</p>
                    <p className="text-4xl font-bold text-sky-400">{formatCurrency(emiResult.emi)}</p>
                </div>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-white/80">
                        <span>Principal Amount</span>
                        <span className="font-medium text-white">{formatCurrency(parseFloat(principal))}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                        <span>Total Interest</span>
                        <span className="font-medium text-white">{formatCurrency(emiResult.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between text-white/80 pt-3 border-t border-white/20">
                        <span className="font-bold">Total Payment</span>
                        <span className="font-bold text-white">{formatCurrency(emiResult.totalPayment)}</span>
                    </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
      }
