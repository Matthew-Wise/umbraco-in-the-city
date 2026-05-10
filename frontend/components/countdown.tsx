"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Anton } from "next/font/google"
import { cn } from "@/lib/utils"

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
})

interface TimeLeft {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

interface CountdownProps {
  targetDate: string
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date()
    let timeLeft: TimeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const formatTime = (value: number | undefined) => {
    return String(value || 0).padStart(2, "0")
  }

  return (
    <div className={cn("text-2xl md:text-3xl font-mono text-brand-yellow tracking-widest", anton.className)}>
      <span>{formatTime(timeLeft.days)}</span>
      <span className="mx-1 md:mx-2">:</span>
      <span>{formatTime(timeLeft.hours)}</span>
      <span className="mx-1 md:mx-2">:</span>
      <span>{formatTime(timeLeft.minutes)}</span>
      <span className="mx-1 md:mx-2">:</span>
      <span>{formatTime(timeLeft.seconds)}</span>
    </div>
  )
}

export default Countdown
