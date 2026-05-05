import React, { PropsWithChildren } from 'react'
import { motion } from 'framer-motion'

export const premiumEase = [0.33, 1, 0.68, 1]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: premiumEase } },
}

export function ScrollSection({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={container}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export const SectionHeading: React.FC<PropsWithChildren<{ className?: string; as?: string }>> = ({ children, className = '', as = 'h2' }) => {
  const Tag: any = (motion as any)[as] || motion.h2
  return (
    <Tag variants={item} className={className}>
      {children}
    </Tag>
  )
}

export const SectionText: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <motion.p variants={item} className={className}>
    {children}
  </motion.p>
)

export const RevealImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement> & { className?: string }> = ({ className = '', ...props }) => (
  <motion.div variants={item} style={{ overflow: 'hidden' }}>
    <motion.img
      {...props}
      className={className}
      initial={{ x: 36, clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ x: 0, clipPath: 'inset(0 0% 0 0)' }}
      transition={{ duration: 0.9, ease: premiumEase }}
      loading="lazy"
    />
  </motion.div>
)

export default ScrollSection
