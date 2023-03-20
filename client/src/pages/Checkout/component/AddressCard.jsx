import React from "react";
import "./AddressCard.css";

function AddressCard() {
  return (
    <div className="addressCard">
      <div className="listAddreass">
        <label htmlFor="j45453fdjb452nMK34x">
          <input type="radio" name="address" id="j45453fdjb452nMK34x" />
          <div className="addressDetail">
            <div className="nameNumberContainer">
              <div className="name">Shivam Goswami</div>
              <div className="number">6261282518</div>
            </div>
            <div className="fulladdress">Lorem ipsum dolor sit amet consectetur, adipisicing elit. <span className="pincode">480110</span></div>
          </div>
        </label>
        <label htmlFor="2cnpod5272rYtmnbgk">
          <input type="radio" name="address" id="2cnpod5272rYtmnbgk" />
          <div className="addressDetail">
            <div className="nameNumberContainer">
              <div className="name">Shivam Goswami</div>
              <div className="number">6261282518</div>
            </div>
            <div className="fulladdress">Lorem ipsum dolor sit amet consectetur, adipisicing elit. <span className="pincode">480110</span></div>
          </div>
        </label>
        <label htmlFor="r8qwa2G7seu8l2fdgfxz">
          <input type="radio" name="address" id="r8qwa2G7seu8l2fdgfxz" />
          <div className="addressDetail">
            <div className="nameNumberContainer">
              <div className="name">Shivam Goswami</div>
              <div className="number">6261282518</div>
            </div>
            <div className="fulladdress">Lorem ipsum dolor sit amet consectetur, adipisicing elit. <span className="pincode">480110</span></div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default AddressCard;
