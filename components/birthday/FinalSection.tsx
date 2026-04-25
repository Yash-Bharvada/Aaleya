'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface FinalSectionProps {
  // 💌 REPLACE: Change to your actual name
  senderName?: string
}

function Confetti({ isActive }: { isActive: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!isActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#C9A84C', '#E8A0A0', '#F5F0E8', '#D4B85C']
    
    interface Particle {
      x: number
      y: number
      size: number
      color: string
      velocity: { x: number; y: number }
      rotation: number
      rotationSpeed: number
      opacity: number
    }

    const particles: Particle[] = []

    // Create initial burst
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20 - 5,
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y
        particle.velocity.y += 0.2 // gravity
        particle.velocity.x *= 0.99 // friction
        particle.rotation += particle.rotationSpeed
        particle.opacity -= 0.005

        if (particle.opacity <= 0) {
          particles.splice(index, 1)
          return
        }

        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size / 3)
        ctx.restore()
      })

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ opacity: isActive ? 1 : 0 }}
    />
  )
}

function FallingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number }>>([])

  useEffect(() => {
    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 8,
      size: Math.random() * 15 + 10,
    }))
    setPetals(newPetals)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: -30,
            width: petal.size,
            height: petal.size,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z"
              fill="#E8A0A0"
              opacity={0.6}
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

export function FinalSection({ senderName = "Your Name" }: FinalSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isInView) {
      setShowConfetti(true)
    }
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
    >
      <Confetti isActive={showConfetti} />
      <FallingPetals />

      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(201, 168, 76, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h1 
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-birthday-gold mb-8"
            style={{
              textShadow: '0 0 60px rgba(201, 168, 76, 0.5), 0 0 120px rgba(201, 168, 76, 0.3)',
            }}
          >
            Happy Birthday!
          </h1>
        </motion.div>

        <motion.p
          className="font-serif italic text-xl md:text-2xl text-birthday-ivory/80"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          With all my love,
        </motion.p>

        <motion.p
          className="font-serif text-2xl md:text-3xl text-birthday-rose mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {/* 💌 REPLACE: [Your Name] with your actual name */}
          {senderName}
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-birthday-gold"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-birthday-black to-transparent" />
    </section>
  )
}
