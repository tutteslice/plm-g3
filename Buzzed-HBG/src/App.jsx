import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { AudioProvider } from './context/AudioContext';
import { useGame } from './context/useGame';
import ErrorBoundary from './components/ErrorBoundary';
import AgeGate from './pages/AgeGate';
import Home from './pages/Home';
import SinglePlayerGame from './pages/SinglePlayerGame';
import MultiplayerGame from './pages/MultiplayerGame';
import CardEditor from './pages/CardEditor';

const ProtectedRoute = ({ children }) => {
  const { isAgeVerified } = useGame();
  if (!isAgeVerified) {
    return <Navigate to="/verify-age" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/verify-age" element={<AgeGate />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/single" element={<ProtectedRoute><SinglePlayerGame /></ProtectedRoute>} />
      <Route path="/multiplayer" element={<ProtectedRoute><MultiplayerGame /></ProtectedRoute>} />
      <Route path="/editor" element={<ProtectedRoute><CardEditor /></ProtectedRoute>} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <GameProvider>
        <AudioProvider>
          <Router>
            <div className="app-container">
              <AppRoutes />
            </div>
          </Router>
        </AudioProvider>
      </GameProvider>
    </ErrorBoundary>
  );
}

export default App;
