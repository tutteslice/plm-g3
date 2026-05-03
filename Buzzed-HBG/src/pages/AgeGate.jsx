import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/useGame';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AgeGate = () => {
  const { verifyAge } = useGame();
  const navigate = useNavigate();

  const handleVerify = () => {
    verifyAge();
    navigate('..');
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel" 
      style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '400px', width: '90%' }}
    >
      <ShieldAlert size={64} color="var(--accent-pink)" style={{ marginBottom: '1.5rem' }} />
      <h1 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Are you 18 or older?</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.5' }}>
        This game contains mature themes, alcohol references, and requires all players to be of legal drinking age in their respective country (18+ in Sweden).
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn-primary" onClick={handleVerify}>
          Yes, I am 18+
        </button>
        <button className="btn-secondary" onClick={handleDecline}>
          No, I am under 18
        </button>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2rem', opacity: 0.6 }}>
        Please drink responsibly. Do not drink and drive.
      </p>
    </motion.div>
  );
};

export default AgeGate;
