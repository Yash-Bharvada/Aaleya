'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AudioControllerProps {
  isPlaying: boolean
  onToggle: () => void
}

export function AudioController({ isPlaying, onToggle }: AudioControllerProps) {
  return (
    <motion.button
      className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-4 md:right-6 z-50 w-14 h-14 md:w-12 md:h-12 rounded-full bg-birthday-black/80 border border-birthday-gold/30 backdrop-blur-sm flex items-center justify-center group hover:border-birthday-gold/60 transition-colors"
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            className="flex items-end gap-[3px] h-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[1, 2, 3, 4].map((bar) => (
              <motion.div
                key={bar}
                className="w-[3px] bg-birthday-gold rounded-full"
                animate={{
                  height: ['40%', '100%', '60%', '80%', '40%'],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: bar * 0.1,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.svg
            key="paused"
            className="w-5 h-5 text-birthday-gold"
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <path d="M8 5v14l11-7z" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

interface AudioProviderProps {
  children: React.ReactNode
  audioSrc?: string
  autoPlay?: boolean
}

export function AudioProvider({ children, audioSrc = "/audio/birthday-song.mp3", autoPlay = false }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current && audioRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioContextRef.current = new AudioContextClass()
        
        const source = audioContextRef.current.createMediaElementSource(audioRef.current)
        gainNodeRef.current = audioContextRef.current.createGain()
        gainNodeRef.current.gain.value = 0
        
        source.connect(gainNodeRef.current)
        gainNodeRef.current.connect(audioContextRef.current.destination)
        
        setIsReady(true)
      }
    }

    document.addEventListener('click', initAudio, { once: true })
    return () => document.removeEventListener('click', initAudio)
  }, [])

  // Auto-play once context is ready and autoPlay signal is true
  useEffect(() => {
    if (isReady && autoPlay) {
      startPlaying()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, autoPlay])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        // Fade out
        if (gainNodeRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(
            0,
            audioContextRef.current!.currentTime + 0.5
          )
        }
        setTimeout(() => {
          audioRef.current?.pause()
        }, 500)
        setIsPlaying(false)
      } else {
        // Resume audio context if suspended
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        
        await audioRef.current.play()
        
        // Fade in over 3 seconds
        if (gainNodeRef.current && audioContextRef.current) {
          gainNodeRef.current.gain.linearRampToValueAtTime(
            1,
            audioContextRef.current.currentTime + 3
          )
        }
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Audio playback error:', error)
    }
  }

  const startPlaying = async () => {
    if (!audioRef.current || isPlaying) return

    try {
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume()
      }
      
      await audioRef.current.play()
      
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(
          1,
          audioContextRef.current.currentTime + 3
        )
      }
      setIsPlaying(true)
    } catch (error) {
      console.error('Audio playback error:', error)
    }
  }

  return (
    <>
      {/* 🎵 REPLACE: src with your actual audio file path */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
      />
      {children}
      {isReady && <AudioController isPlaying={isPlaying} onToggle={togglePlay} />}
    </>
  )
}
