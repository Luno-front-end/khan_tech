import React from "react";
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
    </>
  );
};
