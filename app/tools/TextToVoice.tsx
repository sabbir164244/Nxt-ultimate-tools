
'use client';

import { useState, useRef, useEffect } from 'react';

export default function TextToVoice() {
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text.trim()) return;

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[selectedVoice] || null;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const pause = () => {
    speechSynthesis.pause();
    setIsPlaying(false);
  };

  const resume = () => {
    speechSynthesis.resume();
    setIsPlaying(true);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-mic-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Text to Voice</h2>
            <p className="text-white/70">Convert your text to natural-sounding speech</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-3">Text to Speak</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                rows={8}
                maxLength={500}
                className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
              />
              <div className="text-right mt-2 text-white/50 text-sm">
                {text.length}/500 characters
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-3">Voice</label>
                <select
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(Number(e.target.value))}
                  className="w-full p-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-500 pr-8 text-sm"
                >
                  {voices.map((voice, index) => (
                    <option key={index} value={index} className="bg-slate-800">
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Speed: {rate.toFixed(1)}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-3">Pitch: {pitch.toFixed(1)}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={speak}
                disabled={!text.trim() || isPlaying}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
              >
                <i className="ri-play-line mr-2"></i>
                Play
              </button>

              <button
                onClick={pause}
                disabled={!isPlaying}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
              >
                <i className="ri-pause-line mr-2"></i>
                Pause
              </button>

              <button
                onClick={resume}
                disabled={isPlaying || !speechSynthesis.paused}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
              >
                <i className="ri-play-line mr-2"></i>
                Resume
              </button>

              <button
                onClick={stop}
                disabled={!isPlaying && !speechSynthesis.paused}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap cursor-pointer"
              >
                <i className="ri-stop-line mr-2"></i>
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
