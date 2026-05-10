import Image from "next/image";

interface PatternButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  disabled?: boolean;
}

export default function PatternButton({
  children,
  href,
  className = "",
  disabled = false,
}: PatternButtonProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Button */}
      <a
        href={disabled ? undefined : href}
        disabled={disabled}
        className={`font-share-tech text-xl py-2 transition-colors relative z-10 flex items-center justify-center gap-2 md:pl-12 pl-8 md:pr-7 pr-3 overflow-hidden ${
          disabled
            ? "bg-brand-yellow/50 text-black/50 cursor-not-allowed"
            : "bg-brand-yellow text-black hover:bg-yellow-400"
        }`}
      >
        {/* Left side pattern */}
        <div
          className={`absolute left-0 top-0 ${disabled ? "opacity-50" : ""}`}
        >
          <Image
            src="/assets/button-pattern.svg"
            alt=""
            width={38}
            height={97}
            className="h-full md:w-auto w-6 object-contain"
          />
        </div>
        {children}
      </a>
    </div>
  );
}
