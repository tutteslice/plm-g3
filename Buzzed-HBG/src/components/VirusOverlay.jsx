import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioManager } from '../context/useAudioManager';

const VirusOverlay = ({ virusCard, onComplete }) => {
  const { playGlitch } = useAudioManager();

  useEffect(() => {
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 400]);
    }
    playGlitch();

    // Auto-dismiss after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete, playGlitch]);

  return (
    <AnimatePresence>
      <motion.div
        className="virus-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onComplete}
      >
        {/* Ripple rings */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="virus-ripple"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3 + i, opacity: 0 }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              ease: 'easeOut',
              repeat: 0,
            }}
          />
        ))}

        {/* Biohazard icon */}
        <motion.div
          className="virus-icon"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 12,
            delay: 0.3,
          }}
        >
          ☣️
        </motion.div>

        {/* Infected text with glitch */}
        <motion.div
          className="virus-infected-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span className="glitch-text" data-text="INFECTED!">INFECTED!</span>
        </motion.div>

        {/* Virus description */}
        <motion.p
          className="virus-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {virusCard.text}
        </motion.p>

        {/* Rounds indicator */}
        <motion.div
          className="virus-rounds"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6 }}
        >
          <span className="virus-rounds-number">{virusCard.virusRounds}</span>
          <span className="virus-rounds-label">rounds</span>
        </motion.div>

        {/* Tap to continue */}
        <motion.p
          className="virus-tap-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5 }}
        >
          Tap anywhere to continue
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default VirusOverlay;
