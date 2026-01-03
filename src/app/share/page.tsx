import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import EventList from "@/components/EventList";

const Page = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: events, error } = await supabase
    .from("events")
    .select("couple_name, date, organization, slug, starts_at")
    .order("starts_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch events:", error);
    return <div className="text-red-500 p-10 text-center">Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</div>;
  }

  return (
    <section className="flex flex-col p-4 md:p-8 mt-4 text-primary w-full mx-auto">
      <h1 className="text-center font-corinthia font-bold text-4xl pb-5 border-b md:text-5xl">
        Geçmiş Albümlerimiz
      </h1>
      
      <EventList events={events || []} showActiveStatus={false} />
    </section>
  );
};

export default Page;