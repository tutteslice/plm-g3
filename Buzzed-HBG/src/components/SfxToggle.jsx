import { Volume2, VolumeX } from 'lucide-react';
import { useAudioManager } from '../context/useAudioManager';

const SfxToggle = () => {
  const { isMuted, toggleMute } = useAudioManager();

  return (
    <button
      onClick={toggleMute}
      className="btn-icon"
      aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
      title={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
    >
      {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
    </button>
  );
};

export default SfxToggle;
