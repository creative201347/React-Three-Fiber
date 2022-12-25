import {
  Box,
  CubeCamera,
  Environment,
  OrbitControls,
  Sphere,
  useEnvironment,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { ReactElement, ReactNode, useRef } from "react";
import { Group } from "three";
// import Debug from "./components/Debug";

function Rotator({ children }: { children: ReactNode }): ReactElement {
  const groupRef = useRef<Group>(null!);
  useFrame(() => {
    groupRef.current.children.forEach((child) => {
      if (child.isObject3D) {
        child.rotateX(0.02);
        child.rotateY(0.02);
      }
    });
  });

  return <group ref={groupRef}>{children}</group>;
}

function ReflectiveSphere() {
  const tweakAbleProperties = useControls({
    roughness: { value: 0.1, min: 0, max: 1 },
    metalness: { value: 1, min: 0, max: 1 },
  });

  return (
    <Sphere args={[1, 256, 256]}>
      <meshStandardMaterial {...tweakAbleProperties} />
    </Sphere>
  );
}

function ThreeSence() {
  // const envMap = useEnvironment({ files: "/modern_buildings_4k.hdr" });
  const envMap = useEnvironment({ files: "/dikhololo_night_4k.hdr" });

  return (
    <>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <pointLight position={[-3, -3, 2]} />
      <OrbitControls />

      <Environment map={envMap} background />

      <CubeCamera frames={1}>
        {/* @ts-ignore */}
        {(texture): Element => (
          <>
            <Environment map={texture} />
            <ReflectiveSphere />
          </>
        )}
      </CubeCamera>

      <Rotator>
        <Box position={[0, 0, 5]}>
          <meshStandardMaterial color="red" />
        </Box>

        <Box position={[-1, 3, 2]}>
          <meshStandardMaterial color="purple" />
        </Box>
      </Rotator>

      {/* <Environment map={envMap} background="only" /> */}
    </>
  );
}

function App() {
  return (
    <div className="bg-gray-900 h-screen">
      <ul className="text-white flex items-center space-x-6 z-10 absolute w-full py-2.5 top-5 left-5 inset-x-0">
        <li className="cursor-pointer hover:text-red-300">Home</li>
        <li className="cursor-pointer hover:text-red-300">About</li>
        <li className="cursor-pointer hover:text-red-300">Services</li>
        <li className="cursor-pointer hover:text-red-300">Contact</li>
      </ul>

      <div className="h-screen relative overflow-hidden">
        <Canvas>
          <ThreeSence />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
