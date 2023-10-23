import "./dashboard.css";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsCreditCardFill, BsFillBoxSeamFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { AiFillMessage, AiFillSetting } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { TbDiscount2 } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { NavLink, Outlet } from "react-router-dom";

function Dashboard() {

  return (
    <div className="Dashboard">
      <div className="navMenusLeft">
        <ul>
          <p>Dashboard</p>
          <NavLink className="orders" to="">
            <li>
              <MdDashboard />
              Dashboard
            </li>
          </NavLink>
          <p>User</p>
          <NavLink className="orders" to="user">
            <li>
              <FaUserAlt />
              user
            </li>
          </NavLink>
          <NavLink className="orders" to="product">
            <li>
              <BsFillBoxSeamFill /> product
            </li>
          </NavLink>
          <NavLink className="orders" to="category">
            <li>
              <MdCategory /> category
            </li>
          </NavLink>
          <p>List</p>
          <NavLink className="Orders" to="order">
            <li>
              <BsCreditCardFill /> Order
            </li>
          </NavLink>
          <NavLink className="discount" to="discount">
            <li>
              <TbDiscount2 /> discount
            </li>
          </NavLink>
          <NavLink className="shipped" to="shipped">
            <li>
              <FaShippingFast /> shipped
            </li>
          </NavLink>
          <NavLink className="message" to="message">
            <li>
              <AiFillMessage /> message
            </li>
          </NavLink>
          <NavLink className="settings" to="settings">
            <li>
              <AiFillSetting />
              settings
            </li>
          </NavLink>
          <p>User</p>
          <NavLink className="profile" to="profile">
            <li>
              <ImProfile />
              profile
            </li>
          </NavLink>
          <NavLink className="logout" to="logout">
            <li>
              <RiLogoutBoxFill />
              logout
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="mainContainer">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
