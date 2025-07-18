
'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Add to history
      const calculation = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      setHistory(prev => [calculation, ...prev].slice(0, 10));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '%':
        return firstValue * (secondValue / 100);
      case '√':
        return Math.sqrt(firstValue);
      case 'x²':
        return firstValue * firstValue;
      case '1/x':
        return secondValue !== 0 ? 1 / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performSpecialOperation = (op) => {
    const inputValue = parseFloat(display);
    let result;

    switch (op) {
      case '√':
        result = Math.sqrt(inputValue);
        break;
      case 'x²':
        result = inputValue * inputValue;
        break;
      case '1/x':
        result = inputValue !== 0 ? 1 / inputValue : 0;
        break;
      case 'sin':
        result = Math.sin(inputValue * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(inputValue);
        break;
      case 'ln':
        result = Math.log(inputValue);
        break;
      default:
        return;
    }

    setDisplay(String(result));
    const calculation = `${op}(${inputValue}) = ${result}`;
    setHistory(prev => [calculation, ...prev].slice(0, 10));
    setWaitingForOperand(true);
  };

  const Button = ({ onClick, className = "", children, ...props }) => (
    <button
      onClick={onClick}
      className={`h-16 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-calculator-line text-white text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Dynamic Calculator</h2>
            <p className="text-white/70">Advanced calculator with scientific functions and calculation history</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-3">
              <div className="bg-white/5 rounded-xl p-6">
                {/* Display */}
                <div className="bg-black/30 rounded-lg p-6 mb-6">
                  <div className="text-right">
                    <div className="text-white/60 text-sm mb-1">
                      {previousValue !== null && operation ? `${previousValue} ${operation}` : ''}
                    </div>
                    <div className="text-white text-3xl font-mono break-all">
                      {display}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-5 gap-3">
                  {/* Scientific functions */}
                  <Button
                    onClick={() => performSpecialOperation('sin')}
                    className="bg-purple-600/50 hover:bg-purple-600/70 text-white"
                  >
                    sin
                  </Button>
                  <Button
                    onClick={() => performSpecialOperation('cos')}
                    className="bg-purple-600/50 hover:bg-purple-600/70 text-white"
                  >
                    cos
                  </Button>
                  <Button
                    onClick={() => performSpecialOperation('tan')}
                    className="bg-purple-600/50 hover:bg-purple-600/70 text-white"
                  >
                    tan
                  </Button>
                  <Button
                    onClick={() => performSpecialOperation('log')}
                    className="bg-purple-600/50 hover:bg-purple-600/70 text-white"
                  >
                    log
                  </Button>
                  <Button
                    onClick={() => performSpecialOperation('ln')}
                    className="bg-purple-600/50 hover:bg-purple-600/70 text-white"
                  >
                    ln
                  </Button>

                  {/* Row 2 */}
                  <Button
                    onClick={() => performSpecialOperation('x²')}
                    className="bg-blue-600/50 hover:bg-blue-600/70 text-white"
                  >
                    x²
                  </Button>
                  <Button
                    onClick={() => performSpecialOperation('√')}
                    className="bg-blue-600/50 hover:bg-blue-600/70 text-white"
                  >
                    √
                  </Button>
                  <Button
                    onClick={() => performSpecialOperation('1/x')}
                    className="bg-blue-600/50 hover:bg-blue-600/70 text-white"
                  >
                    1/x
                  </Button>
                  <Button
                    onClick={clear}
                    className="bg-red-600/50 hover:bg-red-600/70 text-white"
                  >
                    C
                  </Button>
                  <Button
                    onClick={() => performOperation('÷')}
                    className="bg-orange-600/50 hover:bg-orange-600/70 text-white"
                  >
                    ÷
                  </Button>

                  {/* Row 3 */}
                  <Button
                    onClick={() => inputNumber(7)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    7
                  </Button>
                  <Button
                    onClick={() => inputNumber(8)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    8
                  </Button>
                  <Button
                    onClick={() => inputNumber(9)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    9
                  </Button>
                  <Button
                    onClick={() => performOperation('×')}
                    className="bg-orange-600/50 hover:bg-orange-600/70 text-white"
                  >
                    ×
                  </Button>
                  <Button
                    onClick={() => performOperation('%')}
                    className="bg-orange-600/50 hover:bg-orange-600/70 text-white"
                  >
                    %
                  </Button>

                  {/* Row 4 */}
                  <Button
                    onClick={() => inputNumber(4)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    4
                  </Button>
                  <Button
                    onClick={() => inputNumber(5)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    5
                  </Button>
                  <Button
                    onClick={() => inputNumber(6)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    6
                  </Button>
                  <Button
                    onClick={() => performOperation('-')}
                    className="bg-orange-600/50 hover:bg-orange-600/70 text-white"
                  >
                    -
                  </Button>
                  <Button
                    onClick={() => setDisplay(String(Math.PI))}
                    className="bg-blue-600/50 hover:bg-blue-600/70 text-white"
                  >
                    π
                  </Button>

                  {/* Row 5 */}
                  <Button
                    onClick={() => inputNumber(1)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    1
                  </Button>
                  <Button
                    onClick={() => inputNumber(2)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    2
                  </Button>
                  <Button
                    onClick={() => inputNumber(3)}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    3
                  </Button>
                  <Button
                    onClick={() => performOperation('+')}
                    className="bg-orange-600/50 hover:bg-orange-600/70 text-white"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => setDisplay(String(Math.E))}
                    className="bg-blue-600/50 hover:bg-blue-600/70 text-white"
                  >
                    e
                  </Button>

                  {/* Row 6 */}
                  <Button
                    onClick={() => inputNumber(0)}
                    className="bg-white/10 hover:bg-white/20 text-white col-span-2"
                  >
                    0
                  </Button>
                  <Button
                    onClick={inputDecimal}
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    .
                  </Button>
                  <Button
                    onClick={() => performOperation('=')}
                    className="bg-green-600/50 hover:bg-green-600/70 text-white col-span-2"
                  >
                    =
                  </Button>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="lg:col-span-1">
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
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-white/50 text-sm text-center py-4">No calculations yet</p>
                  ) : (
                    history.map((calculation, index) => (
                      <div
                        key={index}
                        className="bg-white/10 rounded-lg p-3 text-white/80 text-sm font-mono break-all"
                      >
                        {calculation}
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
