'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';

interface FrequencySectionProps {
  id: string;
  title: string;
  glowColor: string;
  index: number;
}

const videos = [
  { id: 1, title: 'Quantum Harmony', thumbnail: 'https://images.unsplash.com/photo-1499346030926-03f47e9c339a?auto=format&fit=crop&q=80&w=600' },
  { id: 2, title: 'Vibrational Reset', thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600' },
  { id: 3, title: 'Aetheric Echoes', thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600' },
];

function FrequencyCard({ video, glowColor, index }: { video: typeof videos[0], glowColor: string, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(springY, [-100, 100], [8, -8]);
  const rotateY = useTransform(springX, [-100, 100], [-8, 8]);

  return (
    <motion.div
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
      style={{ rotateX, rotateY, x: springX, y: springY, perspective: '1000px' }}
    >
      <motion.div
        className="glass-card"
        whileHover={{ scale: 1.02 }}
        style={{ 
          overflow: 'hidden', 
          cursor: 'pointer',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: `1px solid ${glowColor}33`,
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
          <img 
            src={video.thumbnail} 
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
              padding: '1rem',
              backdropFilter: 'blur(5px)',
              border: `1px solid ${glowColor}aa`,
              boxShadow: `0 0 30px ${glowColor}44`
            }}>
            <Play fill="white" color="white" size={24} />
          </motion.div>
        </div>
        <div style={{ padding: '1.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-main)' }}>{video.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FrequencyGrid({ title, glowColor, id, index }: FrequencySectionProps) {
  return (
    <section id={id} style={{ padding: '8rem 2rem' }}>
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
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
  return (
    <>
      <FrequencyGrid id="frequency-3" title="FREQUENCY 432Hz" glowColor="#9f81b9" index={0} />
      <FrequencyGrid id="frequency-2" title="FREQUENCY 528Hz" glowColor="#4facfe" index={1} />
      <FrequencyGrid id="frequency-1" title="FREQUENCY 639Hz" glowColor="#f6d365" index={2} />
    </>
  );
}
