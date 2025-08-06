'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Helper component for Plexus Animation
const PlexusBackground = () => {
  const particles = Array.from({ length: 50 });
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 4 + 1;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * -25;
        const color = Math.random() > 0.5 ? '#FF3A3A' : '#FFD700';
        return (
          <div
            key={i}
            className="plexus-particle"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: color,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};


export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tools = [
    { name: 'PDF Generator', icon: 'ri-file-pdf-line', description: 'Create PDF documents instantly' },
    { name: 'Word to PDF', icon: 'ri-file-word-line', description: 'Convert Word docs to PDF' },
    { name: 'Text to Voice', icon: 'ri-mic-line', description: 'Convert text to speech' },
    { name: 'Image Compressor', icon: 'ri-image-line', description: 'Reduce image file sizes' },
    { name: 'AI CV Generator', icon: 'ri-file-user-line', description: 'Design a professional CV with AI' },
    { name: 'AI Excel Sheet Generator', icon: 'ri-file-excel-2-line', description: 'Generate data sheets with AI' },
    { name: 'Image Framer', icon: 'ri-image-2-line', description: 'Add beautiful frames to images' },
    { name: 'Calculator', icon: 'ri-calculator-line', description: 'Advanced dynamic calculator' },
    { name: 'Password Generator', icon: 'ri-lock-password-line', description: 'Generate secure passwords' },
    { name: 'BMI Calculator', icon: 'ri-heart-pulse-line', description: 'Calculate body mass index' }
  ];

  return (
    <div className="min-h-screen bg-[#120000] text-[#F5F5F5] relative overflow-hidden">
      <PlexusBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="relative z-10 bg-black/30 backdrop-blur-lg border-b border-[--border-color]">
          <div className="p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF3A3A] to-[#FFD700] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                  <i className="ri-tools-line text-white text-xl"></i>
                </div>
                <h1 className="text-2xl font-bold text-white font-pacifico">Nxt Ultimate Tools</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" className="text-white/80 hover:text-white transition-colors">Home</a>
                <a href="#tools" className="text-white/80 hover:text-white transition-colors">Tools</a>
                <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
                <a href="#faq" className="text-white/80 hover:text-white transition-colors">FAQ</a>
              </nav>
            </div>
          </div>
          
          <div
            className="flex justify-center pt-4"
            dangerouslySetInnerHTML={{
              __html: `
                <script type="text/javascript">
                    atOptions = {
                        'key' : 'cb2be0a2984ea6df52ff2a61089fbce3',
                        'format' : 'iframe',
                        'height' : 90,
                        'width' : 728,
                        'params' : {}
                    };
                </script>
                <script type="text/javascript" src="//nastylayer.com/cb2be0a2984ea6df52ff2a61089fbce3/invoke.js"></script>
              `,
            }}
          />
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                The Ultimate 
                <span className="bg-gradient-to-r from-[#FF3A3A] to-[#FFD700] bg-clip-text text-transparent"> Toolkit</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                40+ professional tools powered by AI. From documents to design, everything you need in one royal suite.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/tools" className="bg-gradient-to-r from-[#FF3A3A] to-[#a82727] text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-[#FFD700] hover:to-[#b89b00] transform hover:scale-105 transition-all duration-300 shadow-lg shadow-red-500/30">
                  Explore All Tools
                </Link>
                <button className="border-2 border-[--border-color] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Tools */}
        <section id="tools" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Tools</h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">Discover our most powerful and popular creative tools.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                  <div key={index} className="bg-[--card-bg] backdrop-blur-lg rounded-2xl p-8 border border-[--border-color] hover:border-yellow-400/50 transition-all duration-300 transform hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF3A3A] to-[#FFD700] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/20">
                      <i className={`${tool.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                    <p className="text-white/70 mb-6">{tool.description}</p>
                    <Link href="/tools" className="text-[#FFD700] hover:text-yellow-200 font-semibold">
                      Try Now →
                    </Link>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Link href="/tools" className="bg-gradient-to-r from-[#FFD700] to-[#b89b00] text-black px-10 py-4 rounded-full text-lg font-semibold hover:from-yellow-300 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30">
                  View All 40+ Tools
                </Link>
              </div>
            </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 px-6 bg-black/20">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Our Tools?</h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto">Professional-grade tools with unparalleled performance and security.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: 'ri-shield-check-line', title: 'Secure & Private', desc: 'All processing is done locally in your browser.' },
                  { icon: 'ri-flashlight-line', title: 'Blazing Fast', desc: 'Optimized for maximum performance.' },
                  { icon: 'ri-smartphone-line', title: 'Fully Responsive', desc: 'Works perfectly on all your devices.' },
                  { icon: 'ri-award-line', title: 'Premium Quality', desc: 'Enterprise-grade tool performance.' }
                ].map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#FF3A3A] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/20">
                      <i className={`${feature.icon} text-white text-3xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/70">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {[
                { q: "Are all tools completely free to use?", a: "Yes! All 40+ tools are completely free with no hidden charges or premium features." },
                { q: "Is my data safe when using these tools?", a: "Absolutely. All processing is done locally in your browser. Your files never leave your device." },
                { q: "Do I need to create an account?", a: "No account required! Simply visit the website and start using any tool immediately." },
                { q: "How often are new tools added?", a: "We regularly add new AI-powered and utility tools to enhance your productivity." }
              ].map((faq, index) => (
                <div key={index} className="bg-[--card-bg] backdrop-blur-lg rounded-xl p-6 border border-[--border-color]">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                  <p className="text-white/80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Ad Code */}
        <div
          className="flex justify-center my-4"
          dangerouslySetInnerHTML={{
            __html: `
              <script async="async" data-cfasync="false" src="//nastylayer.com/5d3cff5e304628342af2358707fdbedb/invoke.js"></script>
              <div id="container-5d3cff5e304628342af2358707fdbedb"></div>
            `,
          }}
        />
        
        {/* Footer */}
        <footer className="py-12 px-6 bg-black/40 border-t border-[--border-color]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FF3A3A] to-[#FFD700] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/20">
                <i className="ri-tools-line text-white text-lg"></i>
              </div>
              <h3 className="text-xl font-bold text-white font-pacifico">Nxt Ultimate Tools</h3>
            </div>
            <p className="text-white/70 mb-6">Your complete productivity suite - 40+ professional tools in one royal place.</p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
            <p className="text-white/50 text-sm">© 2024 Nxt Ultimate Tools. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
      }
