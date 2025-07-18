
'use client';

import { useState, useEffect } from 'react';

export default function Notepad() {
  const [content, setContent] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [currentNoteTitle, setCurrentNoteTitle] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Load saved notes from localStorage
    const saved = localStorage.getItem('notepad-notes');
    if (saved) {
      setSavedNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Auto-save functionality
    const autoSave = setTimeout(() => {
      if (content.trim()) {
        const autoSaveNote = {
          id: 'auto-save',
          title: 'Auto-saved Note',
          content: content,
          lastModified: new Date().toISOString(),
          isAutoSave: true
        };
        
        const updatedNotes = savedNotes.filter(note => note.id !== 'auto-save');
        updatedNotes.unshift(autoSaveNote);
        setSavedNotes(updatedNotes);
        localStorage.setItem('notepad-notes', JSON.stringify(updatedNotes));
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [content, savedNotes]);

  const saveNote = () => {
    if (!content.trim()) {
      alert('Please enter some content before saving!');
      return;
    }

    const title = currentNoteTitle.trim() || `Note ${Date.now()}`;
    const newNote = {
      id: Date.now().toString(),
      title: title,
      content: content,
      lastModified: new Date().toISOString(),
      isAutoSave: false
    };

    const updatedNotes = [newNote, ...savedNotes.filter(note => !note.isAutoSave)];
    setSavedNotes(updatedNotes);
    localStorage.setItem('notepad-notes', JSON.stringify(updatedNotes));
    setCurrentNoteTitle('');
    setLastSaved(new Date());
  };

  const loadNote = (note) => {
    setContent(note.content);
    setCurrentNoteTitle(note.isAutoSave ? '' : note.title);
  };

  const deleteNote = (noteId) => {
    const updatedNotes = savedNotes.filter(note => note.id !== noteId);
    setSavedNotes(updatedNotes);
    localStorage.setItem('notepad-notes', JSON.stringify(updatedNotes));
  };

  const newNote = () => {
    setContent('');
    setCurrentNoteTitle('');
  };

  const downloadNote = () => {
    if (!content.trim()) {
      alert('No content to download!');
      return;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentNoteTitle || 'note'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getWordCount = () => {
    if (!content.trim()) return { words: 0, characters: 0, lines: 0 };
    
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    const characters = content.length;
    const lines = content.split('\n').length;
    
    return { words, characters, lines };
  };

  const stats = getWordCount();

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-text-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Notepad</h2>
            <p className="text-white/70">A powerful text editor with auto-save and note management</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 rounded-xl p-6">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      value={currentNoteTitle}
                      onChange={(e) => setCurrentNoteTitle(e.target.value)}
                      placeholder="Note title..."
                      className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    <button
                      onClick={saveNote}
                      className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-save-line mr-2"></i>Save
                    </button>
                    <button
                      onClick={newNote}
                      className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-file-add-line mr-2"></i>New
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-white/70 text-sm">Size:</label>
                      <select
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value))}
                        className="bg-white/10 border border-white/20 rounded text-white text-sm p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                      >
                        <option value={12} className="bg-slate-800">12px</option>
                        <option value={14} className="bg-slate-800">14px</option>
                        <option value={16} className="bg-slate-800">16px</option>
                        <option value={18} className="bg-slate-800">18px</option>
                        <option value={20} className="bg-slate-800">20px</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={downloadNote}
                      className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer"
                      title="Download as text file"
                    >
                      <i className="ri-download-line"></i>
                    </button>
                  </div>
                </div>

                {/* Text Editor */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start typing your note here..."
                  className={`w-full h-96 p-4 bg-black/30 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono`}
                  style={{ 
                    fontSize: `${fontSize}px`,
                    whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
                    wordWrap: wordWrap ? 'break-word' : 'normal'
                  }}
                />

                {/* Status Bar */}
                <div className="flex items-center justify-between mt-4 text-sm text-white/60">
                  <div className="flex items-center space-x-6">
                    <span>Words: {stats.words}</span>
                    <span>Characters: {stats.characters}</span>
                    <span>Lines: {stats.lines}</span>
                  </div>
                  {lastSaved && (
                    <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Settings */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wordWrap}
                      onChange={(e) => setWordWrap(e.target.checked)}
                      className="w-4 h-4 text-indigo-500 rounded focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="text-sm">Word wrap</span>
                  </label>
                </div>
              </div>

              {/* Saved Notes */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Saved Notes</h3>
                  <span className="text-white/50 text-sm">{savedNotes.length}</span>
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {savedNotes.length === 0 ? (
                    <p className="text-white/50 text-sm text-center py-4">No saved notes yet</p>
                  ) : (
                    savedNotes.map((note) => (
                      <div
                        key={note.id}
                        className="bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-sm truncate ${note.isAutoSave ? 'text-yellow-400' : 'text-white'}`}>
                              {note.title}
                              {note.isAutoSave && <span className="ml-1">(Auto)</span>}
                            </h4>
                            <p className="text-white/60 text-xs mt-1 line-clamp-2">
                              {note.content.slice(0, 60)}...
                            </p>
                            <p className="text-white/40 text-xs mt-1">
                              {new Date(note.lastModified).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            <button
                              onClick={() => loadNote(note)}
                              className="w-6 h-6 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-400 flex items-center justify-center cursor-pointer"
                              title="Load note"
                            >
                              <i className="ri-file-line text-xs"></i>
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="w-6 h-6 bg-red-500/20 hover:bg-red-500/30 rounded text-red-400 flex items-center justify-center cursor-pointer"
                              title="Delete note"
                            >
                              <i className="ri-delete-bin-line text-xs"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
