import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1500 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { viewport } = useThree();

  const { positions, basePositions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const basePositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const indigo = new THREE.Color('#6366f1');
    const cyan = new THREE.Color('#06b6d4');
    const purple = new THREE.Color('#8b5cf6');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 6;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      basePositions[i * 3] = x;
      basePositions[i * 3 + 1] = y;
      basePositions[i * 3 + 2] = z;

      // Random color between indigo, cyan, purple
      const t = Math.random();
      const color =
        t < 0.4
          ? indigo.clone().lerp(cyan, Math.random())
          : t < 0.7
          ? cyan.clone().lerp(purple, Math.random())
          : purple.clone().lerp(indigo, Math.random());

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, basePositions, colors, sizes };
  }, [count]);

  const handlePointerMove = useCallback(
    (e: { clientX: number; clientY: number }) => {
      mouseRef.current.x =
        ((e.clientX / window.innerWidth) * 2 - 1) * (viewport.width / 2);
      mouseRef.current.y =
        (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2);
    },
    [viewport]
  );

  // Attach mouse listener
  useMemo(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handlePointerMove);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handlePointerMove);
      }
    };
  }, [handlePointerMove]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const time = Date.now() * 0.001;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Mouse repulsion
      const dx = arr[ix] - mouseX;
      const dy = arr[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsionRadius = 3;

      if (dist < repulsionRadius && dist > 0) {
        const force = (1 - dist / repulsionRadius) * 0.08;
        arr[ix] += (dx / dist) * force;
        arr[iy] += (dy / dist) * force;
      }

      // Gentle floating motion
      arr[iy] +=
        Math.sin(time * 0.3 + basePositions[ix] * 0.5) * 0.001;
      arr[ix] +=
        Math.cos(time * 0.2 + basePositions[iy] * 0.5) * 0.0005;

      // Spring back to base position
      const springStrength = 0.015;
      arr[ix] += (basePositions[ix] - arr[ix]) * springStrength;
      arr[iy] += (basePositions[iy] - arr[iy]) * springStrength;
      arr[iz] += (basePositions[iz] - arr[iz]) * springStrength;
    }

    posAttr.needsUpdate = true;

    // Slow rotation of the whole system
    pointsRef.current.rotation.z += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2.5}
        sizeAttenuation
        transparent
        opacity={0.7}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines({ count = 1500 }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points | null>(null);

  useFrame(() => {
    if (!linesRef.current) return;

    // Find the particles Points object by traversing the parent
    const parent = linesRef.current.parent;
    if (!parent) return;
    if (!pointsRef.current) {
      parent.traverse((child) => {
        if (child instanceof THREE.Points) {
          pointsRef.current = child;
        }
      });
    }
    if (!pointsRef.current) return;

    const positions = (
      pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    ).array as Float32Array;

    const linePositions = linesRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const lineArr = linePositions.array as Float32Array;
    const lineColors = linesRef.current.geometry.attributes
      .color as THREE.BufferAttribute;
    const colorArr = lineColors.array as Float32Array;

    let lineIndex = 0;
    const maxLines = 400;
    const threshold = 1.8;
    const checkCount = Math.min(count, 300); // Only check subset for performance

    for (let i = 0; i < checkCount && lineIndex < maxLines; i++) {
      for (
        let j = i + 1;
        j < checkCount && lineIndex < maxLines;
        j++
      ) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < threshold) {
          const opacity = 1 - dist / threshold;
          const li = lineIndex * 6;

          lineArr[li] = positions[i * 3];
          lineArr[li + 1] = positions[i * 3 + 1];
          lineArr[li + 2] = positions[i * 3 + 2];
          lineArr[li + 3] = positions[j * 3];
          lineArr[li + 4] = positions[j * 3 + 1];
          lineArr[li + 5] = positions[j * 3 + 2];

          const ci = lineIndex * 6;
          colorArr[ci] = 0.39 * opacity;
          colorArr[ci + 1] = 0.4 * opacity;
          colorArr[ci + 2] = 0.95 * opacity;
          colorArr[ci + 3] = 0.39 * opacity;
          colorArr[ci + 4] = 0.4 * opacity;
          colorArr[ci + 5] = 0.95 * opacity;

          lineIndex++;
        }
      }
    }

    // Zero out unused lines
    for (let i = lineIndex; i < maxLines; i++) {
      const li = i * 6;
      lineArr[li] = lineArr[li + 1] = lineArr[li + 2] = 0;
      lineArr[li + 3] = lineArr[li + 4] = lineArr[li + 5] = 0;
      colorArr[li] = colorArr[li + 1] = colorArr[li + 2] = 0;
      colorArr[li + 3] = colorArr[li + 4] = colorArr[li + 5] = 0;
    }

    linePositions.needsUpdate = true;
    lineColors.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
  });

  const maxLines = 400;
  const linePositions = useMemo(
    () => new Float32Array(maxLines * 6),
    []
  );
  const lineColors = useMemo(
    () => new Float32Array(maxLines * 6),
    []
  );

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={maxLines * 2}
          array={linePositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={maxLines * 2}
          array={lineColors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

export default function ParticleBackground() {
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;
  const particleCount = isMobile ? 600 : 1500;

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#020617']} />
      <Particles count={particleCount} />
      {!isMobile && <ConnectionLines count={particleCount} />}
    </Canvas>
  );
}
