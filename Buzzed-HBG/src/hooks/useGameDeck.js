import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/useGame';
import { useAudioManager } from '../context/useAudioManager';

const fisherYatesShuffle = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameDeck = () => {
  const { cards } = useGame();
  const { playSwipe, playFinish } = useAudioManager();
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHotSeat, setShowHotSeat] = useState(false);
  const [showVirusOverlay, setShowVirusOverlay] = useState(false);
  const [currentVirusCard, setCurrentVirusCard] = useState(null);
  const [activeViruses, setActiveViruses] = useState([]);
  const [audioStopped, setAudioStopped] = useState(false);
  const initialCardHandled = useRef(false);

  useEffect(() => {
    if (cards && cards.length > 0) {
      const shuffled = fisherYatesShuffle(cards);
      /* eslint-disable react-hooks/set-state-in-effect */
      setDeck(shuffled);
      setCurrentIndex(0);
      /* eslint-enable react-hooks/set-state-in-effect */
      initialCardHandled.current = false;
    }
  }, [cards]);

  // Clear viruses on unmount (game session ends)
  useEffect(() => {
    return () => setActiveViruses([]);
  }, []);

  const handleSpecialCard = (card) => {
    if (card.type === 'hot_seat') {
      setShowHotSeat(true);
    } else if (card.type === 'virus') {
      setCurrentVirusCard(card);
      setShowVirusOverlay(true);
    }
  };

  useEffect(() => {
    if (deck.length > 0 && !initialCardHandled.current) {
      initialCardHandled.current = true;
      handleSpecialCard(deck[0]);
    }
  }, [deck]);

  const infectPlayer = (virus) => {
    const newVirus = {
      id: crypto.randomUUID(),
      effect: virus.virusEffect,
      virusDescription: virus.virusDescription,
      roundsLeft: virus.virusRounds,
      totalRounds: virus.virusRounds,
      text: virus.text,
    };
    setActiveViruses(prev => [...prev, newVirus]);
    return newVirus;
  };

  const tickViruses = () => {
    setActiveViruses(prev =>
      prev
        .map(v => ({ ...v, roundsLeft: v.roundsLeft - 1 }))
        .filter(v => v.roundsLeft > 0)
    );
  };

  const nextCard = () => {
    if (showHotSeat || showVirusOverlay) return;

    tickViruses();
    playSwipe();

    setAudioStopped(false);

    if (currentIndex < deck.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      handleSpecialCard(deck[nextIdx]);
    } else {
      playFinish();
      const shuffled = fisherYatesShuffle(cards);
      setDeck(shuffled);
      setCurrentIndex(0);
      handleSpecialCard(shuffled[0]);
    }
  };

  const stopAudio = () => setAudioStopped(true);

  const onVirusComplete = () => {
    infectPlayer(currentVirusCard);
    setShowVirusOverlay(false);
    setCurrentVirusCard(null);
  };

  return {
    deck,
    currentIndex,
    currentCard: deck[currentIndex] ?? null,
    showHotSeat,
    setShowHotSeat,
    showVirusOverlay,
    currentVirusCard,
    onVirusComplete,
    nextCard,
    activeViruses,
    audioStopped,
    stopAudio,
  };
};
