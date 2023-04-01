import "./dashboard.css";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsCreditCardFill, BsFillBoxSeamFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { AiFillMessage, AiFillSetting } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { TbDiscount2 } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import DeshboardCaintaint from "./component/DeshboardCaintaint";
import { useState } from "react";
import UserListTable from "./component/UserListTable";
import Productpage from "./component/ProductPage";
import CategoryPage from "./component/CategoryPage";
import Discount from "./component/Discount";
import Order from "./component/Order";

function Dashboard() {
  const [mainDisplay, setMainDisplay] = useState("dashboard");
  const Display = () => {
    switch (mainDisplay) {
      case "user":
        return <UserListTable/>;
      case "dashboard":
        return <DeshboardCaintaint />;
      case "product":
        return <Productpage/>;
      case "category":
        return <CategoryPage/>;
      case "discount":
        return <Discount/>;
      case "order":
        return <Order/>;
      default:
        break;
    }
  };
  return (
    <div className="Dashboard">
      <div className="navMenusLeft">
        <ul>
          <p>Dashboard</p>
          <li onClick={() => setMainDisplay("dashboard")}>
            <MdDashboard />
            Dashboard
          </li>
          <p>User</p>
          <li onClick={() => setMainDisplay("user")}>
            <FaUserAlt />
            user
          </li>
          <li onClick={() => setMainDisplay("product")}>
            <BsFillBoxSeamFill />
            product
          </li>
          <p>List</p>
          <li onClick={() => setMainDisplay("category")}>
            <MdCategory />
            category
          </li>
          <li onClick={() => setMainDisplay("order")}>
            <BsCreditCardFill />
            Order
          </li>
          <li onClick={() => setMainDisplay("discount")}>
            <TbDiscount2 />
            discount
          </li>
          <li>
            <FaShippingFast />
            shipped
          </li>
          <li>
            <AiFillMessage />
            message
          </li>
          <li>
            <AiFillSetting />
            settings
          </li>
          <p>User</p>
          <li>
            <ImProfile />
            profile
          </li>
          <li>
            <RiLogoutBoxFill />
            logout
          </li>
        </ul>
      </div>
      <div className="mainContainer">
        <Display />
        {/* <CategoryPage/> */}
      </div>
    </div>
  );
}

export default Dashboard;
