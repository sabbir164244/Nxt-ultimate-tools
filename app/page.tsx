'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    { name: 'Image Resizer', icon: 'ri-scissors-line', description: 'Resize images to any dimension' },
    { name: 'Image Cropper', icon: 'ri-crop-line', description: 'Crop images perfectly' },
    { name: 'PDF Splitter', icon: 'ri-file-reduce-line', description: 'Split PDF into multiple files' },
    { name: 'PDF Merger', icon: 'ri-file-copy-line', description: 'Merge multiple PDFs' },
    { name: 'Image Framing', icon: 'ri-image-2-line', description: 'Add beautiful frames to images' },
    { name: 'Calculator', icon: 'ri-calculator-line', description: 'Advanced dynamic calculator' },
    { name: 'Password Generator', icon: 'ri-lock-password-line', description: 'Generate secure passwords' },
    { name: 'BMI Calculator', icon: 'ri-heart-pulse-line', description: 'Calculate body mass index' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black relative overflow-hidden">
      {/* --- YEH HAI NAYA, GUARANTEED ANIMATION --- */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 80 + 20; // 20px to 100px
          const duration = Math.random() * 10 + 10; // 10s to 20s
          return (
            <div
              key={i}
              className="absolute rounded-full bg-indigo-500/10 animate-float"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${duration}s`,
                animationDelay: `${Math.random() * -10}s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 bg-black/20 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
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
        </header>

        {/* Hero Section */}
        <section id="home" className="pt-20 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
                Ultimate
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Tools</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Your complete toolkit for productivity. 40+ professional tools in one place - PDF manipulation, image processing, calculators, and much more.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/tools" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl whitespace-nowrap cursor-pointer">
                  Explore Tools
                </Link>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>
        
        <div
          className="flex justify-center my-4"
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

        <section id="tools" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Featured Tools</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Discover our most popular and powerful tools designed to boost your productivity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${tool.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
                  <p className="text-white/70 mb-6">{tool.description}</p>
                  <Link href="/tools" className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
                    Try Now →
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/tools" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-2xl whitespace-nowrap cursor-pointer">
                View All 40+ Tools
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Nxt Ultimate Tools?</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Professional-grade tools with enterprise-level performance and security
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'ri-shield-check-line', title: 'Secure & Private', desc: 'All processing done locally in your browser' },
                { icon: 'ri-speed-line', title: 'Lightning Fast', desc: 'Optimized for maximum performance' },
                { icon: 'ri-smartphone-line', title: 'Mobile Friendly', desc: 'Works perfectly on all devices' },
                { icon: 'ri-medal-line', title: 'Professional Quality', desc: 'Enterprise-grade tool performance' }
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <i className={`${feature.icon} text-white text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <p className="text-xl text-white/70">
                Everything you need to know about Nxt Ultimate Tools
              </p>
            </div>
            <div className="space-y-6">
              {[
                { q: "Are all tools completely free to use?", a: "Yes! All 40+ tools are completely free with no hidden charges or premium features." },
                { q: "Is my data safe when using these tools?", a: "Absolutely. All processing is done locally in your browser. Your files never leave your device." },
                { q: "Do I need to create an account?", a: "No account required! Simply visit the website and start using any tool immediately." },
                { q: "Can I use these tools on mobile devices?", a: "Yes! All tools are fully responsive and work perfectly on smartphones and tablets." },
                { q: "How often are new tools added?", a: "We regularly add new tools based on user feedback and emerging needs in productivity." }
              ].map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-bold text-white mb-3">{faq.q}</h3>
                  <p className="text-white/80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <div
          className="flex justify-center my-4"
          dangerouslySetInnerHTML={{
            __html: `
              <script async="async" data-cfasync="false" src="//nastylayer.com/5d3cff5e304628342af2358707fdbedb/invoke.js"></script>
              <div id="container-5d3cff5e304628342af2358707fdbedb"></div>
            `,
          }}
        />
        
        <footer className="py-12 px-6 bg-black/30 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-tools-line text-white text-lg"></i>
              </div>
              <h3 className="text-xl font-bold text-white font-pacifico">Nxt Ultimate Tools</h3>
            </div>
            <p className="text-white/70 mb-6">Your complete productivity toolkit - 40+ professional tools in one place</p>
            <div className="flex justify-center space-x-6 mb-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors cursor-pointer">Contact</a>
            </div>
            <p className="text-white/50 text-sm">© 2024 Nxt Ultimate Tools. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
            }
