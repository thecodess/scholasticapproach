import React from "react";
import { Container, Row, Col } from "reactstrap";

import courseImg01 from "../../assests/images/mathematics.png";
import courseImg02 from "../../assests/images/english.png";
import courseImg03 from "../../assests/images/physics.jpg";
import courseImg04 from "../../assests/images/chemistry.jpg";
import courseImg05 from "../../assests/images/biology.png";
import courseImg06 from "../../assests/images/general-knowledge.webp";
import courseImg07 from "../../assests/images/economics.jpg";
import courseImg08 from "../../assests/images/accounting.jpg";
import courseImg09 from "../../assests/images/crs.webp";
import courseImg010 from "../../assests/images/government.jpg";
import courseImg011 from "../../assests/images/literature.jpg";
import courseImg012 from "../../assests/images/commerce.jpg";
import MockExamCard from "./MockExamCard";

import "./mockexam.css";

const mockexamData = [
  {
    id: "01",
    title: "Mathematics",
    imgUrl: courseImg01,
    link:"/mock-exams/mathematics"
  },
  {
    id: "02",
    title: "English",
    imgUrl: courseImg02,
    link:"/mock-exams/english-language"
  },

  {
    id: "03",
    title: "Physics",
    imgUrl: courseImg03,
    link:"/mock-exams/physics"
  },

  {
    id: "04",
    title: "Chemistry",
    imgUrl: courseImg04,
    link:"/mock-exams/chemistry"
  },
  {
    id: "05",
    title: "Biology",
    imgUrl: courseImg05,
    link:"/mock-exams/biology"
  },
  {
    id: "06",
    title: "General Knowledge",
    imgUrl: courseImg06,
    link:"/mock-exams/general-knowledge"
  },
  
  {
    id: "07",
    title: "Economics",
    imgUrl: courseImg07,
    link:"/mock-exams/economics"
  },
  {
    id: "08",
    title: "Government",
    imgUrl: courseImg010,
    link:"/mock-exams/government"
  },
  {
    id: "09",
    title: "CRS",
    imgUrl: courseImg09,
    link:"/mock-exams/crs"
  },
  {
    id: "010",
    title: "Accounting",
    imgUrl: courseImg08,
    link:"/mock-exams/accounting"
  },
  {
    id: "011",
    title: "Literature-in-English",
    imgUrl: courseImg011,
    link:"/mock-exams/literature"
  },
  {
    id: "012",
    title: "Commerce",
    imgUrl: courseImg012,
    link:"/mock-exams/commerce"
  },
];

const MockExam = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">Pick a subject</h2>
          </Col>

          {mockexamData.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <MockExamCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default MockExam;
