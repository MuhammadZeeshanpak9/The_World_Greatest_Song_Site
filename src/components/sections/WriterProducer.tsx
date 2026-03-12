'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { useWindowSize } from '@/hooks/useWindowSize';

// Real assets
import writerImg from '@/assets/images/writer/1000070440.jpg';
import producerImg from '@/assets/images/producer/1000072477.jpg';

const profiles = [
  { 
    role: 'Written By', 
    name: 'LUCAH TWG', 
    desc: 'Crafting lyrical journeys that speak to the subconscious mind.',
    image: writerImg.src,
    position: 'top'
  },
  { 
    role: 'Produced By', 
    name: 'TGD', 
    desc: 'Mastering the frequencies that heal and elevate the human spirit.',
    image: producerImg.src,
    position: 'center'
  },
];

export default function WriterProducer() {
  const containerRef = useRef(null);
  const { isMobile, isTablet } = useWindowSize();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="writer-producer" ref={containerRef} style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ display: 'flex', width: '100%', minHeight: isMobile ? 'auto' : '80vh', flexDirection: isMobile ? 'column' : 'row' }}>
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.role}
            initial="initial"
            whileHover="hover"
            style={{
              flex: '1 1 50%',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '50vh' : '80vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isMobile ? 'default' : 'none'
            }}
          >
            {/* Background Parallax Layer */}
            <motion.div
              variants={{
                initial: { filter: 'brightness(0.3) contrast(1.2) saturate(0.8)' },
                hover: { filter: 'brightness(1) contrast(1.1) saturate(1)' }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: (isMobile || isTablet) ? 0 : (index === 0 ? 0 : '-20%'),
                bottom: (isMobile || isTablet) ? 0 : (index === 0 ? '-20%' : 0),
                left: (isMobile || isTablet) ? 0 : '-10%',
                right: (isMobile || isTablet) ? 0 : '-10%',
                zIndex: -1,
                y: (isMobile || isTablet) ? 0 : (index === 0 ? y1 : y2)
              }}
            >
              <img 
                src={profile.image} 
                alt={profile.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  objectPosition: profile.position || 'center'
                }}
              />
              <motion.div 
                variants={{
                    initial: { opacity: 1 },
                    hover: { opacity: 0 }
                }}
                transition={{ duration: 0.8 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: index === 0 
                    ? 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)' 
                    : 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)'
                }} 
              />
            </motion.div>

            {/* Cinematic Content */}
            <motion.div 
               variants={{
                 initial: { y: 0, opacity: 1 },
                 hover: { y: 20, opacity: 0 }
               }}
               transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
               style={{ textAlign: 'center', padding: '4rem', zIndex: 2, perspective: '1000px' }}
            >
              <motion.span
                style={{ 
                    textTransform: 'uppercase', 
                    letterSpacing: '8px', 
                    fontSize: '0.9rem', 
                    color: 'var(--primary-accent)',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '2rem',
                    textShadow: '0 0 20px rgba(159, 129, 185, 0.4)'
                }}
              >
                {profile.role}
              </motion.span>
              <h3 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', margin: '0.5rem 0', color: 'white', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em' }}>
                {profile.name.split(' ').map((n, i) => (
                    <span key={i} style={{ display: 'block' }}>{n}</span>
                ))}
              </h3>
              <div style={{ width: '40px', height: '2px', background: 'var(--primary-accent)', margin: '2.5rem auto' }} />
              <p style={{ maxWidth: '400px', margin: '0 auto', opacity: 0.4, fontSize: '1.3rem', lineHeight: 1.7, fontWeight: 500 }}>
                {profile.desc}
              </p>
            </motion.div>

            {/* Dynamic Light Sweep */}
            <motion.div 
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(159, 129, 185, 0.05), transparent)',
                    pointerEvents: 'none'
                }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

