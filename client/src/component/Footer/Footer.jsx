import React from "react";
import logo from "../../assets/logo.jpg";
import {Link} from "react-router-dom"
import "./index.css";

function Footer() {
  return (
    <footer>
      <div className="mainFooterContainer">
        <div className="About">
          <div className="logoFooterContainer">
            <img src={logo} alt="" />
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla itaque, eveniet dignissimos eius quae nisi laudantium odit accusantium. Officiis, laborum.
          </div>
        </div>
        <div className="links">
          <h2>policy</h2>
          <ul>
            <li><Link>hdsajk</Link></li>
            <li><Link>hdsajk</Link></li>
            <li><Link>hdsajk</Link></li>
          </ul>
        </div>
        <div className="contact">
          <b>email</b> supprt@dosticky.com
        </div>
      </div>
      <div></div>
    </footer>
  );
}

export default Footer;
