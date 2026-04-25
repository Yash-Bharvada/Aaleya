'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface LetterSectionProps {
  // 💌 REPLACE: Change the name to your friend's actual name
  recipientName?: string
  // 💌 REPLACE: Change to your own name
  senderName?: string
}

// 💌 REPLACE: Customize this letter message
const letterContent = `Happy Birthday. Words can't hold everything I feel. But if I tried — I'd say you are the kind of person who makes the world quieter, softer, and more beautiful just by being in it. Thank you for existing. Thank you for being my person. This day belongs to you.`

export function LetterSection({ recipientName = "Ayesha", senderName = "Your Name" }: LetterSectionProps) {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [displayedText, setDisplayedText] = useState('')
  const [showSeal, setShowSeal] = useState(false)

  const fullText = `${letterContent.replace('[Name]', recipientName)}`

  useEffect(() => {
    if (!isInView) return

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowSeal(true), 500)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [isInView, fullText])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-20 px-6 relative"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(5,5,5,0.8) 0%, #050505 70%)',
      }}
    >
      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-birthday-gold mb-8 italic">
            A Letter to You
          </h2>

          <div className="relative bg-birthday-black/30 border border-birthday-gold/20 rounded-sm p-8 md:p-12">
            <p className="font-serif text-birthday-ivory text-lg md:text-xl leading-relaxed text-left whitespace-pre-wrap">
              {displayedText}
              <motion.span
                className="inline-block w-[2px] h-5 bg-birthday-gold ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            </p>

            {/* Signature */}
            <motion.div
              className="mt-8 text-right"
              initial={{ opacity: 0 }}
              animate={showSeal ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="font-serif italic text-birthday-rose text-lg">
                With all my love,
              </p>
              <p className="font-serif text-birthday-gold text-xl mt-1">
                {/* 💌 REPLACE: [Your Name] with your actual name */}
                {senderName}
              </p>
            </motion.div>
          </div>

          {/* Wax Seal */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={showSeal ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.5
            }}
          >
            <div className="relative">
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                className="text-birthday-gold"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="currentColor"
                  className="drop-shadow-lg"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#050505"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <text
                  x="40"
                  y="45"
                  textAnchor="middle"
                  fill="#050505"
                  fontSize="24"
                  fontFamily="serif"
                >
                  ♥
                </text>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
