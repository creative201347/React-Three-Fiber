import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    food_avocado_01: THREE.Mesh;
  };
  materials: {
    food_avocado_01: THREE.MeshStandardMaterial;
  };
};

export function Avagado(props: JSX.IntrinsicElements["group"]) {
  // @ts-ignore
  const { nodes, materials } = useGLTF(
    "/avocado/food_avocado_01_4k.gltf"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} scale={10}>
      <mesh
        geometry={nodes.food_avocado_01.geometry}
        material={materials.food_avocado_01}
      />
    </group>
  );
}

useGLTF.preload("/avocado/food_avocado_01_4k.gltf");
