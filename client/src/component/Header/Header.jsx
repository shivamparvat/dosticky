import React from "react";
import "./index.css";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpg";

function index() {
  return (
    <header className="header">
      <nav>
        {/* logo */}
        <div className="mainLogo">
          <Link to="/">
            <img src={logo} alt="dosticky" />
          </Link>
        </div>
        {/* search */}
        <div className="mainSearchCaintainer">
          <input
            type="search"
            placeholder="Search for products..."
            name="search"
            id="search"
          />
          <div className="searchIconcontainer" tabindex="3">
            <BiSearch size={25} className="searchIcone" />
          </div>
        </div>
        {/* tools */}
        <div className="headerToolber">
          {/* cetagory */}
          <div>
            <NavLink className="profile icon" to="/category">
              <BiCategoryAlt size={20} />
              <span>cetagory</span>
            </NavLink>
          </div>
          {/* cart */}
          <div>
            <NavLink className="profile icon" to="/cart">
              <BsBag size={20} />
              <span>cart</span>
            </NavLink>
          </div>
          {/* user */}
          <div>
            <div>
              <NavLink className="profile icon" to="/profile">
                <AiOutlineUser size={20} />
                <span>account</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>{" "}
      {/* links */}
      <hr />
      <div className="serachContainer">
        <div className="serachBox active">
          <div className="listOfReasult">
            <div className="card">
              <div className="imageContaimner">
                <img src={logo} alt="" />
              </div>
              <div>
                <span>sticker</span>
                <span>catagory</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default index;

// <div className="webnev">
//   <ul>
//     <li>
//       <NavLink className="nevLinks" to="/">home</NavLink>
//     </li>
//     <li>
//       <NavLink className="nevLinks" to="/category">category</NavLink>
//     </li>
//     <li>
//       <NavLink className="nevLinks" to="/cart">marvel
//       </NavLink>
//     </li>
//     <li>
//       <NavLink className="nevLinks" to="/">more</NavLink>
//     </li>
//   </ul>
// </div>
