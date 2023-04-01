import React, { useEffect, useState } from "react";
// import OrderCard from "./conponent/OrderCard";
import NewAddress from "../Checkout/component/NewAddress";
import AddressCard from "../Checkout/component/AddressCard";
import { AiOutlinePlus } from "react-icons/ai";
import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/user";
function Profile() {
  const [newaddress, setNewaddress] = useState(false);

  const navigate = useNavigate();
  const dispatch =useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    const isAuth = isAuthenticated || false;
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuthenticated]);

function logoutButton() {
    dispatch(logOut())
  }

  return (
    <div className="profile">
      <div className="heading">
        <div>
          <p className="name">{user && user.user.name}</p>
          <p className="email">{user && user.user.email}</p>
        </div>
      </div>
      <hr />
      <div className="content">
        <div className="nevmeans">
          <ul>
            <li>orders</li>
            <li>address</li>
            <li>personal</li>
            <li>refere</li>
            <li>notification</li>
            <Link to="/dashboard"><li>dashboard</li></Link>
            <li onClick={()=>logoutButton()}>logout</li>
          </ul>
        </div>
        <div className="details">
          {/* <OrderCard /> */}
          <div className="addreses">
            <div className="oldAddress">
              <div>
                <div className="headding">
                  <h2>Delivery Address</h2>
                  {newaddress ? (
                    <>
                      <NewAddress />
                      <p
                        className="AddAddressButton"
                        onClick={() =>
                          newaddress
                            ? setNewaddress(false)
                            : setNewaddress(true)
                        }
                      >
                        cancel
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        className="AddAddressButton"
                        onClick={() =>
                          newaddress
                            ? setNewaddress(false)
                            : setNewaddress(true)
                        }
                      >
                        <AiOutlinePlus className="AddIcone" />
                        Add New address
                      </p>
                    </>
                  )}
                </div>
              </div>
              <AddressCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
