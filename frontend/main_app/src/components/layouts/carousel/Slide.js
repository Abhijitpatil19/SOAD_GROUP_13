import React from "react";

const Slide = ({ image }) => {
  return (
    <div className="slide mar_l-16 cur">
      <img
        alt=""
        src={image}
        className="w-100 h-100 round-8 slide_image shadow_1-1-4-light"
      ></img>
    </div>
  );
};

export default Slide;
