import React from "react";
import "./about.css";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../../assests/images/about-us.png";


const AboutUs = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>About Us</h2>
              <p>
                We provide private and public tutorials for O-level certificate
                examinations with intelligent and experienced tutors.

              </p>

              <p>
               Provision of comprehensive and useful study materials.
              </p>
              <p>
              Educational consultation with passionate and experienced educational consultants.              </p>
              <p>
               Enabling a learning platform for programming and other professional skills.
              </p>
              <p>
               Providing in school services like accomodations, admission processing etc.    
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
