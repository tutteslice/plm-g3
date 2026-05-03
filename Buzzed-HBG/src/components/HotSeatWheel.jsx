import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioManager } from '../context/useAudioManager';

const WHEEL_COLORS = [
  '#ff2a6d', '#b026ff', '#05d9e8', '#ff6b35',
  '#f7c948', '#ff2a6d', '#b026ff', '#05d9e8',
  '#ff6b35', '#f7c948', '#ff2a6d', '#b026ff',
];

const HotSeatWheel = ({ players = [], onComplete, cardText }) => {
  const [phase, setPhase] = useState('spinning'); // spinning | reveal
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const canvasRef = useRef(null);
  const isMultiplayer = players.length > 0;
  const { playTick, playDing } = useAudioManager();

  // Pre-calculate random values once per mount so they are stable across renders
  /* eslint-disable react-hooks/purity */
  const totalRotation = useMemo(() => 1440 + Math.random() * 1440, []);
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        duration: 1 + Math.random(),
        delay: Math.random() * 0.3,
        color: WHEEL_COLORS[i % WHEEL_COLORS.length],
      })),
    []
  );
  /* eslint-enable react-hooks/purity */

  const vibrate = (pattern) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  useEffect(() => {
    const spinDuration = 4000;

    const vibrateInterval = setInterval(() => {
      vibrate(50);
      playTick();
    }, 200);

    const timer = setTimeout(() => {
      clearInterval(vibrateInterval);
      vibrate([100, 50, 100, 50, 200]);
      playDing();

      if (isMultiplayer) {
        const normalizedAngle = totalRotation % 360;
        const segmentAngle = 360 / players.length;
        const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
        setSelectedPlayer(players[selectedIndex % players.length]);
      }

      setTimeout(() => setPhase('reveal'), 600);
    }, spinDuration);

    return () => {
      clearTimeout(timer);
      clearInterval(vibrateInterval);
    };
  }, [isMultiplayer, players, totalRotation, playTick, playDing]);

  // Draw the static wheel on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const displaySize = 300;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    canvas.style.width = displaySize + 'px';
    canvas.style.height = displaySize + 'px';
    ctx.scale(dpr, dpr);

    const center = displaySize / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, displaySize, displaySize);

    if (isMultiplayer) {
      const segmentAngle = (2 * Math.PI) / players.length;
      players.forEach((player, i) => {
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, i * segmentAngle - Math.PI / 2, (i + 1) * segmentAngle - Math.PI / 2);
        ctx.closePath();
        ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(i * segmentAngle + segmentAngle / 2 - Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.font = `bold ${Math.min(18, 120 / players.length)}px 'Outfit', sans-serif`;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        const name = player.name || player;
        ctx.fillText(name.length > 8 ? name.slice(0, 8) + '…' : name, radius * 0.6, 0);
        ctx.restore();
      });
    } else {
      const segments = 12;
      const segmentAngle = (2 * Math.PI) / segments;
      for (let i = 0; i < segments; i++) {
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.arc(center, center, radius, i * segmentAngle - Math.PI / 2, (i + 1) * segmentAngle - Math.PI / 2);
        ctx.closePath();
        ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(center, center, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a2e';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '18px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText('🔥', center, center);
  }, [isMultiplayer, players]);

  return (
    <AnimatePresence>
      <motion.div
        className="hot-seat-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {phase === 'spinning' && (
          <motion.div className="hot-seat-content">
            <motion.h2
              className="hot-seat-title"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              🔥 HOT SEAT 🔥
            </motion.h2>

            <div className="wheel-container">
              <div className="wheel-static">
                <canvas ref={canvasRef} className="wheel-canvas" />
              </div>

              <motion.div
                className="wheel-arrow-spinner"
                initial={{ rotate: 0 }}
                animate={{ rotate: totalRotation }}
                transition={{ duration: 4, ease: [0.15, 0.85, 0.25, 1] }}
              >
                <div className="wheel-arrow-pointer" />
              </motion.div>
            </div>

            <p className="hot-seat-subtitle">
              {isMultiplayer ? 'Who will it be...?' : 'Where will it point...?'}
            </p>
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            className="hot-seat-reveal"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="hot-seat-screen-shake"
              animate={{ x: [0, -5, 5, -3, 3, 0], y: [0, 3, -3, 2, -2, 0] }}
              transition={{ duration: 0.5 }}
            >
              {isMultiplayer && selectedPlayer && (
                <motion.div
                  className="hot-seat-player-name"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                >
                  {selectedPlayer.name || selectedPlayer}
                </motion.div>
              )}

              <motion.div
                className="hot-seat-badge"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                🔥 YOU&apos;RE IN THE HOT SEAT 🔥
              </motion.div>

              <motion.p
                className="hot-seat-prompt"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {cardText}
              </motion.p>

              <motion.button
                className="btn-primary hot-seat-continue"
                onClick={onComplete}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {phase === 'reveal' && (
          <div className="hot-seat-particles">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{ x: p.x, y: p.y, scale: 0, opacity: 0 }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                style={{ background: p.color }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default HotSeatWheel;
