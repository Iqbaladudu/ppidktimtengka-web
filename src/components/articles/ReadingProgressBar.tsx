'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgressBar() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar only after scrolling down a bit (e.g., 100px)
      const shouldShow = window.scrollY > 100
      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full bg-emerald-600 origin-left"
      style={{ scaleX }}
    />
  )
}
