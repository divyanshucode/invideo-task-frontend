import React, { useState } from 'react';
import ShaderDisplay from './ShaderDisplay'; // <-- Import the new component

function TextToShader() {
  const [description, setDescription] = useState('');
  const [shaderCode, setShaderCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    // Do not clear the old shader code, so it keeps displaying until a new one arrives
    // setShaderCode(''); 

    try {
      const response = await fetch('https://shader-backend.onrender.com/api/generate-shader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a response from the backend.');
      }

      const data = await response.json();
      if (data.ok && data.shader_code) {
        setShaderCode(data.shader_code);
      } else {
        throw new Error(data.error || 'The generated shader code was invalid.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Shader Generator
        </h2>
        <p className="text-gray-600 text-sm">
          Describe what you want to see
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., 'colorful waves', 'fire effect', 'starfield'"
          rows={3}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors hover:border-gray-400 resize-none"
        />
        
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Generating...' : 'Generate Shader'}
        </button>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-700 text-sm text-center">{error}</p>
          </div>
        )}
      </div>

      {/* Output Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Shader Display Box */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Shader Display</h3>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg aspect-square overflow-hidden">
            <ShaderDisplay shaderCode={shaderCode} />
          </div>
        </div>

        {/* Code Box */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Generated Code</h3>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 h-full">
            <pre className="text-green-400 text-sm font-mono overflow-auto h-full">
              <code>{shaderCode || 'Generated code will appear here...'}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToShader;