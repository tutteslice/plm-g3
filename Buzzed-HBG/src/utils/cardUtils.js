export const getCardColor = (type) => {
  switch (type) {
    case 'group': return 'var(--accent-purple)';
    case 'single': return 'var(--accent-pink)';
    case 'action': return 'var(--accent-cyan)';
    case 'hot_seat': return '#ff6b35';
    case 'virus': return '#39ff14';
    default: return 'var(--accent-pink)';
  }
};

export const getCardLabel = (type) => {
  switch (type) {
    case 'hot_seat': return '🔥 HOT SEAT';
    case 'virus': return '🦠 VIRUS';
    default: return type;
  }
};
