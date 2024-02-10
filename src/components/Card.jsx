import React, { useState } from "react";

const Card = ({ id, name, image, bio, fieldOfInterest, techStack }) => {
  const [readMore, setReadMore] = useState(false);

  const description = readMore ? bio : `${bio.substring(0, 200)}....`;

  function readmoreHandler() {
    setReadMore(!readMore);
  }
  return (
    <div className="card">
      <img src={image} alt="" className="image" />
      <div className="employee-info">
        <div className="employee-details">
          <h4>{name}</h4>
        </div>
        <div className="description">
          {description}
          <span className="read-more" onClick={readmoreHandler}>
            {readMore ? `Show Less` : `Read More`}
          </span>
        </div>
        <div className="mt-5 text-bold text-red-400 text-xl">
          {fieldOfInterest}
        </div>
        <div className="gap-y-2 mt-2">
          {techStack.map((tech, ind) => (
            <div
              key={ind}
              className="flex flex-row bg-slate-300 rounded-lg gap-4 p-2 mb-1"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
