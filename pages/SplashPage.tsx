import React from 'react';
import { Link } from 'react-router-dom';

export const SplashPage: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="glow glow-coral"></div>
      <div className="glow glow-yellow"></div>

      <div className="content-container">
        {/* Hero */}
        <div className="brand">Private<span>Lives</span>Matter</div>
        <div className="tagline">To the peak, not the precinct.</div>
        <div className="divider"></div>
        
        <div className="hero-content">
          <h1 className="headline">Undergoing a makeover.</h1>
          <p className="body-text">
            PrivateLivesMatter.com is getting a fresh look and will be back soon. 
            In the meantime, you can play our new party game, <strong>Buzzed AF</strong>.
          </p>
          
          <div className="main-cta">
            <Link className="btn-highlight" to="/buzzed">Play Buzzed AF</Link>
          </div>
        </div>

        <div className="secondary-links">
          <a className="link-small" href="https://instagram.com/privatelivesmatter.com_" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a className="link-small" href="mailto:hello@privatelivesmatter.com">Contact</a>
        </div>
      </div>

      <p className="footer-note">© 2026 Private Lives Matter</p>

      <style>{`
        .splash-container {
          font-family: 'Raleway', sans-serif;
          background-color: #0a0a0a;
          color: #f0f0f0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .splash-container::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url('/thompag-plm.jpeg');
          background-size: cover;
          background-position: center right;
          opacity: 0.12;
          pointer-events: none;
          z-index: 0;
        }

        .glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.1;
          pointer-events: none;
          z-index: 0;
        }
        .glow-coral { width: 600px; height: 600px; background: #FF6B6B; top: -150px; left: -150px; }
        .glow-yellow { width: 500px; height: 500px; background: #F9F871; bottom: -100px; right: -100px; }

        .content-container {
          position: relative;
          z-index: 1;
          max-width: 600px;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .brand {
          font-family: 'Poppins', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 10vw, 4.5rem);
          letter-spacing: -0.02em;
          line-height: 1;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }
        .brand span { color: #FF6B6B; }

        .tagline {
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          font-size: clamp(0.7rem, 2vw, 0.85rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #F9F871;
          margin-bottom: 2rem;
        }

        .divider {
          width: 40px;
          height: 2px;
          background: #FF6B6B;
          margin-bottom: 3rem;
        }

        .hero-content {
          margin-bottom: 4rem;
        }

        .headline {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .body-text {
          font-size: clamp(1rem, 3vw, 1.15rem);
          color: #aaa;
          line-height: 1.6;
          max-width: 450px;
          margin: 0 auto 2.5rem;
        }

        .btn-highlight {
          display: inline-block;
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: #000;
          background: #F9F871;
          text-decoration: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 20px rgba(249, 248, 113, 0.2);
        }
        .btn-highlight:hover {
          transform: scale(1.05) translateY(-5px);
          box-shadow: 0 15px 30px rgba(249, 248, 113, 0.4);
          background: #ffffff;
        }

        .secondary-links {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }

        .link-small {
          font-family: 'Raleway', sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: #666;
          transition: color 0.2s;
        }
        .link-small:hover { color: #FF6B6B; }

        .footer-note {
          position: absolute;
          bottom: 2rem;
          font-size: 0.75rem;
          color: #333;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
};
