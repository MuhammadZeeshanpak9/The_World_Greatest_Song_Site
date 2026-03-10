'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'Trending', href: '#trending' },
    { name: 'Frequencies', href: '#frequency-1' },
    { name: 'Creators', href: '#creators' },
    { name: 'Join Us', href: '#value-packages' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isMobile ? '1rem 1.5rem' : (isScrolled ? '1rem 2rem' : '2rem 4rem'),
          background: isScrolled || isMobileMenuOpen ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(20px)' : 'none',
          borderBottom: isScrolled || isMobileMenuOpen ? '1px solid rgba(159, 129, 185, 0.1)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <motion.div 
          style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', cursor: 'pointer' }}
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          UNIV<span style={{ color: 'var(--primary-accent)' }}>ERSE</span>
        </motion.div>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: '2.5rem' }}>
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                  opacity: 0.7,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s ease'
                }}
                className="glow-hover"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>
        )}

        {isMobile ? (
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--primary-accent)', 
              cursor: 'pointer',
              zIndex: 1001
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(159, 129, 185, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '100px',
              background: 'var(--primary-accent)',
              color: 'white',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.85rem',
              letterSpacing: '0.05em'
            }}
          >
            GET STARTED
          </motion.button>
        )}
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'white',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2.5rem'
          }}
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                textDecoration: 'none'
              }}
            >
              {item.name}
            </motion.a>
          ))}
          <button
            style={{
              marginTop: '2rem',
              padding: '1rem 2.5rem',
              borderRadius: '100px',
              background: 'var(--primary-accent)',
              color: 'white',
              border: 'none',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.1em'
            }}
          >
            GET STARTED
          </button>
        </motion.div>
      )}
    </>
  );
}
