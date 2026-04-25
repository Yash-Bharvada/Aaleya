'use client'

import { useRef, useState } from 'react'
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

// 🖼️ REPLACE: Update these with your actual image paths
const photos = [
  { src: "/photos/photo-1.jpg", alt: "Memory 1" },
  { src: "/photos/photo-2.jpg", alt: "Memory 2" },
  { src: "/photos/photo-3.jpg", alt: "Memory 3" },
  { src: "/photos/photo-4.jpg", alt: "Memory 4" },
  { src: "/photos/photo-5.jpg", alt: "Memory 5" },
  { src: "/photos/photo-6.jpg", alt: "Memory 6" },
]

function PhotoCard({ photo, quote, index }: { photo: typeof photos[0]; quote: string; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const isFromLeft = index % 2 === 0
  const mobileOffset = 50
  const desktopOffset = 100

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, x: isFromLeft ? -mobileOffset : mobileOffset }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative overflow-hidden rounded-sm"
        style={{
          border: '1px solid rgba(201, 168, 76, 0.3)',
          boxShadow: isHovered 
            ? '0 0 40px rgba(201, 168, 76, 0.2), inset 0 0 30px rgba(201, 168, 76, 0.1)' 
            : 'none',
        }}
        animate={{
          rotateX: isHovered ? 0 : (index % 2 === 0 ? 2 : -2),
          rotateY: isHovered ? 0 : (index % 2 === 0 ? -3 : 3),
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/5] relative bg-birthday-black/50">
          {/* Placeholder gradient for demo - replace with actual images */}
          <div className="absolute inset-0 bg-gradient-to-br from-birthday-gold/20 via-birthday-black to-birthday-rose/20" />
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={(e) => {
              // Hide broken images gracefully
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>

        {/* Quote overlay on hover */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-6 bg-birthday-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-serif italic text-birthday-ivory text-center text-sm md:text-base leading-relaxed">
            {`"${quote}"`}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function PhotoGallery() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
      <motion.h2
        className="font-serif text-3xl md:text-4xl lg:text-5xl text-birthday-gold text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Captured Moments
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {photos.map((photo, index) => (
          <PhotoCard
            key={index}
            photo={photo}
            quote={quotes[index % quotes.length]}
            index={index}
          />
        ))}
      </div>

      <motion.p
        className="text-center text-birthday-ivory/40 text-sm mt-12 font-sans"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* 🖼️ REPLACE: Add your own photos to the /public/photos folder */}
        Hover over each photo to reveal a special message
      </motion.p>
    </section>
  )
}
