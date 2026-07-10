import { BirthChartPreview } from "./_sections/birth-chart-preview";
import { Faq } from "./_sections/faq";
import { Features } from "./_sections/features";
import { Hero } from "./_sections/hero";
import { HowItWorks } from "./_sections/how-it-works";
import { PlanetAnimation } from "./_sections/planet-animation";
import { Pricing } from "./_sections/pricing";
import { Testimonials } from "./_sections/testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PlanetAnimation />
      <BirthChartPreview />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Faq />
    </main>
  );
}
