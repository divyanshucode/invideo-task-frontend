import { useState } from 'react';

function TextToShader() {
  const [description, setDescription] = useState('');
  const [shaderCode, setShaderCode] = useState('');
  const [shaderDisplay, setShaderDisplay] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setLoading(true);
    setError('');
    setShaderCode('');
    setShaderDisplay('');

    try {
      // This will connect to Elixir backend
      const response = await fetch('http://localhost:4000/api/generate-shader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error('Backend not available');
      }

      const data = await response.json();
      if (data.shader_code) {
        setShaderCode(data.shader_code);
        setShaderDisplay('Shader generated successfully!');
      }
    } catch (err) {
      // Demo mode
      const mockShader = `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(st.x, st.y, 0.5);
    gl_FragColor = vec4(color, 1.0);
}`;
      
      setShaderCode(mockShader);
      setShaderDisplay(`Generated shader for: "${description}"`);
      setError('Demo mode - backend not connected');
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
          placeholder="Describe your shader... (e.g., 'colorful waves', 'fire effect')"
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-700 text-sm text-center">{error}</p>
          </div>
        )}
      </div>

      {/* Output Section - Two Boxes */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Shader Display Box */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Shader Display</h3>
          <div className="bg-gray-100 border-2 border-gray-200 rounded-lg p-6 min-h-[200px] flex items-center justify-center">
            {shaderDisplay ? (
              <p className="text-gray-700 text-center">{shaderDisplay}</p>
            ) : (
              <p className="text-gray-400 text-center">Shader output will appear here</p>
            )}
          </div>
        </div>

        {/* Code Box */}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Generated Code</h3>
          <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 min-h-[200px]">
            <pre className="text-green-400 text-sm font-mono overflow-auto">
              {shaderCode || 'Generated code will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToShader;