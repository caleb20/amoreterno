import React, { useEffect, useState } from 'react';

export interface VisualEffectsProps {
  type: 'confetti' | 'hearts' | 'diploma' | 'flowers' | 'stars' | 'sparkles' | 'default';
  trigger: boolean;
  onComplete?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  life: number;
  maxLife: number;
  color?: string;
  emoji?: string;
}

const VisualEffects: React.FC<VisualEffectsProps> = ({ type, trigger, onComplete }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  const getEffectConfig = (effectType: string) => {
    switch (effectType) {
      case 'confetti':
        return {
          colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'],
          particleCount: 40,
          gravity: 0.3,
          initialVelocity: { min: 8, max: 15 },
          life: 180,
          shapes: ['circle', 'square', 'triangle']
        };
      case 'hearts':
        return {
          emojis: ['💖', '💝', '💕', '💗', '💘', '💓', '💟'],
          particleCount: 25,
          gravity: 0.15,
          initialVelocity: { min: 4, max: 8 },
          life: 200
        };
      case 'diploma':
        return {
          emojis: ['🎓', '📜', '🏆', '🥇', '⭐', '🌟', '✨'],
          particleCount: 20,
          gravity: 0.2,
          initialVelocity: { min: 5, max: 10 },
          life: 220
        };
      case 'flowers':
        return {
          emojis: ['🌸', '🌺', '🌼', '🌻', '🌹', '🌷', '🌿', '🍀'],
          particleCount: 30,
          gravity: 0.1,
          initialVelocity: { min: 3, max: 7 },
          life: 250
        };
      case 'stars':
        return {
          emojis: ['⭐', '🌟', '✨', '💫', '🌠', '⚡'],
          particleCount: 25,
          gravity: 0.05,
          initialVelocity: { min: 4, max: 9 },
          life: 200
        };
      case 'sparkles':
        return {
          emojis: ['✨', '💎', '🔸', '🔹', '💠', '🌟'],
          particleCount: 35,
          gravity: 0.08,
          initialVelocity: { min: 6, max: 12 },
          life: 180
        };
      default:
        return {
          emojis: ['🎉', '🎊', '✨', '🌟'],
          particleCount: 20,
          gravity: 0.2,
          initialVelocity: { min: 5, max: 10 },
          life: 200
        };
    }
  };

  const createParticle = (config: any, index: number): Particle => {
    const isEmoji = config.emojis && config.emojis.length > 0;
    const angle = (Math.PI * 2 * index) / config.particleCount + (Math.random() - 0.5) * 0.5;
    const velocity = config.initialVelocity.min + Math.random() * (config.initialVelocity.max - config.initialVelocity.min);
    
    return {
      id: index,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      scale: 0.5 + Math.random() * 1,
      opacity: 1,
      life: config.life,
      maxLife: config.life,
      color: config.colors ? config.colors[Math.floor(Math.random() * config.colors.length)] : undefined,
      emoji: isEmoji ? config.emojis[Math.floor(Math.random() * config.emojis.length)] : undefined
    };
  };

  useEffect(() => {
    if (!trigger) return;

    setIsActive(true);
    const config = getEffectConfig(type);
    const newParticles = Array.from({ length: config.particleCount }, (_, i) => 
      createParticle(config, i)
    );
    setParticles(newParticles);

    const animationId = setInterval(() => {
      setParticles(prevParticles => {
        const updatedParticles = prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98,
            vy: particle.vy + config.gravity,
            rotation: particle.rotation + particle.rotationSpeed,
            life: particle.life - 1,
            opacity: Math.max(0, particle.life / particle.maxLife)
          }))
          .filter(particle => particle.life > 0 && particle.y < window.innerHeight + 100);

        if (updatedParticles.length === 0) {
          setIsActive(false);
          onComplete?.();
        }

        return updatedParticles;
      });
    }, 16);

    return () => clearInterval(animationId);
  }, [trigger, type, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ overflow: 'hidden' }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg) scale(${particle.scale})`,
            opacity: particle.opacity,
            fontSize: particle.emoji ? '24px' : '12px',
            color: particle.color,
            transition: 'none',
            willChange: 'transform, opacity'
          }}
        >
          {particle.emoji || (
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: particle.color,
                borderRadius: particle.color ? '50%' : '2px'
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default VisualEffects;