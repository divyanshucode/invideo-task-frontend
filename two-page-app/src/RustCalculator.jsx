import { useState } from 'react';
// Import the functions directly. The plugins handle the rest.
import init, { calculate } from './pkg/calculator_logic.js';

// Initialize the module at the top level.
init();

function RustCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (!expression) return;
    try {
      // Call the function directly, with no need to check if it's ready.
      const calcResult = calculate(expression);
      setResult(calcResult.toString());
      setError('');
    } catch (err) {
      setError(err.toString() || 'Invalid expression');
      setResult('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Calculator
        </h2>
        <p className="text-gray-600 text-sm">
          Enter mathematical expressions
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="2+2, (5+7)/2, 3*4"
          className="w-full px-4 py-3 text-center text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors hover:border-gray-400"
        />
        
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Calculate
        </button>
      </div>

      {/* Result Display */}
      <div className="min-h-[80px] flex items-center justify-center">
        {result && !error && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 w-full">
            <p className="text-sm text-green-600 text-center mb-1">Result:</p>
            <p className="text-2xl font-mono font-semibold text-green-700 text-center">
              {result}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}

        {!result && !error && (
          <div className="text-gray-400 text-center">
            <p>Enter an expression and click Calculate</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RustCalculator;