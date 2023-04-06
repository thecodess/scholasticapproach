import React, { Fragment } from "react";
import Contact from "../components/MockExam/MockExam";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MockExam = () => {
  return (
    <Fragment>
      <Header />
      <Contact/>
     
      <Footer />
    </Fragment>
  );
};

export default MockExam;
