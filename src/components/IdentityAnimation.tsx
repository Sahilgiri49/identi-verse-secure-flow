import React from 'react';
import { motion } from 'framer-motion';

interface IdentityAnimationProps {
  isVerifying?: boolean;
  isComplete?: boolean;
}

const IdentityAnimation: React.FC<IdentityAnimationProps> = ({
  isVerifying = false,
  isComplete = false,
}) => {
  const primaryColor = isComplete ? '#22c55e' : isVerifying ? '#06b6d4' : '#8b5cf6';
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-64 h-64 md:w-96 md:h-96"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Outer Ring - Using CSS animation instead of JS */}
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent animate-spin-slow"
          style={{
            background: `conic-gradient(from 0deg, ${primaryColor}22, ${primaryColor}44, ${primaryColor}22)`,
          }}
        />
        
        {/* Inner Ring - Using CSS animation instead of JS */}
        <div
          className="absolute inset-4 rounded-full border-4 border-transparent animate-spin-slow-reverse"
          style={{
            background: `conic-gradient(from 180deg, ${primaryColor}33, ${primaryColor}55, ${primaryColor}33)`,
          }}
        />

        {/* Core Circle */}
        <motion.div
          className="absolute inset-12 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at center, ${primaryColor}66, ${primaryColor}22)`,
            boxShadow: `0 0 40px ${primaryColor}44`
          }}
          animate={{
            scale: isVerifying ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: isVerifying ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Identity Icon */}
          <motion.svg
            viewBox="0 0 24 24"
            className="w-12 h-12 md:w-16 md:h-16"
            fill="none"
            stroke="white"
            strokeWidth={1.5}
            initial={{ opacity: 0.6 }}
            animate={{ 
              opacity: [0.6, 1, 0.6],
              scale: isComplete ? [1, 1.1, 1] : 1
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </motion.svg>
        </motion.div>

        {/* Floating Particles - Reduced from 6 to 3 for better performance */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: primaryColor,
              boxShadow: `0 0 10px ${primaryColor}`,
            }}
            initial={{
              x: Math.cos(i * 120 * (Math.PI / 180)) * 120,
              y: Math.sin(i * 120 * (Math.PI / 180)) * 120,
            }}
            animate={{
              x: [
                Math.cos(i * 120 * (Math.PI / 180)) * 120,
                Math.cos((i * 120 + 120) * (Math.PI / 180)) * 120,
                Math.cos(i * 120 * (Math.PI / 180)) * 120,
              ],
              y: [
                Math.sin(i * 120 * (Math.PI / 180)) * 120,
                Math.sin((i * 120 + 120) * (Math.PI / 180)) * 120,
                Math.sin(i * 120 * (Math.PI / 180)) * 120,
              ],
              scale: isVerifying ? [1, 1.5, 1] : 1,
              opacity: isVerifying ? [0.8, 1, 0.8] : 0.8,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.5, 1],
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default IdentityAnimation; 