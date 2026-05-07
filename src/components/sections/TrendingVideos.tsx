'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

const videos = [
  { id: 1, title: 'Binaural Frequencies', url: 'https://www.youtube.com/watch?v=Popd1R9XH2Y' },
  { id: 2, title: 'Deep Meditation', url: 'https://www.youtube.com/watch?v=UJQhSfBTT5A' },
  { id: 3, title: 'Vibrational Healing', url: 'https://www.youtube.com/watch?v=NP1EnZl7pyM' },
  { id: 4, title: 'Sonic Ascension', url: 'https://www.youtube.com/watch?v=qWscN20B-iE' },
];

function getYoutubeThumbnail(url: string) {
  const videoIdMatch = url.match(/[?&]v=([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
}

function MagneticCard({ video, index }: { video: typeof videos[0], index: number }) {
  const { isMobile } = useWindowSize();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
      viewport={{ once: false, amount: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        perspective: '1000px',
        rotateX,
        rotateY,
        x: springX,
        y: springY,
        display: 'block',
        textDecoration: 'none'
      }}
    >
      <motion.div
        className="glass-card"
        whileHover={{ boxShadow: '0 20px 40px rgba(159, 129, 185, 0.25)' }}
        style={{ 
            overflow: 'hidden', 
            cursor: 'pointer',
            borderRadius: isMobile ? '16px' : '24px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(159, 129, 185, 0.15)',
            transition: 'border-color 0.3s ease'
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={getYoutubeThumbnail(video.url)} 
            alt={video.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2
          }}>
            <motion.div 
               whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.3)' }}
               style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '50%',
                    padding: isMobile ? '0.8rem' : '1.2rem',
                    border: '1px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 0 30px rgba(159, 129, 185, 0.3)'
               }}
            >
                <Play fill="white" color="white" size={isMobile ? 20 : 32} />
            </motion.div>
          </div>
        </div>
        <div style={{ padding: isMobile ? '1rem' : '2rem' }}>
          <h3 style={{ fontSize: isMobile ? '1rem' : '1.4rem', color: 'var(--text-main)', fontWeight: 700, letterSpacing: '-0.01em' }}>{video.title}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.8rem', opacity: 0.5 }}>
            <span style={{ width: '30px', height: '1px', background: 'var(--primary-accent)' }} />
            <p style={{ fontSize: isMobile ? '0.65rem' : '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-main)' }}>Sonic Architecture</p>
          </div>
        </div>
      </motion.div>
    </motion.a>
  );
}

export default function TrendingVideos() {
  const [mounted, setMounted] = useState(false);
  const { isMobile } = useWindowSize();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="trending" style={{ padding: isMobile ? '5rem 1rem' : '10rem 2rem' }}>
      <motion.div
        initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        style={{ marginBottom: '4.5rem' }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>
            DAILY <span style={{ color: 'var(--primary-accent)' }}>EVOLUTIONS</span>
        </h2>
        <p style={{ opacity: 0.5, marginTop: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Most Transcendent Creation</p>
      </motion.div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '1rem' : '2.5rem',
        width: '100%',
        maxWidth: '1300px',
        margin: '0 auto'
      }}>
        {videos.map((video, index) => (
          <MagneticCard key={video.id} video={video} index={index} />
        ))}
      </div>
    </section>
  );
}
