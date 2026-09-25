import React, { useEffect } from "react";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import SEO from "./components/SEO";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import Portfolio from "./components/Portfolio";
import Calculator from "./components/Calculator";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div className="App">
      <SEO />
      <Header />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Portfolio />
        <Calculator />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <FloatingButtons />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
