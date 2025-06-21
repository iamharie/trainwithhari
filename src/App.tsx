import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import CalorieTracker from "./components/CalorieTracker";
import MealPlanner from "./components/MealPlanner";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64; // 16 * 4 = 64px (h-16 class)
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <section id="home">
          <Hero onGetStarted={() => scrollToSection("services")} />
        </section>

        <section id="services" className="pt-16">
          <Services />
        </section>

        <section id="calories" className="pt-16">
          <CalorieTracker />
        </section>

        <section id="meal-planner" className="pt-16">
          <MealPlanner />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
