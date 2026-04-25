'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { CinematicIntro } from '@/components/birthday/CinematicIntro'
import { Starfield } from '@/components/birthday/Starfield'
import { CustomCursor } from '@/components/birthday/CustomCursor'
import { BloomTransition } from '@/components/birthday/BloomTransition'
import { UniverseSection } from '@/components/birthday/UniverseSection'
import { PhotoGallery } from '@/components/birthday/PhotoGallery'
import { LetterSection } from '@/components/birthday/LetterSection'
import { WishesSection } from '@/components/birthday/WishesSection'
import { FinalSection } from '@/components/birthday/FinalSection'
import { AudioProvider } from '@/components/birthday/AudioController'

// 💌 CONFIGURATION - Update these values with your own
const CONFIG = {
  // 💌 REPLACE: Your friend's name (with spaces between letters for intro animation)
  recipientNameIntro: 'A A L E Y A',
  // 💌 REPLACE: Your friend's name (normal)
  recipientName: 'Aaleya',
  // 💌 REPLACE: Your name
  senderName: 'Yash',
  // 🎵 REPLACE: Path to your audio file (place in /public/audio/)
  audioSrc: '/audio/riverbend-serenade.mp3',
}

function HeroSection({ name }: { name: string }) {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.92])
  const heroY = useTransform(scrollY, [0, 400], [0, -60])
  const ringScale1 = useTransform(scrollY, [0, 500], [1, 1.4])
  const ringScale2 = useTransform(scrollY, [0, 500], [1, 1.8])
  const ringOpacity = useTransform(scrollY, [0, 300], [0.3, 0])

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden">
      {/* Concentric ring decorations that expand on scroll */}
      <motion.div
        className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-birthday-gold/20 pointer-events-none"
        style={{ scale: ringScale1, opacity: ringOpacity }}
      />
      <motion.div
        className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[560px] md:h-[560px] rounded-full border border-birthday-gold/10 pointer-events-none"
        style={{ scale: ringScale2, opacity: ringOpacity }}
      />
      <motion.div
        className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] rounded-full border border-birthday-gold/15 pointer-events-none"
        style={{ scale: ringScale1, opacity: ringOpacity }}
      />

      {/* Central glowing orb - pure CSS, no Three.js */}
      <motion.div
        className="absolute w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(212, 184, 92, 0.25), rgba(201, 168, 76, 0.08) 50%, transparent 75%)',
          boxShadow: '0 0 80px 20px rgba(201, 168, 76, 0.12), inset 0 0 40px rgba(201, 168, 76, 0.08)',
          scale: ringScale1,
          opacity: ringOpacity,
        }}
        animate={{
          scale: [1, 1.06, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating sparkle dots — kept within 15-85% to stay safe on all viewports */}
      {[
        { top: '20%', left: '15%', delay: 0 },
        { top: '35%', left: '10%', delay: 0.6 },
        { top: '65%', left: '15%', delay: 1.2 },
        { top: '75%', left: '22%', delay: 0.3 },
        { top: '18%', left: '80%', delay: 0.9 },
        { top: '40%', left: '85%', delay: 0.4 },
        { top: '70%', left: '80%', delay: 1.5 },
        { top: '82%', left: '70%', delay: 0.7 },
        { top: '28%', left: '50%', delay: 1.1 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-birthday-gold pointer-events-none"
          style={{ top: pos.top, left: pos.left }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            delay: pos.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Main hero content */}
      <motion.div
        className="relative z-20 text-center px-4"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Thin gold rule above */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-birthday-gold to-transparent mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="font-sans text-birthday-gold/70 text-xs tracking-[0.4em] uppercase mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A birthday to remember
        </motion.p>

        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-birthday-ivory mb-3 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="font-serif italic text-birthday-ivory/50 text-xl md:text-2xl mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          today, the universe celebrates you
        </motion.p>

        {/* Thin gold rule below */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-birthday-gold to-transparent mx-auto mb-12"
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Scroll cue */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.p
            className="font-sans text-birthday-ivory/40 text-xs tracking-[0.3em] uppercase"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            scroll to explore
          </motion.p>
          <motion.div
            className="w-5 h-9 border border-birthday-gold/30 rounded-full flex justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-0.5 h-2 bg-birthday-gold rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default function BirthdayPage() {
  const [showIntro, setShowIntro] = useState(true)
  const [showBloom, setShowBloom] = useState(false)
  const [isAwakened, setIsAwakened] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleIntroComplete = () => {
    setShowBloom(true)
    setTimeout(() => {
      setShowIntro(false)
      setIsAwakened(true)
    }, 500)
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-birthday-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-birthday-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <AudioProvider audioSrc={CONFIG.audioSrc} autoPlay={isAwakened}>
      <main className="relative min-h-screen bg-birthday-black overflow-x-hidden">
        {/* Grain overlay */}
        <div className="grain-overlay" />
        
        {/* Custom cursor (desktop only) */}
        <CustomCursor />
        
        {/* Starfield background */}
        <Starfield isActive={isAwakened} />
        
        {/* Bloom transition effect */}
        <BloomTransition isActive={showBloom} />
        
        {/* Cinematic intro */}
        <AnimatePresence>
          {showIntro && (
            <CinematicIntro 
              onComplete={handleIntroComplete}
              name={CONFIG.recipientNameIntro}
            />
          )}
        </AnimatePresence>

        {/* Main content - only shown after intro */}
        <AnimatePresence>
          {isAwakened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              {/* Hero Section */}
              <HeroSection name={CONFIG.recipientName} />

              {/* Section A - The Universe Aligned */}
              <UniverseSection />

              {/* Section B - Photo Gallery */}
              <PhotoGallery />

              {/* Section C - A Letter to You */}
              <LetterSection 
                recipientName={CONFIG.recipientName}
                senderName={CONFIG.senderName}
              />

              {/* Section D - Floating Wishes */}
              <WishesSection />

              {/* Section E - Final Celebration */}
              <FinalSection senderName={CONFIG.senderName} />

              {/* Footer */}
              <footer className="py-12 text-center">
                <p className="font-sans text-birthday-ivory/30 text-xs">
                  Made with love
                </p>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </AudioProvider>
  )
}
