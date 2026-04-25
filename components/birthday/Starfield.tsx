'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

interface StarfieldProps {
  isActive: boolean
}

export function Starfield({ isActive }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000)
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
      }))
    }

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        if (isActive) {
          star.y += star.speed * 0.3
          star.x += star.speed * 0.1

          if (star.y > canvas.height) {
            star.y = 0
            star.x = Math.random() * canvas.width
          }
          if (star.x > canvas.width) {
            star.x = 0
          }
        }

        // Twinkling effect
        const twinkle = Math.sin(Date.now() * 0.001 + star.x) * 0.3 + 0.7

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 240, 232, ${star.opacity * twinkle})`
        ctx.fill()

        // Add subtle glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2
        )
        gradient.addColorStop(0, `rgba(201, 168, 76, ${star.opacity * twinkle * 0.3})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initStars()
    animate()

    window.addEventListener('resize', () => {
      resizeCanvas()
      initStars()
    })

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: isActive ? 1 : 0, transition: 'opacity 2s ease-in-out' }}
    />
  )
}
