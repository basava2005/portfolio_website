import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Torus, Octahedron, TorusKnot, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  rotationSpeed,
  scale,
  color,
  type,
  wireframe = true,
}: {
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  scale: number;
  color: string;
  type: "ico" | "torus" | "octa" | "knot";
  wireframe?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += rotationSpeed[0];
    ref.current.rotation.y += rotationSpeed[1];
    ref.current.rotation.z += rotationSpeed[2];
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.25;
  });

  const material = (
    <meshBasicMaterial color={color} wireframe={wireframe} transparent opacity={0.6} />
  );

  if (type === "ico") {
    return (
      <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
        {material}
      </Icosahedron>
    );
  }
  if (type === "torus") {
    return (
      <Torus ref={ref} args={[1, 0.32, 16, 64]} position={position} scale={scale}>
        {material}
      </Torus>
    );
  }
  if (type === "octa") {
    return (
      <Octahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
        {material}
      </Octahedron>
    );
  }
  return (
    <TorusKnot ref={ref} args={[0.8, 0.22, 96, 16]} position={position} scale={scale}>
      {material}
    </TorusKnot>
  );
}

function ParticleField({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7cffd4"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function Scene({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y += (x * 0.25 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-y * 0.18 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <FloatingShape
        position={[-3.4, 0.6, -1]}
        rotationSpeed={[0.0008, 0.0014, 0.0006]}
        scale={1.5}
        color="#7cffd4"
        type="ico"
      />
      <FloatingShape
        position={[3.6, -0.4, -2]}
        rotationSpeed={[0.0012, 0.0008, 0.001]}
        scale={1.1}
        color="#a78bfa"
        type="torus"
      />
      <FloatingShape
        position={[1.5, 2.4, -3]}
        rotationSpeed={[0.0006, 0.0012, 0.0004]}
        scale={0.7}
        color="#ff6b6b"
        type="octa"
      />
      <FloatingShape
        position={[-2.4, -2.2, -2]}
        rotationSpeed={[0.001, 0.0006, 0.0008]}
        scale={0.55}
        color="#7cffd4"
        type="knot"
      />
      <ParticleField count={isMobile ? 350 : 900} />
    </group>
  );
}

export default function ParticlesBackground() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsMobile(mq.matches);
      setReduced(rm.matches);
    };
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  if (reduced) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(124,255,212,0.15), transparent 55%), radial-gradient(circle at 80% 70%, rgba(167,139,250,0.12), transparent 50%), #050508",
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" data-testid="bg-particles">
      <Canvas
        dpr={[1, isMobile ? 1.25 : 1.75]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <Scene isMobile={isMobile} />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, transparent 30%, rgba(5,5,8,0.6) 70%, #050508 100%)",
        }}
      />
    </div>
  );
}
