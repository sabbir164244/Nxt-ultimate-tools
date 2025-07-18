
'use client';

import { useState } from 'react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [passwordHistory, setPasswordHistory] = useState([]);

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const similar = 'il1Lo0O';

  const generatePassword = () => {
    let charset = '';
    
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    if (excludeSimilar) {
      charset = charset.split('').filter(char => !similar.includes(char)).join('');
    }
    
    if (charset === '') {
      alert('Please select at least one character type!');
      return;
    }
    
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(newPassword);
    
    // Add to history
    if (newPassword && !passwordHistory.includes(newPassword)) {
      setPasswordHistory(prev => [newPassword, ...prev].slice(0, 10));
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Visual feedback could be added here
    });
  };

  const getPasswordStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score < 3) return { level: 'Weak', color: 'text-red-400', bgColor: 'bg-red-500' };
    if (score < 5) return { level: 'Medium', color: 'text-yellow-400', bgColor: 'bg-yellow-500' };
    return { level: 'Strong', color: 'text-green-400', bgColor: 'bg-green-500' };
  };

  const strength = password ? getPasswordStrength(password) : null;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-lock-password-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Password Generator</h2>
            <p className="text-white/70">Generate secure, random passwords with customizable options</p>
          </div>

          <div className="space-y-6">
            {/* Generated Password Display */}
            <div className="bg-white/5 rounded-xl p-6">
              <label className="block text-white font-medium mb-3">Generated Password</label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 p-4 bg-black/30 rounded-lg border border-white/20 font-mono text-white text-lg break-all">
                  {password || 'Click generate to create a password'}
                </div>
                {password && (
                  <button
                    onClick={() => copyToClipboard(password)}
                    className="w-12 h-12 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                    title="Copy to clipboard"
                  >
                    <i className="ri-file-copy-line text-blue-400 text-lg"></i>
                  </button>
                )}
              </div>
              
              {strength && (
                <div className="mt-3 flex items-center space-x-3">
                  <span className="text-white/70 text-sm">Strength:</span>
                  <span className={`font-medium ${strength.color}`}>{strength.level}</span>
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strength.bgColor} transition-all duration-300`}
                      style={{ width: strength.level === 'Weak' ? '33%' : strength.level === 'Medium' ? '66%' : '100%' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Password Options */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Password Options</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-3">
                    Password Length: {length}
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-white/50 text-sm mt-1">
                    <span>4</span>
                    <span>50</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span>Include Uppercase (A-Z)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span>Include Lowercase (a-z)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span>Include Numbers (0-9)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span>Include Symbols (!@#$%)</span>
                  </label>

                  <label className="flex items-center space-x-3 text-white cursor-pointer md:col-span-2">
                    <input
                      type="checkbox"
                      checked={excludeSimilar}
                      onChange={(e) => setExcludeSimilar(e.target.checked)}
                      className="w-5 h-5 text-green-500 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <span>Exclude Similar Characters (i, l, 1, L, o, 0, O)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePassword}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-refresh-line mr-2"></i>
              Generate Password
            </button>

            {/* Password History */}
            {passwordHistory.length > 0 && (
              <div className="bg-white/5 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Password History</h3>
                  <button
                    onClick={() => setPasswordHistory([])}
                    className="text-red-400 hover:text-red-300 text-sm cursor-pointer"
                  >
                    Clear History
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {passwordHistory.map((pwd, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white/10 rounded-lg p-3"
                    >
                      <span className="font-mono text-white/80 text-sm break-all flex-1 mr-3">
                        {pwd}
                      </span>
                      <button
                        onClick={() => copyToClipboard(pwd)}
                        className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        <i className="ri-file-copy-line text-blue-400 text-sm"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tips */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <i className="ri-shield-check-line text-blue-400 text-lg mt-0.5"></i>
                <div className="text-blue-200 text-sm">
                  <p className="font-medium mb-2">Password Security Tips:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Use at least 12 characters for better security</li>
                    <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
                    <li>• Never reuse passwords across multiple accounts</li>
                    <li>• Store passwords securely using a password manager</li>
                    <li>• Change passwords regularly, especially for important accounts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
