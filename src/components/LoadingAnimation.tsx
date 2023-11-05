import { motion } from 'framer-motion';
import React from 'react';

const LoadingAnimation: React.FC = () => (
  <motion.div
    className="bg-blue-500 w-10 h-10 rounded-full"
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 0.8, repeat: Infinity }}
  />
);

export default LoadingAnimation;
