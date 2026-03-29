import { Box, Html } from "@react-three/drei";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { Mail, MessageCircle, Music } from "lucide-react";
import github_icon from "../assets/github_icon.svg";
import linkedin_icon from "../assets/linkedin_icon.svg";
import playstore_icon from "../assets/play_store_icon.svg";
import AppIcon from "../components/AppIcon.tsx";

// Define the Props type for clarity
interface PhoneModelProps {
  onSelect?: () => void;
}

function PhoneModel({ onSelect }: PhoneModelProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());

  const lockRef = useRef<HTMLDivElement>(null);
  const appWindowRef = useRef<HTMLDivElement>(null);

  // App Controls
  const openApp = (appName: string) => setActiveApp(appName);
  const closeApp = () => setActiveApp(null);

  // Real-time clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Animations
  useEffect(() => {
    if (activeApp && appWindowRef.current) {
      gsap.fromTo(
        appWindowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [activeApp]);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formatDate = (date: Date) =>
    date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  const renderScreen = () => {
    if (!unlocked) {
      return (
        <div
          ref={lockRef}
          className="flex flex-col items-center justify-center h-full text-black bg-white/80 backdrop-blur-sm"
        >
          <h1 className="text-xl font-bold">Locked</h1>
          <p className="text-xs opacity-70 mt-1">Tap to unlock</p>
          <button
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setUnlocked(true);
            }}
          >
            Unlock
          </button>
        </div>
      );
    }

    if (activeApp) {
      return (
        <div
          ref={appWindowRef}
          className="absolute inset-0 bg-slate-900 text-white p-3 flex flex-col rounded-xl"
        >
          <button
            className="text-xs mb-2 opacity-70 text-left"
            onClick={closeApp}
          >
            ← Back
          </button>
          <div className="flex-1 flex items-center justify-center text-lg font-mono">
            {activeApp.toUpperCase()}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-gray-100 p-2">
        <div className="text-black text-[10px] flex justify-between items-center font-bold px-1">
          <span>{formatDate(time)}</span>
          <span>{formatTime(time)}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6">
          <AppIcon
            label="Mail"
            icon={<Mail size={16} />}
            onClick={() => openApp("mail")}
          />
          <AppIcon
            label="Chat"
            icon={<MessageCircle size={16} />}
            onClick={() => openApp("chat")}
          />
          <AppIcon
            label="Store"
            imgSrc={playstore_icon}
            onClick={() => openApp("video")}
          />
          <AppIcon
            label="LinkedIn"
            imgSrc={linkedin_icon}
            onClick={() => openApp("music")}
          />
          <AppIcon
            label="Github"
            imgSrc={github_icon}
            onClick={() => openApp("photos")}
          />
          <AppIcon
            label="Music"
            icon={<Music size={16} />}
            onClick={() => openApp("Music")}
          />
        </div>

        <div className="mt-auto flex justify-center pb-1">
          <div className="w-12 h-1 bg-gray-400 rounded-full" />
        </div>
      </div>
    );
  };

  return (
    <group>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        castShadow
        args={[2, 4, 0.2]}
      >
        <meshStandardMaterial color="#ff8c00" metalness={0.4} roughness={0.3} />

        {/* The Screen */}
        <Html
          transform
          position={[0, 0, 0.11]}
          scale={0.45} // Scales the CSS pixels down to 3D world units
          occlude="blending" // Makes it hide behind 3D objects if rotated
        >
          {/* Use pointer-events-auto to ensure clicks hit the HTML buttons */}
          <div
            className="w-[250px] h-[450px] bg-white rounded-2xl flex flex-col relative overflow-hidden shadow-2xl select-none pointer-events-auto"
            onPointerDown={(e) => e.stopPropagation()} // Prevents OrbitControls from moving when clicking phone
          >
            {renderScreen()}
          </div>
        </Html>
      </Box>
    </group>
  );
}

export default PhoneModel;
