import React from "react";
import "./Types.css";

const Types = () => {
  const image1 = [
    {
      img: "./blogs4.jpg",
      h3: "Personal Blogs",
    },
    {
      img: "./blogs5.jpeg",
      h3: "Educational Blogs",
    },
    {
      img: "./blogs6.avif",
      h3: "Lifestyle Blogs",
    },

    {
      img: "./blogs7.jpg",
      h3: "Tech Blogs",
    },
    {
      img: "./blogs8.jpg",
      h3: "Business Blogs",
    },
    {
      img: "./blogs9.jpg",
      h3: "News Blogs",
    },
  ];
  return (
    <>
      <h1 className="create">CREATE BLOGS</h1>
      <hr className="hr"/>

      <div className="container">
        
        <div className="row">
          {image1.map((img1, index) => (
            <div className="col-lg-4 col" key={index}>
              <img src={img1.img} alt={img1.p} className="blog-image" />
              <a href="#">
              <div className="types">
                <h6>{img1.h3}</h6>
                <a href="#" className="lin">Click here to create blog</a>
                <div className="non"></div>
              </div>
              </a>
            </div>
          ))}
        </div>
        
      </div>
      
    </>
  );
};

export default Types;
