// app/tools/ImageCaptionGenerator.tsx

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function ImageCaptionGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [status, setStatus] = useState<string>('Ready. Upload an image to start.');
  
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/image-caption-worker.js', import.meta.url));
    
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case 'loading':
          setStatus(`Loading model... ${(e.data.progress * 100).toFixed(2)}%`);
          break;
        case 'ready':
          setStatus('AI Model Ready. Generating caption...');
          break;
        case 'complete':
          setCaption(e.data.output[0].generated_text);
          setStatus('Caption generated successfully!');
          break;
        default:
          setStatus('An unexpected error occurred.');
          break;
      }
    };

    workerRef.current.addEventListener('message', onMessageReceived);

    return () => workerRef.current?.removeEventListener('message', onMessageReceived);
  }, []);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImage(imageUrl);
        setCaption('');
        setStatus('Image loaded. Sending to AI...');
        workerRef.current?.postMessage({ image: imageUrl });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
  };
  
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-teal-400 to-fuchsia-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-robot-2-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">AI Image Caption Generator</h2>
            <p className="text-white/70">Let AI describe your images. This feels like magic!</p>
          </div>

          <div className="space-y-6">
            <div>
                <label className="block text-white font-medium mb-2">Upload Your Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
            </div>
            
            {image && (
                <div className="bg-black rounded-lg p-2 flex justify-center">
                    <img src={image} alt="Uploaded for captioning" className="max-h-64 rounded-md" />
                </div>
            )}
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                <p className="text-white/70 text-sm mb-2">Status:</p>
                <p className="text-teal-400 font-medium">{status}</p>
            </div>

            {caption && (
                 <div className="relative">
                    <textarea
                        value={caption}
                        readOnly
                        rows={3}
                        className="w-full p-4 pr-12 bg-black/30 border border-white/10 rounded-xl text-white placeholder-white/50 resize-none font-mono text-sm"
                    />
                    <button onClick={handleCopy} className="absolute top-3 right-3 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center">
                        <i className="ri-file-copy-line text-white"></i>
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
                                       }
