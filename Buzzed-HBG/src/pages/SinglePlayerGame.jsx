import { useNavigate } from 'react-router-dom';
import { useGameDeck } from '../hooks/useGameDeck';
import { getCardColor, getCardLabel } from '../utils/cardUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Square } from 'lucide-react';
import ReactPlayer from 'react-player';
import HotSeatWheel from '../components/HotSeatWheel';
import VirusOverlay from '../components/VirusOverlay';
import VirusBadge from '../components/VirusBadge';
import SfxToggle from '../components/SfxToggle';

const SinglePlayerGame = () => {
  const navigate = useNavigate();
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

  if (deck.length === 0) {
    return <div className="app-container">Loading cards...</div>;
  }

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
          players={[]}
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
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -100, rotate: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
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

      {activeViruses.length > 0 && (
        <motion.div
          className="virus-status-bar"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {activeViruses.map((virus) => (
            <div key={virus.id} className="virus-status-chip">
              🦠 {virus.virusDescription}
              <span className="rounds-left">{virus.roundsLeft}r</span>
            </div>
          ))}
        </motion.div>
      )}

    </div>
  );
};

export default SinglePlayerGame;
