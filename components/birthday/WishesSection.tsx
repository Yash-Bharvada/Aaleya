'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'

const wishes = [
  { wish: "May every dream find its way to you", icon: "star" },
  { wish: "May laughter be your constant companion", icon: "heart" },
  { wish: "May you always know how loved you are", icon: "sparkle" },
  { wish: "May this year be your most beautiful yet", icon: "flower" },
  { wish: "May you bloom in ways that surprise even you", icon: "butterfly" },
  { wish: "May joy chase you everywhere you go", icon: "sun" },
  { wish: "May magic feel ordinary in your life", icon: "moon" },
  { wish: "May you always come home to yourself", icon: "feather" },
]

function WishIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3zM5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75L5 3zM18 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
      </svg>
    ),
    flower: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2a3 3 0 0 0 0 6 3 3 0 0 0 0-6zM4.22 7.22a3 3 0 1 0 4.24 4.24 3 3 0 0 0-4.24-4.24zM4.22 12.54a3 3 0 1 0 4.24 4.24 3 3 0 0 0-4.24-4.24zM12 16a3 3 0 0 0 0 6 3 3 0 0 0 0-6zM15.54 12.54a3 3 0 1 0 4.24 4.24 3 3 0 0 0-4.24-4.24zM15.54 7.22a3 3 0 1 0 4.24 4.24 3 3 0 0 0-4.24-4.24z" />
      </svg>
    ),
    butterfly: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <ellipse cx="6" cy="10" rx="4" ry="5" />
        <ellipse cx="18" cy="10" rx="4" ry="5" />
        <ellipse cx="6" cy="16" rx="3" ry="4" />
        <ellipse cx="18" cy="16" rx="3" ry="4" />
        <line x1="12" y1="8" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    sun: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    moon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    feather: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
  }
  return icons[type] || icons.star
}

// Each card tracks its own scroll position for a parallax stagger
function WishCard({
  wish,
  icon,
  index,
  column,
}: {
  wish: string
  icon: string
  index: number
  column: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  // Each column gets a different parallax depth
  const parallaxAmounts = [-30, 0, 30]
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxAmounts[column % 3], -parallaxAmounts[column % 3]]
  )
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.88, 1, 1, 0.95])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow behind card */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl pointer-events-none"
        style={{ background: 'rgba(201,168,76,0.18)' }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.08 : 1 }}
        transition={{ duration: 0.35 }}
      />

      {/* Card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl border backdrop-blur-md p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(201,168,76,0.09) 0%, rgba(5,5,5,0.6) 50%, rgba(232,160,160,0.04) 100%)',
        }}
        animate={{
          borderColor: isHovered ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.18)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-birthday-gold/30 rounded-tl" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-birthday-gold/30 rounded-br" />

        {/* Icon */}
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-5 text-birthday-gold"
          style={{ background: 'rgba(201,168,76,0.15)' }}
          animate={{ rotate: isHovered ? 15 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <WishIcon type={icon} />
        </motion.div>

        {/* Wish text */}
        <p className="font-serif text-lg md:text-xl text-birthday-ivory/90 leading-relaxed">
          {wish}
        </p>

        {/* Underline reveal */}
        <motion.div
          className="mt-5 h-px bg-gradient-to-r from-transparent via-birthday-gold/50 to-transparent"
          animate={{ scaleX: isHovered ? 1 : 0.4, opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

export function WishesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Header parallax — floats up as you scroll into the section
  const headerY = useTransform(scrollYProgress, [0, 0.4], [60, 0])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  // Gold line width driven by scroll
  const lineScale = useTransform(scrollYProgress, [0.05, 0.25], [0, 1])

  return (
    <section ref={sectionRef} className="min-h-screen relative py-24 px-4 md:px-8 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-birthday-gold/4 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-birthday-rose/4 rounded-full blur-3xl" />
      </div>

      {/* Twinkling star particles */}
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-birthday-gold/50 rounded-full pointer-events-none"
          style={{
            left: `${(i * 4.7 + 3) % 100}%`,
            top: `${(i * 7.3 + 5) % 100}%`,
          }}
          animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.6, 0.8] }}
          transition={{
            duration: 2.5 + (i % 4) * 0.5,
            repeat: Infinity,
            delay: (i % 7) * 0.35,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Section header */}
      <motion.div
        className="text-center mb-20 relative z-10"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-birthday-gold to-transparent mx-auto mb-8"
          style={{ scaleX: lineScale, width: '80px', transformOrigin: 'center' }}
        />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-birthday-gold mb-4 tracking-wide">
          Wishes for You
        </h2>

        <p className="font-sans text-birthday-ivory/45 text-xs md:text-sm tracking-[0.3em] uppercase">
          May all these blessings find their way to you
        </p>

        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-birthday-gold to-transparent mx-auto mt-8"
          style={{ scaleX: lineScale, width: '80px', transformOrigin: 'center' }}
        />
      </motion.div>

      {/* Wishes grid — 3 columns with per-column parallax */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {wishes.slice(0, 6).map((item, index) => (
            <WishCard
              key={index}
              wish={item.wish}
              icon={item.icon}
              index={index}
              column={index % 3}
            />
          ))}
        </div>

        {/* Final two cards centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 max-w-2xl mx-auto">
          {wishes.slice(6).map((item, index) => (
            <WishCard
              key={index + 6}
              wish={item.wish}
              icon={item.icon}
              index={index + 6}
              column={index % 2 === 0 ? 0 : 2}
            />
          ))}
        </div>
      </div>

      {/* Bottom dots */}
      <motion.div
        className="flex justify-center mt-20 gap-2"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-birthday-gold/40"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </motion.div>
    </section>
  )
}
