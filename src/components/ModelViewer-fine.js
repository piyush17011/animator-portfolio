import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

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

    // Pull camera back further — multiply by 3.0 instead of 2.2
    // so model appears more zoomed out on first load
    const fovRad = (45 * Math.PI) / 180;
    const fitDist = (2 / (2 * Math.tan(fovRad / 2))) * 3.0;
    camera.position.set(0, 0, fitDist);
    camera.near = 0.01;
    camera.far = fitDist * 200;
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.x * 1.0 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (-mouse.y * 0.4 - groupRef.current.rotation.x) * 0.05;
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
  // Track if user is touching the canvas — used to
  // disable page scroll while interacting with model
  const [isTouching, setIsTouching] = useState(false);

  return (
    <GLBErrorBoundary>
      {/* Touch hint shown on mobile */}
      <div className="absolute top-3 right-3 z-10 md:hidden">
        <span className="font-mono text-xs text-slate bg-void px-2 py-1 border border-border-dim">
          pinch · drag to rotate
        </span>
      </div>

      {/* Scroll-blocking overlay on mobile ONLY when not touching the model.
          This lets the page scroll normally when swiping PAST the canvas,
          but lets the user interact when they intentionally tap the canvas */}
      {!isTouching && (
        <div
          className="absolute inset-0 z-20 md:hidden"
          onTouchStart={() => setIsTouching(true)}
          style={{ background: "transparent" }}
        />
      )}

      {/* Tap-to-interact button shown on mobile when overlay is active */}
      {!isTouching && (
        <div
          className="absolute inset-0 z-30 md:hidden flex items-center justify-center pointer-events-none"
        >
          <span className="font-mono text-xs text-ember bg-void px-4 py-2 border border-ember border-opacity-50">
            tap to interact with model
          </span>
        </div>
      )}

      {/* Close / re-lock button shown when user has unlocked the model */}
      {isTouching && (
        <button
          className="absolute top-3 right-3 z-30 md:hidden font-mono text-xs text-slate bg-void px-3 py-1.5 border border-border-dim"
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsTouching(false);
          }}
        >
          ✕ done
        </button>
      )}

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.01, far: 1000 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 1.5]}
        style={{
          // On mobile, only capture touch events when user has tapped to interact
          touchAction: isTouching ? "none" : "pan-y",
        }}
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
          autoRotateSpeed={1.0}
          minDistance={0.5}
          maxDistance={20}
          // On mobile, only enable when user has tapped to interact
          enabled={isTouching || window.matchMedia("(hover: hover)").matches}
        />
      </Canvas>
    </GLBErrorBoundary>
  );
};

export default ModelViewer;
