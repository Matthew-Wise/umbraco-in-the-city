import Image from "next/image"
import Link from "next/link"
import BeeIcon from "@/components/bee-icon"

interface FooterProps {
  copyrightText: string
  showBeeIcon?: boolean
}

export default function Footer({ copyrightText, showBeeIcon = true }: FooterProps) {
  return (
    <footer className="bg-brand-yellow text-black py-8 lg:py-16 px-4 relative">
      {/* Left side pattern */}
      <div className="absolute left-0 top-0 h-full">
        <Image
          src="/assets/footer-pattern.svg"
          alt=""
          width={153}
          height={398}
          className="h-full w-10 sm:w-20 object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto text-left lg:text-center relative z-10">
        <div className="space-y-2 mx-16 sm:mx-24 md:mx-28 lg:mx-0">
          <p className="font-share-tech text-base lg:text-sm">
            {copyrightText}
          </p>
          <p className="font-share-tech text-sm lg:text-xs space-x-4">
            <Link href="/" className="underline hover:no-underline">
              Home
            </Link>
            <span>•</span>
            <Link href="/schedule" className="underline hover:no-underline">
              Schedule
            </Link>
            <span>•</span>
            <Link href="/code-of-conduct" className="underline hover:no-underline">
              Code of Conduct
            </Link>
          </p>
        </div>
        
        {showBeeIcon && (
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 scale-75 sm:scale-100 origin-right">
            <BeeIcon variant="footer" />
          </div>
        )}
      </div>
    </footer>
  )
}