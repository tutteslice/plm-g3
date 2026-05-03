import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameDeck } from '../hooks/useGameDeck';
import { getCardColor, getCardLabel } from '../utils/cardUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Plus, Trash2, Square } from 'lucide-react';
import ReactPlayer from 'react-player';
import HotSeatWheel from '../components/HotSeatWheel';
import VirusOverlay from '../components/VirusOverlay';
import VirusBadge from '../components/VirusBadge';
import SfxToggle from '../components/SfxToggle';

const MultiplayerGame = () => {
  const navigate = useNavigate();

  const [gameStarted, setGameStarted] = useState(false);
  const [players, setPlayers] = useState([]);
  const [nameInput, setNameInput] = useState('');

  const {
    deck,
    currentIndex,
    currentCard,
    showHotSeat,
    setShowHotSeat,
    showVirusOverlay,
    currentVirusCard,
    onVirusComplete,
    nextCard,
    activeViruses,
    audioStopped,
    stopAudio,
  } = useGameDeck();

  const addPlayer = (e) => {
    e.preventDefault();
    const name = nameInput.trim();
    if (!name || players.length >= 10) return;
    setPlayers(prev => [...prev, { id: crypto.randomUUID(), name }]);
    setNameInput('');
  };

  const removePlayer = (id) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  const startGame = () => {
    if (players.length < 2) return;
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="page-setup">
        <button className="btn-back" onClick={() => navigate('..')} style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
          <ArrowLeft size={24} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel"
          style={{ padding: '2rem', textAlign: 'center' }}
        >
          <Users size={48} color="var(--accent-cyan)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Pass &amp; Play</h2>
          <p className="setup-subtitle">
            Everyone shares one device. Add 2–10 players to get started.
          </p>

          <form onSubmit={addPlayer} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              placeholder="Player name"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              maxLength={20}
              className="text-input"
            />
            <button
              type="submit"
              className="btn-primary"
              disabled={!nameInput.trim() || players.length >= 10}
              style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center' }}
            >
              <Plus size={20} />
            </button>
          </form>

          {players.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
              {players.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="player-list-item"
                >
                  <span className="player-list-item__name">{i + 1}. {p.name}</span>
                  <button className="btn-remove" onClick={() => removePlayer(p.id)}>
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%' }}
            onClick={startGame}
            disabled={players.length < 2}
          >
            {players.length < 2
              ? `Add ${2 - players.length} more player${players.length === 1 ? '' : 's'}`
              : `Start Game — ${players.length} Players`}
          </button>
        </motion.div>
      </div>
    );
  }

  if (deck.length === 0) return <div>Loading...</div>;

  return (
    <div className="page-fullscreen">

      {currentCard?.audio && !audioStopped && (
        <ReactPlayer
          key={currentCard.audio}
          src={currentCard.audio}
          playing
          width="1"
          height="1"
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0, pointerEvents: 'none' }}
          onError={(e) => console.log('ReactPlayer error:', e)}
        />
      )}

      {currentCard?.audio && !audioStopped && (
        <button
          className="stop-song-btn"
          onClick={(e) => { e.stopPropagation(); stopAudio(); }}
        >
          <Square size={14} fill="currentColor" /> Stop Song
        </button>
      )}

      {showHotSeat && (
        <HotSeatWheel
          players={players}
          cardText={currentCard.text.replace('🔥 HOT SEAT! Spin the wheel! ', '')}
          onComplete={() => setShowHotSeat(false)}
        />
      )}

      {showVirusOverlay && currentVirusCard && (
        <VirusOverlay
          virusCard={currentVirusCard}
          onComplete={onVirusComplete}
        />
      )}

      <VirusBadge viruses={activeViruses} />

      <div className="game-header">
        <button className="btn-back" onClick={() => navigate('..')}>
          <ArrowLeft size={24} /> Leave
        </button>
        <div className="header-right">
          <SfxToggle />
          <span className="card-counter">{currentIndex + 1} / {deck.length}</span>
        </div>
      </div>

      <div className="card-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ duration: 0.3 }}
            className="glass-panel game-card"
            onClick={nextCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderColor: getCardColor(currentCard.type) }}
          >
            <div className="card-type-badge" style={{ color: getCardColor(currentCard.type) }}>
              {getCardLabel(currentCard.type)}
            </div>

            <div className="card-text">
              {currentCard.text}
            </div>

            <div className="card-action">
              {currentCard.amount ? `${currentCard.amount} ${currentCard.amount > 1 ? 'Sips' : 'Sip'}` : currentCard.action}
            </div>

            <div className="card-hint">
              {currentCard.type === 'hot_seat' ? 'Tap to spin the wheel!' : 'Tap anywhere for next card'}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="players-bar">
        <Users size={16} />
        <span>{players.map(p => p.name).join(' · ')}</span>
      </div>

    </div>
  );
};

export default MultiplayerGame;
