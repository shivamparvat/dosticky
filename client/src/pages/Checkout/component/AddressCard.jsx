import React, { useState } from "react";
import "./AddressCard.css";
import { MdDeleteOutline } from "react-icons/md";
import { GrFormEdit } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteAddress, updateAddress } from "../../../redux/actions/address";
import NewAddress from "./NewAddress";

function AddressCard({ address, slectedAddress, setSlectedAddress }) {
  const dispatch = useDispatch();
  const [editAddress, setEditAddress] = useState(false);
  const [editAddressId, seteditAddressId] = useState("");

  const addresses = address && address.address;

  function submitAddress(data) {
    dispatch(updateAddress(editAddressId,data))
  }

  return (
    <div className="addressCard">
      <div className="listAddreass">
        {addresses &&
          addresses.map((item) => {
            return (
              <>
                {editAddress && editAddressId == item._id ? (
                  <>
                    <NewAddress
                      key={item._id}
                      submitAddress={submitAddress}
                      ButtonText="update"
                      addressData={{
                        name: item.name,
                        number: item.number,
                        pincode: item.zip,
                        street: item.street,
                        city: item.city,
                        state: item.state,
                        landmark: item.landmark,
                        alternatePhone: item.alternate_number,
                      }}
                    />
                    <p
                      className="AddAddressButton"
                      onClick={() => setEditAddress(false)}
                    >
                      cancel
                    </p>
                  </>
                ) : (
                  <label
                    className="radioAddresss"
                    key={item._id}
                    htmlFor={item._id}
                  >
                    <input
                      type="radio"
                      name="address"
                      id={item._id}
                      checked={slectedAddress === item._id}
                      value={item._id}
                      onChange={(e) => setSlectedAddress(e.target.value)}
                    />
                    <div className="addressDetail">
                      <div className="nameNumberContainer">
                        <div className="name">{item.name}</div>
                        <div className="number">
                          <b>{item.number}</b>
                        </div>
                        <div className="number">{item.alternate_number}</div>
                        <div>
                          <MdDeleteOutline
                            onClick={(e) => {
                              e.preventDefault();
                              if (window.confirm("remove address"))
                                dispatch(deleteAddress(item._id));
                            }}
                          />
                          <GrFormEdit
                            size={15}
                            onClick={() => {
                              seteditAddressId(item._id);
                              setEditAddress(true);
                            }}
                          />
                        </div>
                      </div>
                      <div className="fulladdress">
                        {item.street}{" "}
                        <span className="pincode">{item.zip}</span>
                      </div>
                      <div className="fulladdress">
                        {item.landmark}
                        {"  "}
                        <b>
                          {item.city} {item.state}
                        </b>{" "}
                      </div>
                    </div>
                  </label>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}

export default AddressCard;
