import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, Users2, Settings } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel"
      style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '500px', width: '90%' }}
    >
      <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>BUZZED</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>The Ultimate Party Game</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <button 
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.2rem' }}
          onClick={() => navigate('single')}
        >
          <Smartphone size={24} />
          Single Device Mode
        </button>

        <button 
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '1.2rem', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', boxShadow: '0 4px 15px rgba(5, 217, 232, 0.4)' }}
          onClick={() => navigate('multiplayer')}
        >
          <Users2 size={24} />
          Pass &amp; Play
        </button>

        <div style={{ margin: '1rem 0', height: '1px', background: 'var(--glass-border)' }}></div>

        <button 
          className="btn-secondary" 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
          onClick={() => navigate('editor')}
        >
          <Settings size={20} />
          Manage Cards
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
