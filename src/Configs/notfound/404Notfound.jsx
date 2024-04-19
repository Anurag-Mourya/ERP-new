import React, { useEffect } from "react";
import "./404notfound.scss";
import { Link } from "react-router-dom";

const Notfoundpage = () => {


  return (
    <div id="notfouncidsdk">
      <h1>404</h1>
<p>Oops! Something is wrong.</p>
<a className="button" href="/"><i className="icon-home"></i>Go back</a>
    </div>
  );
};

export default Notfoundpage;
