import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./features.css";

const FeatureData = [
  {
    title: "Scholastic Approach Tutorials",
    desc: "Scholastic Approach Tutorials is a major section of Scholastic Approach Services that provides Online and Physical Classes, Past Questions with detailed and explanatory Solutions, Online Mock Examination and lots more to help students get their dreamed success in O-level certificate Examinations",
    icon: "ri-draft-line",
  },

  {
    title: "Scholastic Approach Accomodations",
    desc: "Scholastic Approach Accomodations is another stem of Scholastic Approach Services in charge of  getting On-Campus and Off-Campus Accomodation for students, and more related services.",
    icon: "ri-home-line",
  },

  {
    title: "Scholastic Approach Admission Processing",
    desc: "From the very start of your decison to gain admission to the point where you are admitted, we've got you covered. You get educationa consultation and guidance with experienced consultants, registration/screening forms for external examination, purchase of result checkers for SSCE exam results, School news and other learning services for students, JAMB related services like upoading of O-level results to JAMB CAPS, JAMB result slip reprint, e.t.c ",
    icon: "ri-book-line",
  },
  {
    title: "Skill Up Bootcamp",
    desc: "Skill Up Bootcamp is another stem of Scholastic Approach Services that offers training on high-value skills like Programming, Sales & Marketing, Fininancial Education for Entrepreneurs, Human relations & Public Speaking, Copywriting and other high in demand trades and skills.  ",
    icon: "ri-computer-line",
  },
];

const Features = () => {
  return (
    <section>
      <Container>
        <Row>
          {FeatureData.map((item, index) => (
            <Col lg="4" md="6" key={index}>
              <div className="single__feature text-center px-4">
                <h2 className="mb-3">
                  <i class={item.icon}></i>
                </h2>
                <h6>{item.title}</h6>
                <p>{item.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Features;
