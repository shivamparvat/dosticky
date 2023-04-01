import "./widget.css";
import { BsCreditCardFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { VscReferences } from "react-icons/vsc";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

function Widget() {
  return (
    <div className="WidgetContainer">
      <div className="wrapper">
        <div className="left">
          <p className="title">user</p>
          <p className="value">50</p>
          <span>see all user</span>
        </div>
        <div className="right">
          <div>
            {true ? <BiChevronUp /> : <BiChevronDown />}
            <p>10</p>
          </div>
          <div><FaUserAlt className="icon" /></div>
        </div>
      </div>
      <div className="wrapper">
        <div className="left">
          <p className="title">order</p>
          <p className="value">10</p>
          <span>see all user</span>
        </div>
        <div className="right">
          <div>
            {true ? <BiChevronUp /> : <BiChevronDown />}
            <p>1</p>
          </div>
          <div><BsCreditCardFill className="icon" /></div>
        </div>
      </div>
      <div className="wrapper">
        <div className="left">
          <p className="title">refers</p>
          <p className="value">17</p>
          <span>see all user</span>
        </div>
        <div className="right">
          <div>
            {true ? <BiChevronUp /> : <BiChevronDown />}
            <p>0</p>
          </div>
          <div><VscReferences className="icon" /></div>
        </div>
      </div>
      <div className="wrapper">
        <div className="left">
          <p className="title">balance</p>
          <p className="value">1500</p>
          <span>see all user</span>
        </div>
        <div className="right">
          <div>
            {true ? <BiChevronUp /> : <BiChevronDown />}
            <p>100</p>
          </div>
          <div><MdAccountBalanceWallet className="icon" /></div>
        </div>
      </div>
    </div>
  );
}

export default Widget;
