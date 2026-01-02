import { cookies } from "next/headers";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import EventList from "@/components/EventList";

const Events = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: events, error } = await supabase
    .from("events")
    .select("couple_name, date, organization, slug, starts_at, ends_at")
    .order("starts_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch events:", error);
    return null;
  }

  if (!events?.length) return null;

  return (
    <section id="album" className="flex flex-col items-center p-4 md:p-8 mt-16 text-primary w-full mx-auto">
      <h1 className="w-full text-center font-corinthia font-bold pb-5 border-b text-4xl md:text-5xl">
        Albümlerimiz
      </h1>

      <EventList events={events} limit={5} showActiveStatus={true} />

      <Link
        href="/share"
        className="py-2 px-6 mt-10 font-semibold bg-primary text-white rounded-sm hover:opacity-90 transition-opacity"
      >
        Tümünü Gör
      </Link>
    </section>
  );
};

export default Events;