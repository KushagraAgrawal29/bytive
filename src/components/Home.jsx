import React from "react";
import homepageData from "../data/data";
import Card from "./Card";

const Home = () => {
  return (
    <div className="container">
      <div className="cards">
        {homepageData.map((data, index) => {
          return <Card {...data} key={data.id}/>
        })}
      </div>
    </div>
  );
};

export default Home;
