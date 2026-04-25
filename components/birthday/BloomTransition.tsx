'use client'

import { motion } from 'framer-motion'

interface BloomTransitionProps {
  isActive: boolean
}

export function BloomTransition({ isActive }: BloomTransitionProps) {
  if (!isActive) return null

  return (
    <motion.div
      className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 2, delay: 1 }}
    >
      <motion.div
        className="w-4 h-4 rounded-full bg-white"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ 
          scale: [0, 100],
          opacity: [1, 0],
        }}
        transition={{ 
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          boxShadow: '0 0 100px 50px rgba(255, 255, 255, 0.8)',
        }}
      />
    </motion.div>
  )
}
