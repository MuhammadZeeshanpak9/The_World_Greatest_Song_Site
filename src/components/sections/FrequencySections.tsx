'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { useWindowSize } from '@/hooks/useWindowSize';

interface Video {
  id: number;
  title: string;
  url: string;
}

interface FrequencySectionProps {
  id: string;
  title: string;
  glowColor: string;
  index: number;
  videos: Video[];
}

function getYoutubeThumbnail(url: string) {
  const videoIdMatch = url.match(/[?&]v=([^&]+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
}

function FrequencyCard({ video, glowColor, index }: { video: Video, glowColor: string, index: number }) {
  const { isMobile } = useWindowSize();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(springY, [-100, 100], [8, -8]);
  const rotateY = useTransform(springX, [-100, 100], [-8, 8]);

  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ delay: index * 0.1, duration: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ 
        rotateX, 
        rotateY, 
        x: springX, 
        y: springY, 
        perspective: '1000px',
        display: 'block',
        textDecoration: 'none'
      }}
    >
      <motion.div
        className="glass-card"
        whileHover={{ scale: 1.02 }}
        style={{ 
          overflow: 'hidden', 
          cursor: 'pointer',
          borderRadius: isMobile ? '12px' : '20px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${glowColor}33`,
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
          <img 
            src={getYoutubeThumbnail(video.url)} 
            alt={video.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent, ${glowColor}44)`
          }} />
          <motion.div 
            whileHover={{ scale: 1.1, backgroundColor: `${glowColor}66` }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: `${glowColor}44`,
              borderRadius: '50%',
              padding: isMobile ? '0.6rem' : '1rem',
              backdropFilter: 'blur(5px)',
              border: `1px solid ${glowColor}aa`,
              boxShadow: `0 0 30px ${glowColor}44`
            }}>
            <Play fill="white" color="white" size={isMobile ? 18 : 24} />
          </motion.div>
        </div>
        <div style={{ padding: isMobile ? '1rem' : '1.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: isMobile ? '0.85rem' : '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>{video.title}</h3>
        </div>
      </motion.div>
    </motion.a>
  );
}

function FrequencyGrid({ title, glowColor, id, index, videos }: FrequencySectionProps) {
  const { isMobile } = useWindowSize();
  return (
    <section id={id} style={{ padding: isMobile ? '4rem 1rem' : '8rem 2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '4rem', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em' }}>
          {title.split(' ')[0]} <span style={{ 
            color: glowColor,
            textShadow: `0 0 30px ${glowColor}44`
           }}>{title.split(' ')[1]}</span>
        </h2>
        <div style={{ 
            width: '60px', 
            height: '4px', 
            background: glowColor, 
            margin: '1.5rem auto',
            borderRadius: '2px'
        }} />
      </motion.div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '0.8rem' : '2rem',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {videos.map((video, idx) => (
          <FrequencyCard key={video.id + id} video={video} glowColor={glowColor} index={idx} />
        ))}
      </div>
    </section>
  );
}

export default function FrequencySections() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const videos432Hz = [
    { id: 1, title: 'Vibrational Healing', url: 'https://www.youtube.com/watch?v=NP1EnZl7pyM' },
    { id: 2, title: 'Sonic Ascension', url: 'https://www.youtube.com/watch?v=qWscN20B-iE' },
    { id: 3, title: 'Miracle Tone', url: 'https://www.youtube.com/watch?v=waR8lR_jk2I' },
    { id: 4, title: 'DNA Repair', url: 'https://www.youtube.com/watch?v=Ej_ficO7kbU' },
    { id: 5, title: 'Aura Cleansing', url: 'https://www.youtube.com/watch?v=rmJxdEumJs4' },
    { id: 6, title: 'Deep Sleep', url: 'https://www.youtube.com/watch?v=mkiDgn17tOc' },
  ];

  const videos528Hz = [
    { id: 1, title: 'Love Frequency', url: 'https://www.youtube.com/watch?v=rTF-lOd57DA' },
    { id: 2, title: 'Positive Transformation', url: 'https://www.youtube.com/watch?v=U5sOeOfcOWo' },
    { id: 3, title: 'Heart Chakra Healing', url: 'https://www.youtube.com/watch?v=8mfGoRaLmmw' },
    { id: 4, title: 'Inner Peace', url: 'https://www.youtube.com/watch?v=MpEvYhfffqw' },
    { id: 5, title: 'Spiritual Awakening', url: 'https://www.youtube.com/watch?v=sxtfUMaIP1g' },
  ];

  const videos639Hz = [
    { id: 1, title: 'Harmonious Relationships', url: 'https://www.youtube.com/watch?v=kJqe2yV3SIA' },
    { id: 2, title: 'Attracting Love', url: 'https://www.youtube.com/watch?v=1G7rzmHYaPY' },
    { id: 3, title: 'Emotional Balance', url: 'https://www.youtube.com/watch?v=K0D7Eq1hRNk' },
    { id: 4, title: 'Cellular Healing', url: 'https://www.youtube.com/watch?v=ZZwzuyCsmis' },
    { id: 5, title: 'Positive Energy', url: 'https://www.youtube.com/watch?v=H96Y9_-Q1n4' },
  ];

  if (!mounted) return null;

  return (
    <>
      <FrequencyGrid id="frequency-3" title="FREQUENCY 432Hz" glowColor="#9f81b9" index={0} videos={videos432Hz} />
      <FrequencyGrid id="frequency-2" title="FREQUENCY 528Hz" glowColor="#4facfe" index={1} videos={videos528Hz} />
      <FrequencyGrid id="frequency-1" title="FREQUENCY 639Hz" glowColor="#f6d365" index={2} videos={videos639Hz} />
    </>
  );
}

