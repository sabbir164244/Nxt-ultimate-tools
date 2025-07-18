'use client';

import { useState } from 'react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<{name: string, color: string} | ''>('');
  const [history, setHistory] = useState<any[]>([]);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    
    if (!weightNum || !heightNum || weightNum <= 0 || heightNum <= 0) {
      alert('Please enter valid weight and height values!');
      return;
    }
    
    let bmiValue;
    let weightInKg = weightNum;
    let heightInM = heightNum;
    
    if (unit === 'imperial') {
      weightInKg = weightNum * 0.453592;
      heightInM = heightNum * 0.0254;
    } else {
      if (heightNum > 3) {
        heightInM = heightNum / 100;
      }
    }
    
    bmiValue = weightInKg / (heightInM * heightInM);
    
    let bmiCategory = '';
    let categoryColor = '';
    
    if (bmiValue < 18.5) {
      bmiCategory = 'Underweight';
      categoryColor = 'text-blue-400';
    } else if (bmiValue < 25) {
      bmiCategory = 'Normal weight';
      categoryColor = 'text-green-400';
    } else if (bmiValue < 30) {
      bmiCategory = 'Overweight';
      categoryColor = 'text-yellow-400';
    } else {
      bmiCategory = 'Obese';
      categoryColor = 'text-red-400';
    }
    
    setBmi(parseFloat(bmiValue.toFixed(1)));
    setCategory({ name: bmiCategory, color: categoryColor });
    
    const calculation = {
      bmi: bmiValue.toFixed(1),
      category: bmiCategory,
      weight: weightNum,
      height: heightNum,
      unit: unit,
      date: new Date().toLocaleDateString()
    };
    
    setHistory(prev => [calculation, ...prev].slice(0, 10));
  };

  const getBMIDescription = (bmiCategory: string) => {
    switch (bmiCategory) {
      case 'Underweight':
        return 'You may need to gain weight. Consult with a healthcare provider for personalized advice.';
      case 'Normal weight':
        return 'Great job! You have a healthy weight. Maintain your current lifestyle.';
      case 'Overweight':
        return 'Consider adopting a healthier diet and increasing physical activity.';
      case 'Obese':
        return 'It is recommended to consult with a healthcare provider for a weight management plan.';
      default:
        return '';
    }
  };

  const getIdealWeightRange = () => {
    const heightNum = parseFloat(height);
    if (!heightNum) return null;
    
    let heightInM = heightNum;
    if (unit === 'imperial') {
      heightInM = heightNum * 0.0254;
    } else {
      if (heightNum > 3) {
        heightInM = heightNum / 100;
      }
    }
    
    const minIdealWeight = 18.5 * (heightInM * heightInM);
    const maxIdealWeight = 24.9 * (heightInM * heightInM);
    
    if (unit === 'imperial') {
      return {
        min: (minIdealWeight / 0.453592).toFixed(1),
        max: (maxIdealWeight / 0.453592).toFixed(1),
        unit: 'lbs'
      };
    } else {
      return {
        min: minIdealWeight.toFixed(1),
        max: maxIdealWeight.toFixed(1),
        unit: 'kg'
      };
    }
  };

  const idealWeight = getIdealWeightRange();

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-pulse-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">BMI Calculator</h2>
            <p className="text-white/70">Calculate your Body Mass Index and get health insights</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 rounded-xl p-6">
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">Unit System</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 text-white cursor-pointer">
                      <input
                        type="radio"
                        name="unit"
                        value="metric"
                        checked={unit === 'metric'}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-4 h-4 text-pink-500"
                      />
                      <span>Metric (kg, cm)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-white cursor-pointer">
                      <input
                        type="radio"
                        name="unit"
                        value="imperial"
                        checked={unit === 'imperial'}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-4 h-4 text-pink-500"
                      />
                      <span>Imperial (lbs, inches)</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white font-medium mb-3">
                      Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
                      className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-3">
                      Height ({unit === 'metric' ? 'cm' : 'inches'})
                    </label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
                      className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateBMI}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  Calculate BMI
                </button>

                {bmi && category && typeof category === 'object' && (
                  <div className="mt-6 bg-white/10 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-white mb-2">{bmi}</div>
                      <div className={`text-xl font-semibold ${category.color}`}>
                        {category.name}
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                      <p className="text-white/80 text-sm text-center">
                        {getBMIDescription(category.name)}
                      </p>
                    </div>

                    {idealWeight && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                        <h4 className="text-green-400 font-medium mb-2">Ideal Weight Range</h4>
                        <p className="text-white/80 text-sm">
                          For your height, a healthy weight range is{' '}
                          <span className="font-bold text-green-400">
                            {idealWeight.min} - {idealWeight.max} {idealWeight.unit}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">BMI Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400">Underweight</span>
                    <span className="text-white/70 text-sm">{'<'} 18.5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">Normal</span>
                    <span className="text-white/70 text-sm">18.5 - 24.9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400">Overweight</span>
                    <span className="text-white/70 text-sm">25 - 29.9</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-red-400">Obese</span>
                    <span className="text-white/70 text-sm">≥ 30</span>
                  </div>
                </div>
              </div>

              {history.length > 0 && (
                <div className="bg-white/5 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">History</h3>
                    <button
                      onClick={() => setHistory([])}
                      className="text-red-400 hover:text-red-300 text-sm cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {history.map((record, index) => (
                      <div key={index} className="bg-white/10 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white">{record.bmi}</span>
                          <span className="text-white/60 text-xs">{record.date}</span>
                        </div>
                        <div className="text-sm text-white/70">
                          {record.category}
                        </div>
                        <div className="text-xs text-white/50">
                          {record.weight} {record.unit === 'metric' ? 'kg' : 'lbs'},{' '}
                          {record.height} {record.unit === 'metric' ? 'cm' : 'in'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <i className="ri-alert-line text-yellow-400 text-lg mt-0.5"></i>
              <div className="text-yellow-200 text-sm">
                <p className="font-medium mb-1">Health Disclaimer</p>
                <p>BMI is a screening tool and not a diagnostic tool. It does not account for muscle mass, bone density, overall body composition, and racial and sex differences. Please consult with a healthcare professional for personalized health advice.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}