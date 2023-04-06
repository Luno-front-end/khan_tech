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

// server:
//   image: node:18.13.0
//   container_name: khan_tech
//   build:
//     context: ./server
//     dockerfile: Dockerfile
//   env_file:
//     - ./server/.env
//   volumes:
//     - ./:/server/app
//     - /server/app/node_modules
//   ports:
//     - "8080:8080"
//   command: npm run start:dev
//   depends_on:
//     - database_mysql

// client:
//   build:
//     context: ./client # контекст будується з папки client
//     dockerfile: Dockerfile # використовується Dockerfile з кореневої директорії
//   ports:
//     - "3000:3000" # прокидуємо порт 3000
