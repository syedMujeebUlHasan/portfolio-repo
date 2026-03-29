import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useMemo } from "react";
import woodmap from "../assets/woodmap_diffuseOriginal.png";

// Correctly define the Interface
interface TabletModelProps {
  onSelect?: () => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
}

function TabletModel({ onSelect, ...props }: TabletModelProps) {
  // 1. Load the texture
  const woodTexture = useLoader(TextureLoader, woodmap);

  // 2. Use useMemo to create the material ONLY ONCE
  // This prevents memory leaks and performance drops
  const woodMaterial = useMemo(() => {
    // Configure texture properties inside the memo
    woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2, 2);
    woodTexture.colorSpace = THREE.SRGBColorSpace;

    return new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
  }, [woodTexture]);

  return (
    <group {...props}>
      {/* TABLE TOP */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        material={woodMaterial} // Use the material prop directly
      >
        <boxGeometry args={[6, 0.3, 4]} />
      </mesh>

      {/* LEGS */}
      {[
        [-2.5, -1.5, 1.5],
        [2.5, -1.5, 1.5],
        [-2.5, -1.5, -1.5],
        [2.5, -1.5, -1.5],
      ].map((pos, i) => (
        <mesh
          key={i}
          position={pos as [number, number, number]}
          castShadow
          receiveShadow
          material={woodMaterial} // Reuse the same material instance
        >
          <boxGeometry args={[0.3, 3, 0.3]} />
        </mesh>
      ))}
    </group>
  );
}

export default TabletModel;
