'use client';

import { motion } from 'framer-motion';

const directionOffset = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 }
};

const FadeInSection = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  once = true
}) => {
  const offset = directionOffset[direction] ?? directionOffset.up;

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
