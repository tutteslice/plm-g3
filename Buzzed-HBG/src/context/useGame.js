import { useContext } from 'react';
import { GameContext } from './GameContextInstance';

export const useGame = () => useContext(GameContext);
