'use client';

import { motion } from 'framer-motion';

import { useWindowSize } from '@/hooks/useWindowSize';

export default function Hero() {
  const { isMobile } = useWindowSize();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -20, 0],
      x: [0, Math.sin(i) * 10, 0],
      opacity: [0.2, 0.5, 0.2],
      transition: {
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut" as any
      }
    })
  };

  return (
    <section id="hero" style={{ 
      position: 'relative',
      minHeight: '100vh',
      display: 'grid', 
      gridTemplateColumns: isMobile ? '1fr' : 'minmax(300px, 1.2fr) 0.8fr',
      alignItems: 'center', 
      textAlign: isMobile ? 'center' : 'left',
      maxWidth: '1400px', 
      margin: '0 auto',
      gap: isMobile ? '3rem' : '2rem',
      padding: isMobile ? '8rem 1.5rem 4rem' : '0 4rem'
    }}>
      {/* Decorative Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(isMobile ? 8 : 15)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            animate="animate"
            style={{
              position: 'absolute',
              width: i % 3 === 0 ? '4px' : '2px',
              height: i % 3 === 0 ? '4px' : '2px',
              background: 'var(--primary-accent)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
              boxShadow: '0 0 10px var(--primary-accent)'
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        style={{ zIndex: 10, position: 'relative' }}
      >
        <motion.div
            variants={{
                hidden: { y: 20, opacity: 0, filter: 'blur(10px)', scale: 0.9 },
                visible: { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.8 } }
            }}
            style={{ 
                fontSize: isMobile ? '0.75rem' : '0.9rem', 
                letterSpacing: '0.4em', 
                color: 'var(--primary-accent)', 
                fontWeight: 600,
                marginBottom: '1rem',
                textTransform: 'uppercase'
            }}
        >
            THE WORLD'S GREATEST MUSIC WORLDWIDE™
        </motion.div>

        <motion.h1 
          variants={{
              hidden: { y: 30, opacity: 0, filter: 'blur(20px)', scale: 0.8 },
              visible: { y: 0, opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 1, delay: 0.2 } }
          }}
          style={{ 
            fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4.5rem)', 
            marginBottom: '1.5rem', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em' 
          }}
        >
          THE NUMBER 1 MENTAL WELLNESS <br />
          <span style={{ 
            color: 'transparent', 
            WebkitTextStroke: isMobile ? '1px var(--primary-accent)' : '2px var(--primary-accent)',
            textShadow: '0 0 40px rgba(159, 129, 185, 0.2)'
           }}>MUSIC CREATORS</span> <br />
          IN THE UNIVERSE
        </motion.h1>
        
        <motion.p 
          variants={{
              hidden: { opacity: 0, filter: 'blur(10px)' },
              visible: { opacity: 0.6, filter: 'blur(0px)', transition: { duration: 1, delay: 0.4 } }
          }}
          style={{ 
            fontSize: isMobile ? '1.1rem' : '1.25rem', 
            marginBottom: isMobile ? '2.5rem' : '3.5rem', 
            opacity: 0.6, 
            maxWidth: isMobile ? '100%' : '550px', 
            lineHeight: 1.6,
            marginLeft: isMobile ? 'auto' : '0',
            marginRight: isMobile ? 'auto' : '0'
          }}
        >
          It only gets greater.
        </motion.p>
        
        <motion.div 
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: 0.6 } }
            }}
            style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '1rem' : '2rem',
              alignItems: 'center',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(159, 129, 185, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className="cta-button cta-primary" 
            style={{ width: isMobile ? '100%' : '200px', height: '60px', fontSize: '1rem', fontWeight: 700 }}
          >
            Collaborations
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, background: 'rgba(159, 129, 185, 0.05)' }}
            whileTap={{ scale: 0.95 }}
            className="cta-button cta-secondary" 
            style={{ width: isMobile ? '100%' : '200px', height: '60px', fontSize: '1rem', fontWeight: 700 }}
          >
            Explore Frequencies
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Planet reserved space - hidden on mobile to avoid overlap */}
      {!isMobile && <div style={{ pointerEvents: 'none' }} aria-hidden="true" />}
    </section>
  );
}
