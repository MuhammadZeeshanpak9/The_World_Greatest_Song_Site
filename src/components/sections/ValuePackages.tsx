'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const packages = [
  { name: 'Silver Pack', price: '$49', desc: 'Basic frequency access', features: ['3 High-Freq Tracks', 'Digital Booklet', 'Weekly Updates'] },
  { name: 'Gold Pack', price: '$99', desc: 'Extended meditation collection', features: ['10 High-Freq Tracks', 'Sonic Masterclass', 'Private Community'] },
  { name: 'Platinum Pack', price: '$199', desc: 'Full universe immersion', features: ['Full Discography', '1-on-1 Consultation', 'Lifetime Updates'] },
];

function PackageCard({ pkg, index }: { pkg: typeof packages[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateX = useTransform(springY, [-150, 150], [15, -15]);
  const rotateY = useTransform(springX, [-150, 150], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as any, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.2 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - (rect.left + rect.width / 2));
        y.set(e.clientY - (rect.top + rect.height / 2));
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, x: springX, y: springY, perspective: '1200px' }}
    >
      <motion.div
        whileHover={{ scale: 1.05, boxShadow: '0 30px 60px rgba(159, 129, 185, 0.3)' }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          width: '320px',
          padding: '4rem 2rem',
          textAlign: 'center',
          borderRadius: '32px',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(159, 129, 185, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* Animated Shine */}
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'skewX(-20deg)',
            pointerEvents: 'none'
          }}
        />
        
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{pkg.name}</h3>
        <p style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary-accent)', margin: '1.5rem 0', textShadow: '0 0 20px rgba(159, 129, 185, 0.3)' }}>
          {pkg.price}
        </p>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', width: '100%' }}>
            {pkg.features.map(f => (
                <li key={f} style={{ fontSize: '0.95rem', opacity: 0.6, marginBottom: '0.75rem', fontWeight: 500 }}>{f}</li>
            ))}
        </ul>

        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(159, 129, 185, 0.2)' }}
          whileTap={{ scale: 0.95 }}
          className="cta-button cta-primary" 
          style={{ width: '100%', height: '54px', fontSize: '0.9rem', fontWeight: 700 }}
        >
          Select Package
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function ValuePackages() {
  return (
    <section id="value-packages" style={{ padding: '12rem 2rem' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '6rem' }}
      >
        <h2 style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          CHOOSE YOUR <br />
          <span style={{ color: 'var(--primary-accent)' }}>ASCENSION</span>
        </h2>
        <p style={{ opacity: 0.5, marginTop: '1.5rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.9rem' }}>Tailored Frequency Access</p>
      </motion.div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '3rem',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {packages.map((pkg, index) => (
          <PackageCard key={pkg.name} pkg={pkg} index={index} />
        ))}
      </div>
    </section>
  );
}
