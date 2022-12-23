import { Box, ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { button, folder, useControls } from "leva";
import { Avagado } from "./models";

function TweakableBox() {
  const [{ scale, color, wireframe, position }, set] = useControls(
    "Box",
    () => ({
      transform: folder({
        scale: {
          value: 1,
          min: 0.4,
          max: 4,
          step: 0.2,
        },
        position: [0, 0, 0],
      }),
      material: folder({
        color: "#333",
        wireframe: false,
      }),
      reset: button(() => {
        set({
          scale: 1,
          position: [0, 0, 0],
          color: "#333",
          wireframe: false,
        });
      }),
    })
  );

  return (
    <Box scale={scale} position={position}>
      <meshStandardMaterial color={color} wireframe={wireframe} />
    </Box>
  );
}

function ThreeScene() {
  return (
    <Canvas camera={{ position: [-3, 8, -6.5] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, -3, 2]} />

      <TweakableBox />

      <Float
        speed={1}
        rotationIntensity={1.3}
        position={[0, 0.1, 0]}
        floatIntensity={2}
      >
        <Avagado position={[-4, 0.3, -4]} />
      </Float>
      <ContactShadows position={[0, -0.3, 0]} blur={2.5} scale={20} far={20} />
      <OrbitControls />
    </Canvas>
  );
}

function App() {
  return (
    <div className="App h-screen bg-gray-900">
      <ThreeScene />
    </div>
  );
}

export default App;
