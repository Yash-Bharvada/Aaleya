'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function StarMap() {
  const pointsRef = useRef<THREE.Points>(null)
  
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(5000 * 3)
    const col = new Float32Array(5000 * 3)
    
    for (let i = 0; i < 5000; i++) {
      const radius = Math.random() * 20 + 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
      
      // Mix of gold, ivory, and white
      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        // Gold
        col[i * 3] = 0.79
        col[i * 3 + 1] = 0.66
        col[i * 3 + 2] = 0.3
      } else if (colorChoice < 0.5) {
        // Rose
        col[i * 3] = 0.91
        col[i * 3 + 1] = 0.63
        col[i * 3 + 2] = 0.63
      } else {
        // Ivory
        col[i * 3] = 0.96
        col[i * 3 + 1] = 0.94
        col[i * 3 + 2] = 0.91
      }
    }
    return [pos, col]
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={5000}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={5000}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export function GalaxySection() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <StarMap />
      </Canvas>
    </div>
  )
}
