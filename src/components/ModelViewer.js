import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// ── Model component ───────────────────────────────────────────────────────────
const Model = ({ url }) => {
  const absoluteUrl = url.startsWith("http")
    ? url
    : `${window.location.origin}${url}`;
  const { scene } = useGLTF(absoluteUrl);
  const groupRef = useRef();
  const { mouse, camera } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;
    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    groupRef.current.position.set(-center.x, -center.y, -center.z);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) {
      const scale = 2 / maxDim;
      groupRef.current.scale.setScalar(scale);
    }
    const fovRad = (45 * Math.PI) / 180;
    const fitDist = (2 / (2 * Math.tan(fovRad / 2))) * 1.4;
    camera.position.set(0, 0, fitDist);
    camera.near = 0.01;
    camera.far = fitDist * 200;
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x +=
      (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const ModelFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#FF4D1C" wireframe />
  </mesh>
);

class GLBErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <p className="font-mono text-xs text-ember">Failed to load model</p>
          <p className="font-mono text-xs text-slate">Check console for details</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const ModelViewer = ({ modelPath }) => {
  // ── Preload is called at the module level in src/preload.js —
  //    no need to repeat it here on every mount.
  return (
    <div className="relative w-full h-full">
      <GLBErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45, near: 0.01, far: 1000 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          // Cap DPR at 1.5 — no visual benefit higher for a model viewer
          dpr={[1, 1.5]}
          // frameloop="demand" renders only when something changes (mouse/orbit)
          // which eliminates idle GPU usage between interactions
          frameloop="demand"
          style={{ touchAction: "pan-y" }}
        >
          <ambientLight intensity={2.5} />
          <directionalLight position={[5, 10, 7]} intensity={3} />
          <directionalLight position={[-5, -5, -5]} intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={4} color="#ffffff" />
          <pointLight position={[-10, 5, 10]} intensity={2} color="#4DD8FF" />
          <pointLight position={[0, -10, 5]} intensity={1} color="#FF4D1C" />
          <hemisphereLight skyColor="#ffffff" groundColor="#222222" intensity={1.5} />
          <Environment preset="studio" />
          <Suspense fallback={<ModelFallback />}>
            <Model url={modelPath} />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={0.6}
            minDistance={0.5}
            maxDistance={20}
            enabled={true}
          />
        </Canvas>

        <div className="absolute bottom-4 left-0 right-0 hidden md:flex justify-center pointer-events-none">
          <span className="font-mono text-xs text-slate bg-void px-3 py-1.5 border border-border-dim">
            drag to rotate · scroll to zoom
          </span>
        </div>
      </GLBErrorBoundary>
    </div>
  );
};

export default ModelViewer;