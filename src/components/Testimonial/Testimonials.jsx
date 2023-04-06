import React from "react";
import "./testimonial.css";
import { Container, Row, Col } from "reactstrap";
import Slider from "react-slick";

import img from "../../assests/images/testimonial01.png";

const Testimonials = () => {
  const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="10" md="12" className="m-auto">
            <div className="testimonial__wrapper d-flex justify-content-between align-items-center ">
              <div className="testimonial__img w-50">
                <img src={img} alt="" className="w-100" />
              </div>

              <div className="testimonial__content w-50">
                <h2 className="mb-4">Our Students Voice</h2>

                <Slider {...settings}>
                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                      
                      </h6>
                      <p>
                       Wow! Such an amazing and well detailed book I must say. 
                       It covers a wide range of general knowledge. With all 
                       the information contained in this, I see no reason why 
                       anyone should not do well in any test requiring this
                       field of knowledge.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Emmanuella</h6>
                        <p>First class graduate dept. of microbiology 2019</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                       
                      </h6>
                      <p>
                       Honestly, I made the right decision by suing the book "Distinction in General Knowledge"
                       because it really helped me during the POST UTME exam as the book hd answers to most of the questions
                       in General Knowledge.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Oyinkansola</h6>
                        <p>Department of Law, Unilag.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="single__testimonial">
                      <h6 className="mb-3 fw-bold">
                       
                      </h6>
                      <p>
                        To be sincere, DISTINCTION IN GENERAL KNOWLEDGE TEXTBOOK is an indeible
                        material worth reading for POSTUTME. I became loaded with ample information
                        after reading it and ultimately some questions set in the 
                        examination came out from it. A big kudos and adoration to the author.
                      </p>

                      <div className="student__info mt-4">
                        <h6 className="fw-bold">Adeniyi</h6>
                        <p>Department of chemical engineering, Unilag.</p>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;
