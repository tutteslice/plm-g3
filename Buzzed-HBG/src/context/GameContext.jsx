import { useState } from 'react';
import defaultCards from '../data/cards.json';
import { GameContext } from './GameContextInstance';

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      alert('Storage is full. Remove some custom audio cards to free up space.');
    }
    return false;
  }
};

const loadInitialCards = () => {
  const CURRENT_VERSION = '1.3';
  const storedVersion = localStorage.getItem('buzzed_cards_version');

  if (storedVersion !== CURRENT_VERSION) {
    safeSetItem('buzzed_custom_cards', JSON.stringify(defaultCards));
    safeSetItem('buzzed_cards_version', CURRENT_VERSION);
    return defaultCards;
  }

  const storedCards = localStorage.getItem('buzzed_custom_cards');
  if (storedCards) {
    try {
      return JSON.parse(storedCards);
    } catch {
      return defaultCards;
    }
  }

  safeSetItem('buzzed_custom_cards', JSON.stringify(defaultCards));
  return defaultCards;
};

export const GameProvider = ({ children }) => {
  const [cards, setCards] = useState(loadInitialCards);
  const [isAgeVerified, setIsAgeVerified] = useState(
    () => localStorage.getItem('buzzed_age_verified') === 'true'
  );

  const verifyAge = () => {
    setIsAgeVerified(true);
    safeSetItem('buzzed_age_verified', 'true');
  };

  const addCard = (newCard) => {
    const updatedCards = [...cards, { ...newCard, id: crypto.randomUUID() }];
    const saved = safeSetItem('buzzed_custom_cards', JSON.stringify(updatedCards));
    if (saved) setCards(updatedCards);
  };

  const updateCard = (updatedCard) => {
    const updatedCards = cards.map(c => c.id === updatedCard.id ? updatedCard : c);
    const saved = safeSetItem('buzzed_custom_cards', JSON.stringify(updatedCards));
    if (saved) setCards(updatedCards);
  };

  const deleteCard = (id) => {
    const updatedCards = cards.filter(c => c.id !== id);
    setCards(updatedCards);
    safeSetItem('buzzed_custom_cards', JSON.stringify(updatedCards));
  };

  const resetToDefault = () => {
    setCards(defaultCards);
    safeSetItem('buzzed_custom_cards', JSON.stringify(defaultCards));
    safeSetItem('buzzed_cards_version', '1.3');
  };

  return (
    <GameContext.Provider value={{
      cards,
      isAgeVerified,
      verifyAge,
      addCard,
      updateCard,
      deleteCard,
      resetToDefault,
    }}>
      {children}
    </GameContext.Provider>
  );
};
