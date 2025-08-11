import { useState } from 'react';
import RustCalculator from './RustCalculator';
import TextToShader from './TextToShader';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-500 mb-2">
            Two-Page App
          </h1>
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            Rust Calculator
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-sm border">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'calculator'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('shader')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'shader'
                  ? 'bg-purple-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Shader Generator
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {activeTab === 'calculator' ? <RustCalculator /> : <TextToShader />}
        </div>
      </div>
    </div>
  );
}

export default App;