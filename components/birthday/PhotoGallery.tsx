'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const quotes = [
  "Every picture tells the story of a soul too bright for ordinary days.",
  "You were the chapter everyone will remember.",
  "Some people are sunlight in human form.",
  "Rare. Radiant. Irreplaceable.",
  "The kind of person poems are written about.",
  "You make ordinary moments feel cinematic.",
  "A friend like you is a once-in-a-lifetime gift.",
  "The world is brighter because you exist.",
]

const photos = [
  { src: "/photos/photo-1.jpg", alt: "Memory 1" },
  { src: "/photos/photo-2.jpg", alt: "Memory 2" },
  { src: "/photos/photo-3.jpg", alt: "Memory 3" },
  { src: "/photos/photo-4.jpg", alt: "Memory 4" },
  { src: "/photos/photo-5.jpg", alt: "Memory 5" },
  { src: "/photos/photo-6.jpg", alt: "Memory 6" },
]

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  return isTouch
}

function PhotoCard({
  photo,
  quote,
  index,
  isTouch,
}: {
  photo: (typeof photos)[0]
  quote: string
  index: number
  isTouch: boolean
}) {
  const [isActive, setIsActive] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const isFromLeft = index % 2 === 0

  const handleInteraction = () => {
    if (isTouch) {
      setIsActive((prev) => !prev)
    }
  }

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, x: isFromLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => !isTouch && setIsActive(true)}
      onMouseLeave={() => !isTouch && setIsActive(false)}
      onClick={handleInteraction}
    >
      <motion.div
        className="relative overflow-hidden rounded-xl cursor-pointer"
        style={{
          border: '1px solid rgba(201, 168, 76, 0.3)',
          boxShadow: isActive
            ? '0 0 40px rgba(201, 168, 76, 0.2), inset 0 0 30px rgba(201, 168, 76, 0.1)'
            : 'none',
        }}
        animate={{
          scale: isActive ? 1.02 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Photo container — object-contain keeps full image visible */}
        <div className="relative w-full bg-birthday-black/80" style={{ paddingBottom: '100%' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-birthday-gold/10 via-birthday-black/60 to-birthday-rose/10" />
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>

        {/* Quote overlay — hover on desktop, tap on mobile */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-5 bg-birthday-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        >
          <div className="text-center">
            <p className="font-serif italic text-birthday-ivory text-sm md:text-base leading-relaxed">
              {`"${quote}"`}
            </p>
            {isTouch && (
              <p className="font-sans text-birthday-gold/60 text-xs mt-3 tracking-widest uppercase">
                tap to close
              </p>
            )}
          </div>
        </motion.div>

        {/* Tap hint badge — only on mobile, only when not active */}
        {isTouch && !isActive && (
          <div className="absolute top-2 right-2 bg-birthday-black/70 border border-birthday-gold/40 rounded-full px-2 py-0.5 flex items-center gap-1">
            <span className="text-birthday-gold/80 text-[10px] tracking-wide uppercase font-sans">tap</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function PhotoGallery() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isTouch = useIsTouchDevice()

  return (
    <section ref={sectionRef} className="py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20">
      <motion.h2
        className="font-serif text-3xl md:text-4xl lg:text-5xl text-birthday-gold text-center mb-10 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Captured Moments
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
        {photos.map((photo, index) => (
          <PhotoCard
            key={index}
            photo={photo}
            quote={quotes[index % quotes.length]}
            index={index}
            isTouch={isTouch}
          />
        ))}
      </div>

      <motion.p
        className="text-center text-birthday-ivory/40 text-sm mt-10 md:mt-12 font-sans"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {isTouch ? 'Tap a photo to reveal a special message' : 'Hover over each photo to reveal a special message'}
      </motion.p>
    </section>
  )
}
