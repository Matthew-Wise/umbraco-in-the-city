import Image from "next/image";
import Countdown from "@/components/countdown";
import PatternButton from "@/components/pattern-button";

interface HeaderProps {
  targetDate: string;
  statusText?: string;
  buttonText: {
    mobile: string;
    desktop: string;
  };
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
}

export default function Header({
  targetDate,
  statusText = "TICKETS COMING SOON",
  buttonText,
  buttonDisabled = false,
  onButtonClick,
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-brand-dark border-b-2 border-brand-yellow md:h-[84px] h-[60px] w-full grid grid-cols-4 lg:grid-cols-5 items-center">
      {/* Left side pattern */}
      <div className="flex items-center overflow-hidden h-full">
        <Image
          src="/assets/header-pattern.svg"
          alt=""
          width={89}
          height={232}
          className="md:w-16 w-8 object-cover object-top"
        />
      </div>

      <div className="hidden lg:flex items-center -m-12">
        <p className="font-share-tech text-xl text-brand-yellow">
          {statusText}
        </p>
      </div>

      <div className="flex items-center justify-start md:justify-center col-span-2 lg:col-span-1 -ml-12 sm:ml-0">
        <Countdown targetDate={targetDate} />
      </div>

      <div className="flex items-center justify-end lg:col-span-2 md:pr-4 pr-2">
        <PatternButton href="https://www.tickettailor.com/events/umbukfdn/1804177">
          <span className="sm:hidden whitespace-nowrap">
            {buttonText.mobile}
          </span>
          <span className="hidden sm:inline whitespace-nowrap">
            {buttonText.desktop}
          </span>
        </PatternButton>
      </div>
    </div>
  );
}
