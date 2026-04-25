'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CinematicIntroProps {
  onComplete: () => void
  // 💌 REPLACE: Change the name to your friend's actual name
  name?: string
}

export function CinematicIntro({ onComplete, name = 'A Y E S H A' }: CinematicIntroProps) {
  const [stage, setStage] = useState(0)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Stage 0: Initial black screen (1.5s delay)
    const timer1 = setTimeout(() => setStage(1), 1500)
    
    // Stage 2: Show subtitle after name animation
    const timer2 = setTimeout(() => setStage(2), 3500)
    
    // Stage 3: Show tap prompt
    const timer3 = setTimeout(() => setShowPrompt(true), 4500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const handleClick = () => {
    if (showPrompt) {
      onComplete()
    }
  }

  const nameChars = name.split('')

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-birthday-black flex flex-col items-center justify-center cursor-pointer"
      onClick={handleClick}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Gold line animation */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-transparent via-birthday-gold to-transparent"
            initial={{ width: 0, x: '-50%', y: '-50%' }}
            animate={{ width: '60%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      {/* Name animation */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-0.5 md:gap-2 mt-8 px-4 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
        {nameChars.map((char, index) => (
          <motion.span
            key={index}
            className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-birthday-ivory tracking-[0.2em] md:tracking-[0.3em]"
            initial={{ opacity: 0, y: 20 }}
            animate={stage >= 1 ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 1.4 + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        className="font-serif italic text-birthday-ivory/80 text-lg md:text-xl mt-6"
        initial={{ opacity: 0 }}
        animate={stage >= 2 ? { opacity: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        A story written just for you
      </motion.p>

      {/* Tap prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="absolute bottom-8 pb-[env(safe-area-inset-bottom)] flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="font-sans text-birthday-ivory/60 text-sm tracking-widest uppercase"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Tap anywhere to begin
            </motion.p>
            <motion.div
              className="mt-4 w-6 h-10 border border-birthday-gold/40 rounded-full flex justify-center"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="w-1 h-2 bg-birthday-gold rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
