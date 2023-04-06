import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Alert, Spinner, Button, Container, Row, Col } from "reactstrap";
import "./contact.css";

const Contact = () => {
    
    return (
        <section>
           
            <Container>
                <h4 className="text"> Get in touch with us!</h4><br/>
              <a href="https://api.whatsapp.com/send?phone=09023397936" className="button">Send a message</a>
         

                </Container>
            </section>
    );
};

export default Contact;
