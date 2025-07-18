
'use client';

import { useState, useEffect } from 'react';

export default function Puzzle() {
  const [gridSize, setGridSize] = useState(3);
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  useEffect(() => {
    initializePuzzle();
  }, [gridSize]);

  useEffect(() => {
    let interval;
    if (isPlaying && !isComplete) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isComplete]);

  useEffect(() => {
    if (isComplete && isPlaying) {
      const currentScore = { moves, time: timeElapsed };
      const savedBest = localStorage.getItem(`puzzle-best-${gridSize}x${gridSize}`);
      
      if (!savedBest || moves < JSON.parse(savedBest).moves) {
        localStorage.setItem(`puzzle-best-${gridSize}x${gridSize}`, JSON.stringify(currentScore));
        setBestScore(currentScore);
      }
    }
  }, [isComplete, moves, timeElapsed, gridSize, isPlaying]);

  useEffect(() => {
    const savedBest = localStorage.getItem(`puzzle-best-${gridSize}x${gridSize}`);
    if (savedBest) {
      setBestScore(JSON.parse(savedBest));
    } else {
      setBestScore(null);
    }
  }, [gridSize]);

  const initializePuzzle = () => {
    const totalTiles = gridSize * gridSize;
    const initialTiles = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
    initialTiles.push(null); // Empty space
    
    // Shuffle the tiles
    const shuffled = [...initialTiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Ensure puzzle is solvable
    const solvableTiles = ensureSolvable(shuffled);
    
    setTiles(solvableTiles);
    setEmptyIndex(solvableTiles.indexOf(null));
    setMoves(0);
    setTimeElapsed(0);
    setIsComplete(false);
    setIsPlaying(false);
  };

  const ensureSolvable = (tiles) => {
    const inversions = countInversions(tiles);
    const emptyRowFromBottom = Math.floor(tiles.indexOf(null) / gridSize);
    
    if (gridSize % 2 === 1) {
      // Odd grid size: even number of inversions = solvable
      if (inversions % 2 !== 0) {
        // Make it even by swapping first two non-empty tiles
        for (let i = 0; i < tiles.length - 1; i++) {
          if (tiles[i] !== null && tiles[i + 1] !== null) {
            [tiles[i], tiles[i + 1]] = [tiles[i + 1], tiles[i]];
            break;
          }
        }
      }
    } else {
      // Even grid size: complex solvability check
      const isEvenInversions = inversions % 2 === 0;
      const isEmptyOnEvenRowFromBottom = emptyRowFromBottom % 2 === 0;
      
      if (isEvenInversions === isEmptyOnEvenRowFromBottom) {
        // Make it solvable by swapping first two non-empty tiles
        for (let i = 0; i < tiles.length - 1; i++) {
          if (tiles[i] !== null && tiles[i + 1] !== null) {
            [tiles[i], tiles[i + 1]] = [tiles[i + 1], tiles[i]];
            break;
          }
        }
      }
    }
    
    return tiles;
  };

  const countInversions = (tiles) => {
    let inversions = 0;
    const numbers = tiles.filter(tile => tile !== null);
    
    for (let i = 0; i < numbers.length - 1; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] > numbers[j]) {
          inversions++;
        }
      }
    }
    
    return inversions;
  };

  const canMoveTile = (index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;
    
    return (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    );
  };

  const moveTile = (index) => {
    if (!canMoveTile(index)) return;
    
    if (!isPlaying) {
      setIsPlaying(true);
    }
    
    const newTiles = [...tiles];
    [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
    
    setTiles(newTiles);
    setEmptyIndex(index);
    setMoves(prev => prev + 1);
    
    // Check if puzzle is complete
    const isWon = newTiles.every((tile, i) => {
      if (i === newTiles.length - 1) return tile === null;
      return tile === i + 1;
    });
    
    if (isWon) {
      setIsComplete(true);
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = () => {
    switch (gridSize) {
      case 3: return 'from-green-500 to-emerald-600';
      case 4: return 'from-yellow-500 to-orange-600';
      case 5: return 'from-red-500 to-pink-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className={`w-20 h-20 bg-gradient-to-r ${getDifficultyColor()} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <i className="ri-puzzle-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Sliding Puzzle Game</h2>
            <p className="text-white/70">Challenge yourself with this classic number sliding puzzle</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Game Board */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 rounded-xl p-6">
                {/* Game Controls */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <select
                      value={gridSize}
                      onChange={(e) => setGridSize(Number(e.target.value))}
                      className="bg-white/10 border border-white/20 rounded-lg text-white p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8 text-sm"
                      disabled={isPlaying}
                    >
                      <option value={3} className="bg-slate-800">3×3 (Easy)</option>
                      <option value={4} className="bg-slate-800">4×4 (Medium)</option>
                      <option value={5} className="bg-slate-800">5×5 (Hard)</option>
                    </select>
                    
                    <button
                      onClick={initializePuzzle}
                      className={`bg-gradient-to-r ${getDifficultyColor()} text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap`}
                    >
                      <i className="ri-refresh-line mr-2"></i>New Game
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-medium">Time: {formatTime(timeElapsed)}</div>
                    <div className="text-white/70 text-sm">Moves: {moves}</div>
                  </div>
                </div>

                {/* Puzzle Grid */}
                <div 
                  className="grid gap-2 mx-auto bg-white/10 p-4 rounded-xl"
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    maxWidth: '400px'
                  }}
                >
                  {tiles.map((tile, index) => (
                    <div
                      key={index}
                      onClick={() => moveTile(index)}
                      className={`
                        aspect-square flex items-center justify-center text-2xl font-bold rounded-lg transition-all duration-200
                        ${tile === null 
                          ? 'bg-transparent' 
                          : `bg-gradient-to-br ${getDifficultyColor()} text-white shadow-lg hover:scale-105 transform cursor-pointer hover:shadow-xl`
                        }
                        ${canMoveTile(index) && tile !== null ? 'ring-2 ring-white/30' : ''}
                      `}
                      style={{ minHeight: '60px' }}
                    >
                      {tile}
                    </div>
                  ))}
                </div>

                {/* Win Message */}
                {isComplete && (
                  <div className="mt-6 bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
                    <div className="text-green-400 text-2xl font-bold mb-2">
                      🎉 Congratulations! 🎉
                    </div>
                    <div className="text-white">
                      Puzzle completed in <span className="font-bold">{moves}</span> moves 
                      and <span className="font-bold">{formatTime(timeElapsed)}</span>!
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Game Stats */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Current Game</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Difficulty:</span>
                    <span className="text-white font-medium">
                      {gridSize}×{gridSize} {gridSize === 3 ? '(Easy)' : gridSize === 4 ? '(Medium)' : '(Hard)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Moves:</span>
                    <span className="text-white font-medium">{moves}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Time:</span>
                    <span className="text-white font-medium">{formatTime(timeElapsed)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Status:</span>
                    <span className={`font-medium ${isComplete ? 'text-green-400' : isPlaying ? 'text-blue-400' : 'text-white/70'}`}>
                      {isComplete ? 'Complete!' : isPlaying ? 'Playing' : 'Ready'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Best Score */}
              {bestScore && (
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Best Score ({gridSize}×{gridSize})
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70">Moves:</span>
                      <span className="text-yellow-400 font-bold">{bestScore.moves}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Time:</span>
                      <span className="text-yellow-400 font-bold">{formatTime(bestScore.time)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* How to Play */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
                <div className="space-y-2 text-white/70 text-sm">
                  <p>• Click on tiles adjacent to the empty space to move them</p>
                  <p>• Arrange numbers in order from 1 to {gridSize * gridSize - 1}</p>
                  <p>• The empty space should be in the bottom-right corner</p>
                  <p>• Try to complete the puzzle in minimum moves!</p>
                </div>
              </div>

              {/* Difficulty Guide */}
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-4">Difficulty</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-white/70">3×3 - Easy (8 tiles)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-white/70">4×4 - Medium (15 tiles)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-white/70">5×5 - Hard (24 tiles)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
