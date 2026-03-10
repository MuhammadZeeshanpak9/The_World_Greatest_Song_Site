'use client';

import { motion } from 'framer-motion';
import { Youtube, Instagram, Music2, ArrowUp } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function Footer() {
  const { isMobile } = useWindowSize();
  const icons = [
    { component: Youtube, color: '#FF0000', label: 'YouTube' },
    { component: Instagram, color: '#E4405F', label: 'Instagram' },
    { component: Music2, color: '#000000', label: 'TikTok' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      padding: isMobile ? '6rem 1rem 4rem' : '12rem 2rem 6rem',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(40px)',
      borderTop: '1px solid rgba(159, 129, 185, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Dynamic Cosmic Dust */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                    opacity: [0, 0.4, 0],
                    y: [0, -100],
                    scale: [1, 1.5, 1]
                }}
                transition={{ 
                    duration: Math.random() * 10 + 5, 
                    repeat: Infinity,
                    delay: Math.random() * 5
                }}
                style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: Math.random() * 3 + 'px',
                    height: Math.random() * 3 + 'px',
                    background: 'var(--primary-accent)',
                    borderRadius: '50%',
                    filter: 'blur(1px)'
                }}
              />
          ))}
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? '4rem' : '6rem',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Advanced Orbital Logo */}
        <div style={{ 
            position: 'relative', 
            width: isMobile ? '220px' : '300px', 
            height: isMobile ? '220px' : '300px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 60px rgba(159, 129, 185, 0.6)' }}
            style={{
              width: isMobile ? '80px' : '120px',
              height: isMobile ? '80px' : '120px',
              background: 'linear-gradient(135deg, var(--primary-accent), var(--secondary-accent))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 900,
              fontSize: isMobile ? '1.5rem' : '2rem',
              zIndex: 3,
              boxShadow: '0 0 50px rgba(159, 129, 185, 0.4)',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            U
          </motion.div>

          <svg 
            width={isMobile ? "220" : "300"} 
            height={isMobile ? "220" : "300"} 
            viewBox={isMobile ? "0 0 220 220" : "0 0 300 300"}
            style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
          >
            <circle 
                cx={isMobile ? "110" : "150"} 
                cy={isMobile ? "110" : "150"} 
                r={isMobile ? "100" : "140"} 
                fill="none" 
                stroke="rgba(159, 129, 185, 0.1)" 
                strokeWidth="1" 
                strokeDasharray="5 5" 
            />
          </svg>

          {icons.map((item, index) => (
            <motion.div
              key={index}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20 + index * 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.3, backgroundColor: 'white' }}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '50%',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  color: item.color,
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <item.component size={24} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Navigation & Brand */}
        <div style={{ textAlign: 'center', width: '100%' }}>
            <div style={{ 
                display: 'flex', 
                gap: isMobile ? '2rem' : '5rem', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                marginBottom: isMobile ? '3rem' : '4rem' 
            }}>
                {['Home', 'Trending', 'Frequencies', 'Creators', 'Packages'].map(link => (
                    <motion.a 
                        key={link}
                        href={`#${link.toLowerCase()}`} 
                        whileHover={{ y: -5, color: 'var(--primary-accent)' }}
                        style={{ 
                            color: 'var(--text-main)', 
                            opacity: 0.6, 
                            fontSize: '1rem', 
                            fontWeight: 600, 
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em'
                        }}
                    >
                        {link}
                    </motion.a>
                ))}
            </div>
            
            <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, backgroundColor: 'var(--primary-accent)', color: 'white' }}
                style={{
                    background: 'none',
                    border: '1px solid rgba(159, 129, 185, 0.3)',
                    padding: '1rem',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    color: 'var(--primary-accent)',
                    marginBottom: '4rem'
                }}
            >
                <ArrowUp size={24} />
            </motion.button>

            <div style={{ opacity: 0.3, fontSize: '0.85rem', maxWidth: '600px', margin: '0 auto', lineHeight: 2, fontWeight: 500 }}>
                © 2026 UNIVERSE MENTAL WELLNESS CREATORS. ALL RIGHTS RESERVED. <br />
                DESIGNED FOR THE MODERN SOUL. POWERED BY FREQUENCY ARCHITECTURE.
            </div>
        </div>
      </div>
    </footer>
  );
}
