import React from "react";
import "./backgroundeffects.scss";

const BackgroundEffect = () => {
  return (
    <div id="boxbackeffparent">
      <div className="boxbackeffectx1">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
      <div id="boxbackeffectx2" className="boxbackeffectx1">
        <div className="wave -one"></div>
        <div className="wave -two"></div>
        <div className="wave -three"></div>
      </div>
    </div>
  );
};

export default BackgroundEffect;
