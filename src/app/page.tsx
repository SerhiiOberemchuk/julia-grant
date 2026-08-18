import { site } from "@/content/site";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { MobileBar } from "@/components/ui/MobileBar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { Programs } from "@/components/sections/Programs";
import { Calculator } from "@/components/sections/Calculator";
import { Services } from "@/components/sections/Services";
import { Compare } from "@/components/sections/Compare";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Cases } from "@/components/sections/Cases";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: site.brand.name,
        description: site.seo.description,
        url: site.url,
        telephone: site.contacts.phoneDisplay,
        email: site.contacts.email,
        areaServed: { "@type": "Country", name: "Україна" },
        priceRange: "$$",
        founder: { "@type": "Person", name: "Юлія" },
        sameAs: [site.contacts.instagram, site.contacts.telegram, site.contacts.olx],
      },
      {
        "@type": "FAQPage",
        mainEntity: site.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Programs />
        <Calculator />
        <Services />
        <Compare />
        <Process />
        <About />
        <Cases />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
      <JsonLd />
    </>
  );
}
