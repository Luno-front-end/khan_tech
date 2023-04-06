import React from "react";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Sections/Hero/Hero";
import { Testimonials } from "./components/Sections/Testimonials/Testimonials";

export const App = () => {
  return (
    <>
      <header className="header">
        <Header />
      </header>

      <main>
        <Hero />
        <Testimonials />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
};
