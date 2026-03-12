'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Youtube, Instagram, Twitter } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

// Real assets
import gratitudeImg from '@/assets/images/Artists_creator/GRATITUDEBOSSLADY.png';
import jayImg from '@/assets/images/Artists_creator/JAY2DAWORLD.jpg';
import joeImg from '@/assets/images/Artists_creator/JOE BILLS.jpg';
import oluwaf3miImg from '@/assets/images/Artists_creator/OLUWAF3MI.jpg';
import renaImg from '@/assets/images/Artists_creator/RENA CHAMP.jpg';

const creators = [
  { 
    id: 1, 
    name: 'GRATITUDE BOSSLADY', 
    role: 'Frequency Specialist', 
    image: gratitudeImg.src,
    bio: 'Dedicated to exploring the intersection of quantum physics and sonic meditation.',
    position: 'top'
  },
  { 
    id: 2, 
    name: 'JAY2DAWORLD', 
    role: 'Sonic Architect', 
    image: jayImg.src,
    bio: 'Pioneer in spatial audio and immersive mental wellness soundscapes.',
    position: 'top'
  },
  { 
    id: 3, 
    name: 'JOE BILLS', 
    role: 'Vocal Healer', 
    image: joeImg.src,
    bio: 'Using the human voice as a tool for grounding and vibrational realignment.'
  },
  { 
    id: 4, 
    name: 'OLUWAF3MI', 
    role: 'Rhythm Architect', 
    image: oluwaf3miImg.src,
    bio: 'Master of polyrhythmic frequencies and cultural sonic fusion.'
  },
  { 
    id: 5, 
    name: 'RENA CHAMP', 
    role: 'Sonic Visionary', 
    image: renaImg.src,
    bio: 'Envisioning the future of sound through experimental frequency manipulation.'
  },
];

function CreatorCard({ creator, index }: { creator: typeof creators[0], index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 100, damping: 20 });
    const springY = useSpring(y, { stiffness: 100, damping: 20 });
    const rotateX = useTransform(springY, [-100, 100], [5, -5]);
    const rotateY = useTransform(springX, [-100, 100], [-5, 5]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
            transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
            viewport={{ once: false, amount: 0.2 }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - (rect.left + rect.width / 2));
                y.set(e.clientY - (rect.top + rect.height / 2));
            }}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ perspective: '1500px', height: '450px', rotateX, rotateY, x: springX, y: springY }}
        >
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                cursor: 'pointer'
              }}
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 80, damping: 15 }}
            >
              {/* Front Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '28px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(159, 129, 185, 0.15)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <img 
                  src={creator.image} 
                  alt={creator.name} 
                  style={{ width: '100%', height: '75%', objectFit: 'cover', objectPosition: (creator as any).position || 'center' }}
                />
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>{creator.name}</h3>
                  <p style={{ opacity: 0.5, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.4rem' }}>{creator.role}</p>
                </div>
              </div>

              {/* Back Side */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '28px',
                background: 'rgba(159, 129, 185, 0.08)',
                backdropFilter: 'blur(25px)',
                border: '1px solid var(--primary-accent)',
                transform: 'rotateY(180deg)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--primary-accent)', fontWeight: 900 }}>{creator.name}</h3>
                <p style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.5', opacity: 0.7, fontWeight: 500 }}>{creator.bio}</p>
                
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <motion.div whileHover={{ scale: 1.2, color: 'var(--primary-accent)' }}>
                    <Youtube style={{ cursor: 'pointer', opacity: 0.8 }} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, color: 'var(--primary-accent)' }}>
                    <Instagram style={{ cursor: 'pointer', opacity: 0.8 }} />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2, color: 'var(--primary-accent)' }}>
                    <Twitter style={{ cursor: 'pointer', opacity: 0.8 }} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
        </motion.div>
    );
}

export default function Creators() {
  const { isMobile } = useWindowSize();

  return (
    <section id="creators" style={{ padding: isMobile ? '4rem 1rem' : '10rem 2rem' }}>
       <motion.div
        initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1 }}
        style={{ marginBottom: isMobile ? '3rem' : '6rem', textAlign: isMobile ? 'center' : 'right' }}
      >
        <h2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: 900, letterSpacing: '-0.04em' }}>
            MEET THE <span style={{ color: 'var(--primary-accent)' }}>CREATORS/ARTISTS</span>
        </h2>
        <p style={{ opacity: 0.5, marginTop: '1rem', letterSpacing: isMobile ? '0.15em' : '0.3em', textTransform: 'uppercase', fontSize: isMobile ? '0.7rem' : '0.9rem' }}>The Visionaries Behind the Sound</p>
      </motion.div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '280px' : '320px'}, 1fr))`,
        gap: isMobile ? '2rem' : '3rem',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {creators.map((creator, index) => (
          <CreatorCard key={creator.id} creator={creator} index={index} />
        ))}
      </div>
    </section>
  );
}

