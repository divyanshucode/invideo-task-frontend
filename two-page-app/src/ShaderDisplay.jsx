import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ShaderMaterial, Vector2 } from 'three';

const ShaderPlane = ({ fragmentShader }) => {
  const materialRef = useRef();

  // This vertex shader provides all common varying names to the fragment shader.
  const vertexShader = `
    varying vec2 vUv;
    varying vec2 vTexCoord;
    varying vec2 v_texCoord;
    void main() {
      vUv = uv;
      vTexCoord = uv;
      v_texCoord = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // useFrame runs on every frame, allowing for animation.
  useFrame(({ clock, size, mouse }) => {
    if (materialRef.current) {
      // Pass updated time, resolution, and mouse data to the shader.
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
      materialRef.current.uniforms.u_resolution.value = new Vector2(size.width, size.height);
      
      // Add common aliases used in online shader communities like Shadertoy.
      materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.iResolution.value = new Vector2(size.width, size.height);
      materialRef.current.uniforms.iMouse.value = new Vector2(mouse.x * size.width, mouse.y * size.height);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          // Standard uniforms
          u_time: { value: 0.0 },
          u_resolution: { value: new Vector2() },
          texture: { value: null },
          
          // Add common Shadertoy aliases to increase compatibility
          iTime: { value: 0.0 },
          iResolution: { value: new Vector2() },
          iMouse: { value: new Vector2() },
        }}
      />
    </mesh>
  );
};

const ShaderDisplay = ({ shaderCode }) => {
  if (!shaderCode) {
    return <p className="text-gray-400 text-center">Shader output will appear here</p>;
  }

  // The `key` prop forces a re-mount if the shader code changes, preventing errors.
  return (
    <Canvas key={shaderCode}>
      <ShaderPlane fragmentShader={shaderCode} />
    </Canvas>
  );
};

export default ShaderDisplay;
