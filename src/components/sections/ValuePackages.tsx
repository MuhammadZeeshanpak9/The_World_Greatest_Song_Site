'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Music Production',
    desc: 'Professional music production services for artists and creators.',
  },
  {
    number: '02',
    title: 'Artist Management',
    desc: 'Comprehensive artist management and career development.',
  },
  {
    number: '03',
    title: 'Music Distribution',
    desc: 'Global music distribution across all major platforms.',
  },
  {
    number: '04',
    title: 'Collaborations & Bookings',
    desc: 'Connect with us for collaborations and bookings.',
  },
];

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      style={{
        padding: '3rem',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(159, 129, 185, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <span style={{ 
        fontSize: '4rem', 
        fontWeight: 900, 
        color: 'var(--primary-accent)', 
        opacity: 0.1,
        position: 'absolute',
        top: '1rem',
        right: '2rem'
      }}>
        {service.number}
      </span>
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', position: 'relative' }}>{service.title}</h3>
      <p style={{ opacity: 0.6, fontSize: '1rem', lineHeight: 1.6, position: 'relative' }}>{service.desc}</p>
      <motion.button
        whileHover={{ x: 10, color: 'var(--primary-accent)' }}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: 'var(--text-main)', 
          fontWeight: 700, 
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        Request Service →
      </motion.button>
    </motion.div>
  );
}


export default function ValuePackages() {
  return (
    <section id="value-packages" style={{ padding: '12rem 2rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '8rem' }}
      >
        <h2 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          VALUE <span style={{ color: 'var(--primary-accent)' }}>PACKAGES</span>
        </h2>
        <p style={{ opacity: 0.5, marginTop: '1.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '1rem' }}>
          Professional services for artists and creators.
        </p>
      </motion.div>
      
      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2.5rem',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}

