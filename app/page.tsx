import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import WhyEcoliaSection from "@/components/why-ecolia-section"
import ProductsSection from "@/components/products-section"
import ProcessSection from "@/components/process-section"
import TeamSection from "@/components/team-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyEcoliaSection />
      <ProductsSection />
      <ProcessSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
