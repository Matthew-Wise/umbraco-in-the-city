import React from "react"
import { LucideIcon } from "lucide-react"

interface InfoRowProps {
  icon: LucideIcon
  text: string
}

export default function InfoRow({ icon: Icon, text }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <div className="relative w-[35px] h-[31px] sm:w-[55px] sm:h-[49px] flex items-center justify-center">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 55 49' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M41.25 0H13.75L0 24.5L13.75 49H41.25L55 24.5L41.25 0Z' fill='%23FFCC33'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        />
        <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-brand-dark relative z-10" />
      </div>
      <span className="font-share-tech text-base lg:text-lg text-white">{text}</span>
    </div>
  )
}