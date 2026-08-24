import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import TechStack1 from "../components/TechStack1";
import Programs from "../components/Programs";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

function HomePage() {
    return (
        <main>
            <Hero />
            <About />
            <Services />
            <TechStack1 />
            <Programs />
            <Testimonials />
            <FAQ />
            <Contact />
        </main>
    );
}

export default HomePage;
