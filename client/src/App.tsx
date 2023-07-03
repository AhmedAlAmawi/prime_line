import React from "react";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import Form from "./components/Form";
import FAQ from "./components/FAQ";

const App: React.FC = () => {
  return (
    <main>
      <Header />
      <Hero />
      <Form />
      <FAQ />
    </main>
  );
};

export default App;
