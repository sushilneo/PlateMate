import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import StepsSection from "@/components/steps-section"
import FeaturedMeals from "@/components/featured-meals"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StepsSection />
        <FeaturedMeals />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
