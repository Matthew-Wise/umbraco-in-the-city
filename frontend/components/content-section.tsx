import BeeIcon from "@/components/bee-icon"

interface ContentSectionProps {
  title: string
  content: string | string[]
  showBeeIcon?: boolean
  children?: React.ReactNode
}

export default function ContentSection({ title, content, showBeeIcon = false, children }: ContentSectionProps) {
  const contentArray = Array.isArray(content) ? content : [content]
  
  return (
    <section className="border-t border-brand-yellow pt-8 md:pt-16 relative">
      <div className="space-y-6">
        <h2 className="font-bayon text-5xl lg:text-6xl text-brand-yellow tracking-wide">
          {title}
        </h2>
        
        {contentArray.map((paragraph, index) => (
          <p key={index} className="font-share-tech text-lg leading-relaxed">
            {paragraph}
          </p>
        ))}
        
        {children && (
          <div className="pt-4">
            {children}
          </div>
        )}
      </div>
      
      {showBeeIcon && (
        <>
          {/* Bee Icon - Top for small screens */}
          <div className="absolute top-8 right-0 md:hidden scale-75 origin-top-right">
            <BeeIcon />
          </div>
          
          {/* Bee Icon - Bottom for md+ screens */}
          <div className="absolute -bottom-16 right-0 hidden md:block">
            <BeeIcon />
          </div>
        </>
      )}
    </section>
  )
}