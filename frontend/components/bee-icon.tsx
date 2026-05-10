"use client"

import { useState } from "react"

interface BeeIconProps {
  variant?: "default" | "footer"
  className?: string
}

export default function BeeIcon({ variant = "default", className = "" }: BeeIconProps) {
  const isFooter = variant === "footer"
  const [isAnimating, setIsAnimating] = useState(false)
  
  const handleMouseEnter = () => {
    setIsAnimating(true)
  }
  
  const handleMouseLeave = () => {
    setIsAnimating(false)
  }
  
  return (
    <div 
      className={`
        relative group cursor-pointer 
        ${isFooter ? 'bee-frames-footer-preload' : 'bee-frames-preload'}
        ${className}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative group-hover:animate-buzz-hover">
        <div
          className={`
            ${isFooter ? 'bee-sprite-footer' : 'bee-sprite'}
            ${isAnimating ? (isFooter ? 'bee-animate-footer' : 'bee-animate') : ''}
            ${isFooter ? 'w-24' : 'w-20'} 
            h-auto 
            transition-transform 
            duration-75
          `}
          style={{
            width: isFooter ? 96 : 80,
            height: isFooter ? 68 : 70,
            transform: isFooter ? "rotate(16deg)" : "rotate(-18deg)"
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}