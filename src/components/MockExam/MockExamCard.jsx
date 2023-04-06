import React from "react";
import { Link } from "react-router-dom";

const MockExamCard = (props) => {
  const { imgUrl, title, link} = props.item;

  return (
    <div className="single__free__course">
      <div className="free__course__img mb-5">
        <img src={imgUrl} alt="" className="w-100" />
        <Link to={link}><button className="btn free__btn">Start Test</button></Link>
      </div>

      <div className="free__course__details">
        <h4><b>{title}</b></h4>

        
      </div>
    </div>
  );
};

export default MockExamCard;
