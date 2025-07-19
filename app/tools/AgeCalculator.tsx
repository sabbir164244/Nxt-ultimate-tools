// app/tools/AgeCalculator.tsx

'use client';

import { useState } from 'react';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<AgeResult | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const today = new Date();
    const dob = new Date(birthDate);

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
    
    setAge({
      years,
      months,
      days,
      totalDays,
      totalWeeks: Math.floor(totalDays / 7),
      totalHours: totalDays * 24,
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-calendar-2-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Age Calculator</h2>
            <p className="text-white/70">Find out your exact age in years, months, and days.</p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full">
                <label className="block text-white font-medium mb-3">Your Date of Birth</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                />
              </div>
              <button
                onClick={calculateAge}
                disabled={!birthDate}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-4 sm:mt-9"
              >
                Calculate
              </button>
            </div>

            {age && (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white text-center mb-6">Your Age Is</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-4xl font-bold text-pink-400">{age.years}</div>
                    <div className="text-white/70 text-sm">Years</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-4xl font-bold text-purple-400">{age.months}</div>
                    <div className="text-white/70 text-sm">Months</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-4xl font-bold text-cyan-400">{age.days}</div>
                    <div className="text-white/70 text-sm">Days</div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-lg font-semibold text-white text-center mb-4">Fun Facts</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-white/80 text-sm">
                        <p><strong className="text-white text-lg">{age.totalWeeks.toLocaleString()}</strong> weeks</p>
                        <p><strong className="text-white text-lg">{age.totalDays.toLocaleString()}</strong> days</p>
                        <p><strong className="text-white text-lg">{age.totalHours.toLocaleString()}</strong> hours</p>
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
