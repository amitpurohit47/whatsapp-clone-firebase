import React from "react";
import './Loader.css';

function Loader() {
  return (
    <div className="loader_box">
        <div className="loader_container">
          <span className="loader_circle"></span>
          <span className="loader_circle"></span>
          <span className="loader_circle"></span>
          <span className="loader_circle"></span>
        </div>
    </div>
  );
}

export default Loader;
