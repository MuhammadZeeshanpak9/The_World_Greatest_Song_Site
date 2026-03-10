'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { useWindowSize } from '@/hooks/useWindowSize';

const profiles = [
  { 
    role: 'The Writer', 
    name: 'Aria Penhaligon', 
    desc: 'Crafting lyrical journeys that speak to the subconscious mind.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    role: 'The Producer', 
    name: 'Kaelen Thorne', 
    desc: 'Mastering the frequencies that heal and elevate the human spirit.',
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&q=80&w=1200'
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
      <div style={{ display: 'flex', width: '100%', minHeight: isMobile ? 'auto' : '120vh', flexDirection: isMobile ? 'column' : 'row' }}>
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.role}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            style={{
              flex: '1 1 50%',
              position: 'relative',
              overflow: 'hidden',
              minHeight: isMobile ? '60vh' : '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isMobile ? 'default' : 'none'
            }}
          >
            {/* Background Parallax Layer */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-10%',
                zIndex: -1,
                y: (isMobile || isTablet) ? 0 : (index === 0 ? y1 : y2)
              }}
            >
              <img 
                src={profile.image} 
                alt={profile.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3) contrast(1.2) saturate(0.8)' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: index === 0 
                  ? 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)' 
                  : 'linear-gradient(to left, rgba(0,0,0,0.8), transparent)'
              }} />
            </motion.div>

            {/* Cinematic Content */}
            <motion.div 
               initial={{ y: 50, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
               whileHover={{ scale: 1.05 }}
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
