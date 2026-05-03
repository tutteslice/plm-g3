import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/useGame';
import { ArrowLeft, Plus, Trash2, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const CardEditor = () => {
  const { cards, addCard, deleteCard, resetToDefault } = useGame();
  const navigate = useNavigate();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newCard, setNewCard] = useState({ type: 'single', text: '', action: 'drink', amount: 1, audio: '' });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCard.text.trim()) return;
    
    // Only include audio if it's not empty
    const cardToSubmit = { ...newCard };
    if (!cardToSubmit.audio) {
      delete cardToSubmit.audio;
    }
    
    addCard(cardToSubmit);
    setNewCard({ type: 'single', text: '', action: 'drink', amount: 1, audio: '' });
    setIsAdding(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Max 1MB to prevent breaking localStorage
    if (file.size > 1024 * 1024) {
      alert("File is too large! Please select an audio file under 1MB, or use a YouTube link instead.");
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setNewCard({...newCard, audio: event.target.result});
    };
    reader.readAsDataURL(file);
  };

  const confirmReset = () => {
    if (window.confirm("Are you sure you want to restore the default 100 cards? All custom cards will be lost.")) {
      resetToDefault();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', padding: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('..')} 
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}
        >
          <ArrowLeft size={24} /> Back
        </button>
        <h2 style={{ fontFamily: 'var(--font-heading)' }}>Manage Cards ({cards.length})</h2>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }} onClick={() => setIsAdding(!isAdding)}>
          <Plus size={20} /> Add Card
        </button>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={confirmReset}>
          <RotateCcw size={20} /> Reset Defaults
        </button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-panel"
          style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={handleAddSubmit}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Card Text</label>
            <textarea 
              value={newCard.text}
              onChange={e => setNewCard({...newCard, text: e.target.value})}
              required
              placeholder="E.g., Take a sip if you love cats."
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontFamily: 'var(--font-body)', resize: 'vertical', minHeight: '80px' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Type</label>
              <select 
                value={newCard.type} 
                onChange={e => setNewCard({...newCard, type: e.target.value})}
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white' }}
              >
                <option value="single">Single (You)</option>
                <option value="group">Group (Everyone)</option>
                <option value="action">Mini Game / Action</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Sips / Action</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="number" 
                  min="1" 
                  max="10"
                  value={newCard.amount}
                  onChange={e => setNewCard({...newCard, amount: parseInt(e.target.value, 10)})}
                  style={{ width: '60px', padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white' }}
                />
                <select 
                  value={newCard.action} 
                  onChange={e => setNewCard({...newCard, action: e.target.value})}
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white' }}
                >
                  <option value="drink">Drink / Sips</option>
                  <option value="give">Give Sips</option>
                  <option value="finish">Finish Drink</option>
                  <option value="custom">Custom Action</option>
                </select>
              </div>
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Audio Track (Optional)</label>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Paste a YouTube link OR upload a short audio clip (max 1MB).</p>
            
            <input 
              type="text" 
              value={newCard.audio && !newCard.audio.startsWith('data:audio') ? newCard.audio : ''}
              onChange={e => setNewCard({...newCard, audio: e.target.value})}
              placeholder="e.g. https://www.youtube.com/watch?v=..."
              style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}
            />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>OR</span>
              <input 
                type="file" 
                accept="audio/*" 
                onChange={handleFileUpload}
                style={{ fontSize: '0.9rem', color: 'white' }}
              />
            </div>
            
            {newCard.audio && newCard.audio.startsWith('data:audio') && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                ✓ Local audio file attached
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" className="btn-secondary" style={{ padding: '8px 16px' }} onClick={() => setIsAdding(false)}>Cancel</button>
            <button type="submit" className="btn-primary" style={{ padding: '8px 16px' }}>Save Card</button>
          </div>
        </motion.form>
      )}

      {/* Card List */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '2rem' }}>
        {cards.map(card => (
          <div key={card.id} className="glass-panel" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid var(--accent-${card.type === 'single' ? 'pink' : card.type === 'group' ? 'purple' : 'cyan'})` }}>
            <div style={{ flex: 1, paddingRight: '1rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{card.type}</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: '600', marginBottom: '0.3rem' }}>
                {card.text} {card.audio && <span style={{ fontSize: '0.8rem', marginLeft: '0.5rem', color: 'var(--accent-purple)' }}>🎵</span>}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)' }}>{card.amount ? `${card.amount} ${card.action}` : card.action}</div>
            </div>
            <button 
              onClick={() => deleteCard(card.id)}
              style={{ background: 'transparent', border: 'none', color: '#ff4b4b', cursor: 'pointer', padding: '0.5rem' }}
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CardEditor;
