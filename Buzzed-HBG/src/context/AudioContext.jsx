import { useState, useRef, useCallback } from 'react';
import { AudioContext as AudioCtx } from './AudioContextInstance';

const loadInitialMute = () => {
  try {
    const saved = localStorage.getItem('buzzed_is_muted');
    return saved !== null ? JSON.parse(saved) : false;
  } catch {
    return false;
  }
};

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMutedState] = useState(loadInitialMute);
  const isMutedRef = useRef(isMuted);
  const audioCtxRef = useRef(null);

  const setIsMuted = useCallback((val) => {
    const next = typeof val === 'function' ? val(isMutedRef.current) : val;
    isMutedRef.current = next;
    setIsMutedState(next);
    try {
      localStorage.setItem('buzzed_is_muted', JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, [setIsMuted]);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((frequency, type, duration, vol = 0.1) => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  }, [getAudioContext]);

  const playSwipe = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, [getAudioContext]);

  const playTick = useCallback(() => {
    playTone(800, 'square', 0.05, 0.02);
  }, [playTone]);

  const playDing = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc2.frequency.setValueAtTime(1108.73, ctx.currentTime); // C#6

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 1);
    osc2.stop(ctx.currentTime + 1);
  }, [getAudioContext]);

  const playGlitch = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.2);
    osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.3);

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }, [getAudioContext]);

  const playFinish = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playNote(523.25, now, 0.15);        // C5
    playNote(659.25, now + 0.15, 0.15); // E5
    playNote(783.99, now + 0.3, 0.4);   // G5
  }, [getAudioContext]);

  const value = {
    isMuted,
    toggleMute,
    playSwipe,
    playTick,
    playDing,
    playGlitch,
    playFinish,
  };

  return (
    <AudioCtx.Provider value={value}>
      {children}
    </AudioCtx.Provider>
  );
};
