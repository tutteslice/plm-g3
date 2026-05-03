import React from 'react';
import { GameProvider } from './context/GameContext';
import { AudioProvider } from './context/AudioContext';
import { useGame } from './context/useGame';
import { Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import AgeGate from './pages/AgeGate';
import Home from './pages/Home';
import SinglePlayerGame from './pages/SinglePlayerGame';
import MultiplayerGame from './pages/MultiplayerGame';
import CardEditor from './pages/CardEditor';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const { isAgeVerified } = useGame();
  if (!isAgeVerified) {
    return <Navigate to="verify-age" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="verify-age" element={<AgeGate />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="single" element={<ProtectedRoute><SinglePlayerGame /></ProtectedRoute>} />
      <Route path="multiplayer" element={<ProtectedRoute><MultiplayerGame /></ProtectedRoute>} />
      <Route path="editor" element={<ProtectedRoute><CardEditor /></ProtectedRoute>} />
    </Routes>
  );
};

export const BuzzedGame = () => {
  return (
    <ErrorBoundary>
      <GameProvider>
        <AudioProvider>
          <div className="buzzed-game-root">
            <AppRoutes />
          </div>
        </AudioProvider>
      </GameProvider>
    </ErrorBoundary>
  );
};

export default BuzzedGame;
