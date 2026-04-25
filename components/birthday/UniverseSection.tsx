'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { GalaxySection } from './GalaxySection'

export function UniverseSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const words1 = "On this day, the universe decided to do something extraordinary".split(" ")
  const words2 = "It created you.".split(" ")

  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      {/* 3D Galaxy Background with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <GalaxySection />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6">
          {words1.map((word, index) => (
            <motion.span
              key={index}
              className="font-serif text-3xl md:text-5xl lg:text-6xl text-birthday-gold inline-block mr-3 md:mr-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <div className="mt-8">
          {words2.map((word, index) => (
            <motion.span
              key={index}
              className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-birthday-ivory inline-block mr-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 1 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Gradient overlays for blending */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-birthday-black to-transparent z-5" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-birthday-black to-transparent z-5" />
    </section>
  )
}
