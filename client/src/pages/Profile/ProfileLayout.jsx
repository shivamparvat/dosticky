import React, { useEffect, useState } from "react";
import "./profile.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/user";

function ProfileLayout() {
  const [newaddress, setNewaddress] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const isAuth = isAuthenticated || false;
    // if (!isAuth) {
    //   navigate("/login");
    // }
  }, [isAuthenticated]);

  function logoutButton() {
    dispatch(logOut());
  }

  return (
    <div className="profile">
      <div className="heading">
        <div>
          <p className="name">{user?.name}</p>
          <p className="email">{user?.email}</p>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="nevmeans">
          <ul>
            <NavLink className="orders" to="/profile">
              <li>orders</li>
            </NavLink>
            <NavLink className="address" to="address">
              <li>address</li>
            </NavLink>
            <NavLink className="personal" to="personal">
              <li>personal</li>
            </NavLink>
            <NavLink className="refere" to="refere">
              <li>refere</li>
            </NavLink>
            <NavLink className="notification" to="notification">
              <li>notification</li>
            </NavLink>
            <li onClick={() => logoutButton()}>logout</li>
          </ul>
        </div>
        <div className="details">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
