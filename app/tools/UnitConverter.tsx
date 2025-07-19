// app/tools/UnitConverter.tsx

'use client';

import { useState, useMemo } from 'react';

const conversionFactors: { [key: string]: { [key: string]: number } } = {
    length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
    weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 },
    temperature: { c: 1, f: 1, k: 1 }, // Special handling for temperature
};

const unitLabels: { [key: string]: string } = {
    m: 'Meters (m)', km: 'Kilometers (km)', cm: 'Centimeters (cm)', mm: 'Millimeters (mm)', mi: 'Miles (mi)', yd: 'Yards (yd)', ft: 'Feet (ft)', in: 'Inches (in)',
    kg: 'Kilograms (kg)', g: 'Grams (g)', mg: 'Milligrams (mg)', lb: 'Pounds (lb)', oz: 'Ounces (oz)',
    c: 'Celsius (°C)', f: 'Fahrenheit (°F)', k: 'Kelvin (K)',
};


export default function UnitConverter() {
    const [category, setCategory] = useState('length');
    const [inputValue, setInputValue] = useState('1');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        const units = Object.keys(conversionFactors[newCategory]);
        setFromUnit(units[0]);
        setToUnit(units[1] || units[0]);
    };

    const convertedValue = useMemo(() => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';

        if (category === 'temperature') {
            if (fromUnit === toUnit) return value;
            if (fromUnit === 'c' && toUnit === 'f') return (value * 9/5) + 32;
            if (fromUnit === 'f' && toUnit === 'c') return (value - 32) * 5/9;
            if (fromUnit === 'c' && toUnit === 'k') return value + 273.15;
            if (fromUnit === 'k' && toUnit === 'c') return value - 273.15;
            if (fromUnit === 'f' && toUnit === 'k') return (value - 32) * 5/9 + 273.15;
            if (fromUnit === 'k' && toUnit === 'f') return (value - 273.15) * 9/5 + 32;
            return value;
        } else {
            const baseValue = value * conversionFactors[category][fromUnit];
            const finalValue = baseValue / conversionFactors[category][toUnit];
            return finalValue;
        }
    }, [inputValue, fromUnit, toUnit, category]);

    const unitsForCategory = Object.keys(conversionFactors[category]);

    return (
        <div className="p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="ri-ruler-2-line text-white text-3xl"></i>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Unit Converter</h2>
                        <p className="text-white/70">Convert length, weight, temperature and more.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-xl p-6">
                            <div className="mb-6">
                                <label className="block text-white font-medium mb-3">Conversion Type</label>
                                <select value={category} onChange={handleCategoryChange} className="w-full p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                                    <option value="length" className="bg-slate-800">Length</option>
                                    <option value="weight" className="bg-slate-800">Weight</option>
                                    <option value="temperature" className="bg-slate-800">Temperature</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                <div className="md:col-span-1">
                                    <label className="block text-white font-medium mb-3">From</label>
                                    <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                                    <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full mt-2 p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                                        {unitsForCategory.map(unit => <option key={unit} value={unit} className="bg-slate-800">{unitLabels[unit]}</option>)}
                                    </select>
                                </div>
                                <div className="text-center text-3xl text-white/70 transform md:rotate-0 rotate-90">=</div>
                                <div className="md:col-span-1">
                                    <label className="block text-white font-medium mb-3">To</label>
                                    <input type="text" value={typeof convertedValue === 'number' ? convertedValue.toPrecision(6) : ''} readOnly className="w-full p-3 bg-black/30 rounded-xl border border-white/10 text-white font-bold" />
                                    <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full mt-2 p-3 bg-white/10 rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                                        {unitsForCategory.map(unit => <option key={unit} value={unit} className="bg-slate-800">{unitLabels[unit]}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
                                   }
