import React from "react";
import logo from "../../assets/newLogo.png";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiYoutube } from "react-icons/fi";
import "./index.css";

function Footer() {
  return (
    <footer>
      <div className="mainFooterContainer">
        <div className="About">
          <div className="title">
            <h2>About</h2>
          </div>
          <div className="logoFooterContainer">
            <img src={logo} alt="" />
          </div>
          <div className="AboutDistrition">
            Welcome to Do Sticky, we are here to provide you high quality
            stickers. We have a wide range of eye-catching and attractive
            Stickier Do Sticky is a platform where you can find stickers of your
            favorite things.
          </div>
          <div className="socialMedia">
            <div>
              <h2>Social links</h2>
            </div>
            <ul>
              <li>
                <Link>
                  <FiFacebook />
                </Link>
              </li>
              <li>
                <Link>
                  <FiInstagram />
                </Link>
              </li>
              <li>
                <Link>
                  <FiYoutube />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="links">
          <h2>policy & pages</h2>
          <ul>
            <li>
              <Link>privacy policy</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>contact</Link>
            </li>
            <li>
              <Link>categorys</Link>
            </li>
            <li>
              <Link>gifts</Link>
            </li>
          </ul>
        </div>
        <div className="contact">
          <div>
            <h2>Contact</h2>
            <b>E  mail</b> <span className="primary-color">supprt@dosticky.com</span>
          </div>
          <div className="contactForm">
            <div><h2>contact Form</h2></div>
            <form action="">
              <input type="email" placeholder="email"/>
              <input type="text" placeholder="subject"/>
              <textarea name="msg" id="msg" cols="30" rows="10" placeholder="type user massage"></textarea>
              <input type="submit" value="submit" />
            </form>
          </div>
        </div>
      </div>
      <div className="copyRight"></div>
    </footer>
  );
}

export default Footer;
