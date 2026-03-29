import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Html } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Mail,
  MessageCircle,
  Play,
  Music,
  Image,
  ShoppingBag,
} from "lucide-react";
import AppIcon from "../components/AppIcon.tsx";

export default function Scene() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);

  const lockRef = useRef<HTMLDivElement>(null);
  const appWindowRef = useRef<HTMLDivElement>(null);

  // =========================
  // 🎮 APP CONTROLS
  // =========================
  const openApp = (appName: string) => {
    setActiveApp(appName);
  };

  const closeApp = () => {
    setActiveApp(null);
  };

  // =========================
  // 🎬 APP ANIMATION
  // =========================
  useEffect(() => {
    if (activeApp && appWindowRef.current) {
      gsap.fromTo(
        appWindowRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
        },
      );
    }
  }, [activeApp]);

  // =========================
  // 🔓 LOCK ANIMATION
  // =========================
  useEffect(() => {
    if (!unlocked && lockRef.current) {
      gsap.fromTo(
        lockRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      );
    }
  }, [unlocked]);

  // =========================
  // 📱 RENDER SCREEN LOGIC
  // =========================
  const renderScreen = () => {
    // 🔒 LOCK SCREEN
    if (!unlocked) {
      return (
        <div
          ref={lockRef}
          className="flex flex-col items-center justify-center h-full text-black"
        >
          <h1 className="text-xl font-bold">Locked</h1>
          <p className="text-xs opacity-70 mt-1">Tap to unlock</p>

          <button
            className="mt-4 px-3 py-1 bg-black text-white rounded"
            onClick={() => setUnlocked(true)}
          >
            Unlock
          </button>
        </div>
      );
    }

    // 📱 APP SCREEN
    if (activeApp) {
      return (
        <div
          ref={appWindowRef}
          className="absolute inset-0 bg-black text-white p-3 flex flex-col rounded-xl"
        >
          <button className="text-xs mb-2 opacity-70" onClick={closeApp}>
            ← Back
          </button>

          <div className="flex-1 flex items-center justify-center text-lg">
            {activeApp.toUpperCase()} APP
          </div>
        </div>
      );
    }

    // 🏠 HOME SCREEN
    return (
      <>
        {/* status bar */}
        <div className="text-black text-xs flex justify-between">
          <span>9:41</span>
          <span>🔋 📶</span>
        </div>

        {/* app grid */}
        <div className="grid grid-cols-3 gap-3 mt-10">
          <AppIcon
            label="Mail"
            icon={<Mail size={18} />}
            onClick={() => openApp("mail")}
          />
          <AppIcon
            label="Chat"
            icon={<MessageCircle size={18} />}
            onClick={() => openApp("chat")}
          />
          <AppIcon
            label="Video"
            icon={<Play size={18} />}
            onClick={() => openApp("video")}
          />
          <AppIcon
            label="Music"
            icon={<Music size={18} />}
            onClick={() => openApp("music")}
          />
          <AppIcon
            label="Photos"
            icon={<Image size={18} />}
            onClick={() => openApp("photos")}
          />
          <AppIcon
            label="Store"
            icon={<ShoppingBag size={18} />}
            onClick={() => openApp("store")}
          />
        </div>

        {/* home bar */}
        <div className="mt-auto flex justify-center">
          <div className="w-20 h-1 bg-gray-500 rounded-full" />
        </div>
      </>
    );
  };

  // =========================
  // 🎨 RENDER
  // =========================
  return (
    <Canvas style={{ background: "#f0f0f0" }}>
      {/* lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.2} />
      <directionalLight position={[-5, -2, -3]} intensity={0.8} />

      {/* phone */}
      <Box args={[2, 4, 0.2]}>
        <meshStandardMaterial color="#ff8c00" metalness={0.4} roughness={0.3} />

        {/* screen */}
        <Html transform position={[0, 0, 0.11]}>
          <div className="w-[180px] h-[320px] bg-gray-200 rounded-xl p-3 flex flex-col relative overflow-hidden">
            {renderScreen()}
          </div>
        </Html>
      </Box>

      {/* controls */}
      <OrbitControls
        enablePan={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.2}
        maxAzimuthAngle={Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
