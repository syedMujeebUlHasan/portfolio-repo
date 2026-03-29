import React, { useState } from "react";
import gsap from "gsap";

type AppIconProps =
  | {
      label: string;
      icon: React.ReactNode;
      imgSrc?: never;
      onClick?: () => void;
    }
  | { label: string; imgSrc: string; icon?: never; onClick?: () => void };

export default function AppIcon({
  label,
  icon,
  imgSrc,
  onClick,
}: AppIconProps) {
  const [active, setActive] = useState(false);

  // iOS-style bounce on click
  const handleClick = (e: any) => {
    setActive(true);

    gsap.fromTo(
      e.currentTarget,
      { scale: 1 },
      {
        scale: 1.25,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      },
    );

    setTimeout(() => setActive(false), 200);

    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center justify-center group"
    >
      {/* ICON */}
      <div
        className={`
          w-12 h-12 rounded-xl 
          flex items-center justify-center 
          text-white 
          bg-white/10 backdrop-blur-md
          transition-all duration-200
          
          group-hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]
          group-hover:scale-110
        `}
      >
        {icon ? icon : <img src={imgSrc} alt={label} className="w-6 h-6" />}
      </div>

      {/* LABEL */}
      <span className="text-[10px] text-white mt-1 opacity-80">{label}</span>
    </button>
  );
}
