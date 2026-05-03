import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VirusBadge = ({ viruses = [] }) => {
  const [expanded, setExpanded] = useState(false);

  if (viruses.length === 0) return null;

  return (
    <motion.div
      className="virus-badge-container"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="virus-badge-trigger"
        onClick={() => setExpanded(!expanded)}
        animate={{
          boxShadow: [
            '0 0 8px rgba(57, 255, 20, 0.4)',
            '0 0 20px rgba(57, 255, 20, 0.8)',
            '0 0 8px rgba(57, 255, 20, 0.4)',
          ],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <span className="virus-badge-icon">☣️</span>
        <span className="virus-badge-count">{viruses.length}</span>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="virus-badge-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
          >
            <div className="virus-badge-header">Active Viruses</div>
            {viruses.map((virus, i) => (
              <motion.div
                key={virus.id || i}
                className="virus-badge-item"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="virus-badge-item-name">
                  🦠 {virus.virusDescription || virus.effect}
                </div>
                <div className="virus-badge-item-rounds">
                  {virus.roundsLeft} {virus.roundsLeft === 1 ? 'round' : 'rounds'} left
                </div>
                <div className="virus-badge-item-bar">
                  <motion.div
                    className="virus-badge-item-bar-fill"
                    initial={{ width: '100%' }}
                    style={{
                      width: `${(virus.roundsLeft / virus.totalRounds) * 100}%`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VirusBadge;
