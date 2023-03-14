import React from "react";
import "./index.css";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { BsBag } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

function index() {
  return (
    <header className="header">
      <nav>
        {/* logo */}
        <div>
          <Link to="/">
            <img src="#" alt="dosticky" />
          </Link>
        </div>
        {/* links */}
        <div className="webnev">
          <ul>
            <li>
              <NavLink className="nevLinks" to="/">home</NavLink>
            </li>
            <li>
              <NavLink className="nevLinks" to="/category">category</NavLink>
            </li>
            <li>
              <NavLink className="nevLinks" to="/cart">marvel
              </NavLink>
            </li>
            <li>
              <NavLink className="nevLinks" to="/">more</NavLink>
            </li>
          </ul>
        </div>
        {/* tools */}
        <div>
          {/* search */}
          <div>
            <input type="search" name="search" id="search" />
            <BiSearch/>
          </div>
          {/* user */}
          <div>
            <div>
              <Link to="/profile"><AiOutlineUser/></Link>
            </div>
          </div>
          {/* cart */}
          <div> 
            <Link to="/cart"><BsBag/></Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default index;
