import React, { Fragment } from "react";
import Contact from "../components/Contact/Contact";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <Contact/>
     
      <Footer />
    </Fragment>
  );
};

export default Home;
