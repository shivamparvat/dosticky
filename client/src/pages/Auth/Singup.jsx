import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { singup } from "../../redux/actions/user";
import "./auth.css";
function Singup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function SubmitHeadler(e){
    e.preventDefault();
    dispatch(singup({ name, email, gender, number, password }));
  };

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    const isAuth = isAuthenticated || false;
    if (isAuth) navigate("/profile");
  }, [isAuthenticated]);

  return (
    <div className="singupmainContainer">
      <div className="SingupCaontainer auth">
        <div>
          <h1>Registration</h1>
        </div>
        <form action="" onSubmit={SubmitHeadler}>
          <div className="nameGender">
            <div className="nameCaontainer">
              <div>
                <label htmlFor="name">full name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Fullname"
                />
              </div>
              <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
            </div>
            <div className="genderCaontainer">
              <div>
                <label htmlFor="gender">gender</label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
            </div>
          </div>
          <div className="emailnumber">
            <div className="emailCaontaineer">
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
              <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
            </div>

            <div className="mobileNumberCaontainer">
              <label className="numberLabel" htmlFor="number">
                number
              </label>
              <input
                type="text"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Number"
              />
              <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
            </div>
          </div>
          <div className="passwordContainer">
            <div className="password">
              <label htmlFor="password">password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            <div className="conformPassword">
              <input
                id="conformPassword"
                type="password"
                value={conformPassword}
                onChange={(e) => setConformPassword(e.target.value)}
                placeholder="confirm password"
              />
              <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
            </div>
          </div>
          <div className="liknksCaontaier">
            <p>
              I already have account <Link to="/login">Login</Link>
            </p>
          </div>
          <div className="singupbutton">
            <input type="submit" value="login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Singup;
