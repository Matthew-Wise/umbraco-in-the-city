interface ScheduleItem {
  time: string;
  activity: string;
  description?: React.ReactNode;
  link?: string;
  linkText?: string;
}

interface ScheduleDay {
  day: string;
  date: string;
  items: ScheduleItem[];
}

interface EventScheduleProps {
  title: string;
  scheduleData: ScheduleDay[];
}

export type { ScheduleItem, ScheduleDay };

import Link from "next/link";

export default function EventSchedule({
  title,
  scheduleData,
}: EventScheduleProps) {
  return (
    <section className="border-t border-brand-yellow pt-8 md:pt-16">
      <div className="space-y-8">
        <h2 className="font-bayon text-5xl lg:text-6xl text-brand-yellow tracking-wide">
          {title}
        </h2>

        <div className="space-y-8 md:space-y-12">
          {scheduleData.map((day, dayIndex) => (
            <div key={dayIndex} className="space-y-4">
              <h3 className="font-bayon text-3xl lg:text-4xl text-brand-yellow">
                {day.day}
                <span className="font-share-tech text-lg lg:text-xl ml-4 font-normal">
                  {day.date}
                </span>
              </h3>

              <div className="space-y-4">
                {day.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-l-2 border-brand-yellow/30 pl-4 md:pl-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
                      <div className="font-share-tech text-brand-yellow font-medium text-lg md:text-xl whitespace-nowrap min-w-[100px] md:min-w-[120px]">
                        {item.time}
                      </div>
                      <div className="flex-1 space-y-1">
                        <h4 className="font-share-tech text-xl md:text-2xl font-semibold text-white">
                          {item.activity}
                        </h4>
                        {item.description && (
                          <p className="font-share-tech text-base md:text-lg leading-relaxed text-white">
                            {item.description}
                          </p>
                        )}
                        {item.link && item.linkText && (
                          <Link
                            href={item.link}
                            className="font-share-tech text-base md:text-lg text-white hover:text-brand-yellow transition-colors underline hover:no-underline inline-block pt-1"
                          >
                            {item.linkText} →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
