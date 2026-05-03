import { useContext } from 'react';
import { AudioContext } from './AudioContextInstance';

export const useAudioManager = () => useContext(AudioContext);
