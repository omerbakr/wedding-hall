import EventItem from "@/components/EventItem";
import { Event } from "@/types";

type EventListProps = {
  events: Event[];
  limit?: number;
  showActiveStatus?: boolean;
};

const EventList = ({ events, limit, showActiveStatus = false }: EventListProps) => {
  const now = new Date();

  const visibleEvents = limit ? events.slice(0, limit) : events;

  const isEventActive = (event: Event) => {
    if (!showActiveStatus || !event.starts_at) return false;
    
    const eventDate = new Date(event.starts_at);
    return eventDate.toDateString() === now.toDateString(); 
  };

  return (
    <div className="w-full flex flex-col">
      {visibleEvents.map((event) => (
        <EventItem
          key={event.slug + event.date}
          {...event}
          isActive={isEventActive(event)}
        />
      ))}
    </div>
  );
};

export default EventList;