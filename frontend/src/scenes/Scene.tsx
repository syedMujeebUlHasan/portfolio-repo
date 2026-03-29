import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useState } from "react";

import PhoneModel from "./Phone_model.tsx";
import TabletModel from "./Tablet_model.tsx";

export default function Scene() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Canvas
      shadows
      onPointerMissed={() => setSelected(null)} // click empty space = reset
      style={{
        background: "#f0f0f0",
        userSelect: "none",
        width: "100%",
        height: "100%",
      }}
    >
      {/* =========================
        LIGHTING
      ========================= */}
      <ambientLight intensity={0.5} />

      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, -2, -3]} intensity={0.4} />

      {/* =========================
        PHONE
      ========================= */}
      <PhoneModel onSelect={() => setSelected("phone")} />

      {/* UI for phone */}
      {selected === "phone" && (
        <Html center>
          <div
            style={{
              padding: "10px 15px",
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            Phone Selected
          </div>
        </Html>
      )}

      {/* =========================
        TABLET
      ========================= */}
      <TabletModel
        onSelect={() => setSelected("tablet")}
        position={[0, -1.5, 0]}
      />

      {/* UI for tablet */}
      {selected === "tablet" && (
        <Html center>
          <div
            style={{
              padding: "10px 15px",
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            📟 Tablet Selected
          </div>
        </Html>
      )}

      {/* =========================
        CONTROLS
      ========================= */}
      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
        maxAzimuthAngle={Math.PI / 8}
        minAzimuthAngle={-Math.PI / 8}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.3}
      />
    </Canvas>
  );
}

// <Canvas
//     shadows
//     style={{
//       background: "#f0f0f0",
//       userSelect: "none",
//       width: "100%",
//       height: "100%",
//     }}
//   >
//     {/* =========================
//       canvas lighting
//      ============================ */}
//     <ambientLight intensity={0.5} />
//     <directionalLight position={[5, 5, 5]} intensity={0.2} castShadow />
//     <directionalLight position={[-5, -2, -3]} intensity={0.8} />

//     {/* =========================
//      phone model
//      ============================ */}

//     <PhoneModel />

//     <TabletModel position={[0, -1.5, 0]} />

//     {/* =========================
//      canvas controls
//      ============================ */}
//     <OrbitControls
//       enablePan={false}
//       maxPolarAngle={Math.PI / 1.8}
//       minPolarAngle={Math.PI / 2.2}
//       maxAzimuthAngle={Math.PI / 8}
//       minAzimuthAngle={-Math.PI / 8}
//       enableDamping
//       dampingFactor={0.05}
//       rotateSpeed={0.3}
//     />
//   </Canvas>
