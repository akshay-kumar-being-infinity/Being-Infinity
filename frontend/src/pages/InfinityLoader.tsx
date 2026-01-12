import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef } from "react";

/* ---- Curve ---- */
class InfinityCurve extends THREE.Curve<THREE.Vector3> {
  constructor() {
    super();
  }

  getPoint(t: number, target = new THREE.Vector3()) {
    const a = 1.6;
    const ang = t * Math.PI * 2;

    const x = a * Math.cos(ang);
    const y = a * Math.sin(ang) * Math.cos(ang);
    const z = 0;

    return target.set(x, y, z);
  }
}

/* ---- Mesh ---- */
function InfinityMesh() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(new InfinityCurve(), 500, 0.18, 48, true),
    []
  );

  useFrame((state) => {
    if (!mesh.current || !material.current) return;

    const t = state.clock.elapsedTime;

    // Slow, clear loop rotation
    mesh.current.rotation.y = t * 0.4;

    // Animate emissive flow
    material.current.emissiveIntensity =
      0.6 + Math.sin(t * 3) * 0.25;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshPhysicalMaterial
        ref={material}
        transmission={0.9}
        roughness={0.05}
        thickness={0.4}
        ior={1.15}
        emissive={new THREE.Color("#6c7cff")}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

/* ---- Loader ---- */
export default function Infini() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(circle at top, #f5f7ff 0%, #e3e8ff 45%, #c9d2ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 5, 5]} intensity={2.4} />
        <directionalLight position={[-6, -4, 5]} intensity={1.6} />
        <pointLight position={[0, 0, 6]} intensity={1.5} />

        <Environment preset="studio" />

        <InfinityMesh />
      </Canvas>
    </div>
  );
}
