import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotpassword, setForgotpassword] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  function SubmitHeadler(e) {
    e.preventDefault();
    console.log(email, password); 
    dispatch(login({ email, password }));
  }
  useEffect(() => {
    const isAuth = isAuthenticated || false;
    if (isAuth) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="loginmainContainer">
      <div className="loginCaontainer auth">
        <div>
          <h1>Login</h1>
        </div>
        <form action="" onSubmit={SubmitHeadler}>
          <div className="emailCaontainer">
            <label  htmlFor="email">Email</label>
            <input
              type="email"
              className="emaillogin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
          <div className="passwordContainer">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="passwordlogin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <br />
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
          <div className="liknksContaier">
            <p>
              i already have account <Link to="/singup">registration</Link>
            </p>
            {forgotpassword ? (
              <div className="forgotpasswordCaontainer">
                <div className="emailCaontainer">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email"
                    />
                    <div className="errorMsg">
                      {/* <p>Lorem, ipsum dolor.</p> */}
                    </div>
                  </div>
                  <div>
                    <div className="loginbutton done1234">
                      <input type="button" value="forget" />
                    </div>
                  </div>
                  <div>
                    <RxCross1 onClick={() => setForgotpassword(false)} />
                  </div>
                </div>
              </div>
            ) : (
              <p
                onClick={() =>
                  forgotpassword
                    ? setForgotpassword(false)
                    : setForgotpassword(true)
                }
                style={{ color: "blue", cursor: "pointer" }}
              >
                forgot password
              </p>
            )}
          </div>
          {console.log("hk")}
          <div className="loginbutton">
            <input type="submit" value="login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

