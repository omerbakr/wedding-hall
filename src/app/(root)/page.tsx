import Events from "@/sections/Events";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Testimonials from "@/sections/Testimonials";
import Transportation from "@/sections/Transportation";

import { getActiveEventSlug } from "@/utils/get-active-event";

const Page = async () => {
  const activeSlug = await getActiveEventSlug();

  return (
    <>
      <Hero activeSlug={activeSlug} />
      <Events />
      <Services />
      <Testimonials />
      <Transportation />
    </>
  );
};

export default Page;