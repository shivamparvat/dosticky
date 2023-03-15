import React from "react";
import { GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./Titel.css"

function Titel({ titel }) {
  return (
    <div className="Title">
      <div>
        <h2>{titel}</h2>
        <div className="allProduct">
          <Link to="/cart">
            <span>View all</span>
          </Link>
          <div>
            <GrNext size={12} />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Titel;
