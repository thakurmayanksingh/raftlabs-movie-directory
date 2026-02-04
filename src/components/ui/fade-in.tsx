"use client"

import { motion } from "framer-motion"

// 1. Simple Fade In (for titles, buttons)
export function FadeIn({ 
  children, 
  delay = 0, 
  className 
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start slightly below and invisible
      animate={{ opacity: 1, y: 0 }}  // Move up and fade in
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Custom "spring-like" ease for premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 2. Stagger Container (for lists/grids)
// This orchestrates the "Waterfall" effect where cards appear one by one
export function StaggerContainer({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-100px" }} // Triggers when element is in view
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1, // 0.1s delay between each item
            delayChildren: 0.2
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}