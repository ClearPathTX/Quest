import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Values from "@/components/Values";
import TreatmentPhilosophy from "@/components/TreatmentPhilosophy";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import HolisticSupport from "@/components/HolisticSupport";
import CareExperience from "@/components/CareExperience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Values />
      <TreatmentPhilosophy />
      <About />
      <Testimonials />
      <HolisticSupport />
      <CareExperience />
      <Footer />
    </main>
  );
}
