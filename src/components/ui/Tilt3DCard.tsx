'use client';

import React, { useRef, useState, useCallback, ReactNode } from 'react';

interface Tilt3DCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // max tilt angle in degrees (e.g. 7)
  scale?: number; // slight scale up on hover (e.g. 1.02)
  glare?: boolean; // dynamic light reflection
  glareOpacity?: number;
  perspective?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.15,
  perspective = 1000,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to card (0 to 1)
      const mouseX = (e.clientX - rect.left) / width;
      const mouseY = (e.clientY - rect.top) / height;

      // Calculate tilt angles: centered at 0 (-0.5 to 0.5 -> -maxTilt to maxTilt)
      const tiltX = (0.5 - mouseY) * (maxTilt * 2);
      const tiltY = (mouseX - 0.5) * (maxTilt * 2);

      setRotate({ x: tiltX, y: tiltY });
      setGlarePos({ x: mouseX * 100, y: mouseY * 100 });
    },
    [maxTilt]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative preserve-3d transition-transform ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease-out',
        willChange: 'transform',
      }}
    >
      {/* Specular Glare / Light Sheen */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, ${glareOpacity}), transparent 75%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Children content with 3D preservation */}
      <div className="w-full h-full preserve-3d">
        {children}
      </div>
    </div>
  );
};
