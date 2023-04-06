import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";

import chooseImg from "../../assests/images/ebook.png";
import "./choose-us.css";

import ReactPlayer from "react-player";

const ChooseUs = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="choose__content">
              <h2>Our Products</h2>
              <b>
              DISTINCTION IN  GENERAL KNOWLEDGE
              </b>
              <p>
                A comprehensive and detailed book on general knowledge study for POST UTME.
              </p>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="choose__img">
          
            
                <img src={chooseImg} alt="" className="w-100" />
             

            
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChooseUs;
