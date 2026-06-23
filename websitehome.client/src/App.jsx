import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "tailwindcss";
/*import Lenis from "@studio-freight/lenis";*/
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import TechStack1 from "./components/TechStack1";
import Programs from "./components/Programs";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
//import Map from "./components/Map";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

function App() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            smoothWheel: true,
            smoothTouch: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <TechStack1 />
            <Programs />
            <Testimonials />
            <FAQ />
            <Contact />

            <Footer />
        </>
    );
}

export default App;