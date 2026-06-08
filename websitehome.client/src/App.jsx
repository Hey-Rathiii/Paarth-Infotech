import { useEffect } from "react";
import Lenis from "lenis";

import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import TechStack1 from './components/TechStack1';

function App() {

    useEffect(() => {

        const lenis = new Lenis({
            duration: 1.4,
            smoothWheel: true,
            smoothTouch: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };

    }, []);

    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <TechStack1 />
        </>
    );
}

export default App;