import React, { useRef, Suspense, useEffect } from "react";
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
  const fitted = useRef(false);

  useEffect(() => {
    fitted.current = false;
  }, [scene, url]);

  useFrame(() => {
    if (!groupRef.current) return;

    if (!fitted.current) {
      fitted.current = true;

      // Step 1: reset everything
      groupRef.current.scale.set(1, 1, 1);
      groupRef.current.position.set(0, 0, 0);
      groupRef.current.rotation.set(0, 0, 0);
      groupRef.current.updateMatrixWorld(true);

      // Step 2: measure raw mesh bounds
      const box = new THREE.Box3();
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.visible) {
          box.union(new THREE.Box3().setFromObject(child));
        }
      });

      if (box.isEmpty()) return;

      const size = box.getSize(new THREE.Vector3());

      // Step 3: scale to fit 2 units
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) groupRef.current.scale.setScalar(2 / maxDim);

      // Step 4: re-measure AFTER scaling so centering is in scaled space
      groupRef.current.updateMatrixWorld(true);
      const scaledBox = new THREE.Box3();
      groupRef.current.traverse((child) => {
        if (child.isMesh && child.visible) {
          scaledBox.union(new THREE.Box3().setFromObject(child));
        }
      });

      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());

      // Step 5: center on scaled bounds
      groupRef.current.position.set(
        -scaledCenter.x,
        -scaledCenter.y,
        -scaledCenter.z
      );

      // Step 6: fit camera
      const fovRad = (camera.fov * Math.PI) / 180;
      const fitDist = (1 / Math.tan(fovRad / 2)) * 1.6;

      camera.position.set(0, 0, fitDist);
      camera.near = fitDist * 0.001;
      camera.far = fitDist * 100;
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }

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
          dpr={[1, 1.5]}
          frameloop="always"
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