import React, { FC } from "react";

import { Header } from "./Client/Header/Header";
import { Hero } from "./Client/Sections/Hero/Hero";
import { Footer } from "./Client/Footer/Footer";

const Testimonials = React.lazy(
  () => import("./Client/Sections/Testimonials/Testimonials")
);

export const Client: FC = () => {
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
