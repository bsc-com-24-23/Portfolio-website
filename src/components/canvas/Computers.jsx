import React, { Suspense, useEffect, useState, memo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import CanvasLoader from "../Loader";

const ComputerModel = ({ isMobile }) => {
  const { scene } = useGLTF(
    "/desktop_pc/scene.gltf", 
    undefined,
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/"); 
      loader.setDRACOLoader(dracoLoader);
    }
  );

  return (
    <group>
      {/* Lights */}
      <hemisphereLight intensity={0.25} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.2}
        castShadow
      />
      <pointLight intensity={1} />

      {/* Model */}
      <primitive
        object={scene}
        scale={isMobile ? 0.6 : 0.75} 
        position={isMobile ? [0, -2.2, -1.8] : [0, -3.25, -1.5]} 
        rotation={[-0.01, -0.2, -0.1]}
      />
    </group>
  );
};

const MemoizedComputerModel = memo(ComputerModel);

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    //set value on first render
    setIsMobile(mediaQuery.matches);

    const handleChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 1.5]} 
      camera={{ position: [15, 2, 5], fov: 30 }} 
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enablePan={false} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <MemoizedComputerModel isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
