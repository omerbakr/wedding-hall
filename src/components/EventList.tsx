"use client";

import { useState, useEffect } from "react";
import EventItem from "@/components/EventItem";
import { Event } from "@/types";

type EventListProps = {
  events: Event[];
  limit?: number;
  showActiveStatus?: boolean;
};

const EventList = ({ events, limit, showActiveStatus = false }: EventListProps) => {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNow(Date.now());
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const visibleEvents = limit ? events.slice(0, limit) : events;

  const isEventActive = (event: Event) => {
    if (!showActiveStatus || now === 0 || !event.starts_at || !event.ends_at) {
      return false;
    }

    const start = new Date(event.starts_at).getTime();
    const end = new Date(event.ends_at).getTime();

    return now >= start && now <= end;
  };

  return (
    <div className="w-full flex flex-col">
      {visibleEvents.map((event) => (
        <EventItem
          key={event.slug || event.id}
          {...event}
          isActive={isEventActive(event)}
        />
      ))}
    </div>
  );
};

export default EventList;