import React, { useEffect, useState } from "react";
import "./NewAddress.css";
import { useDispatch, useSelector } from "react-redux";
import { AddNewAddress, GetAllAddress } from "../../../redux/actions/address";
import { useNavigate } from "react-router-dom";
function NewAddress({ newaddress }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const address = useSelector((state) => state.address);
  useEffect(() => {
    dispatch(GetAllAddress());
  }, [dispatch]);

  useEffect(() => {}, [address]);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");

  function newAddressSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      number,
      pincode,
      street,
      city,
      state,
      landmark,
      alternatePhone,
    };
    dispatch(AddNewAddress(data));
    newaddress(false);
  }

  return (
    <form className="AddressForm" action="" onSubmit={newAddressSubmit}>
      <div className="newAddress">
        <div className="nameCaontainer">
          {console.log(address)}
          <div>
            <label htmlFor="name">full name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Fullname"
            />
          </div>
          <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
        </div>
        <div className="number pincode">
          <div className="numberCaontainer">
            <div>
              <label htmlFor="number">Number</label>
              <input
                type="text"
                id="number"
                autoComplete="tel"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="number"
              />
            </div>
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
          <div className="pincodeCaontainer">
            <div>
              <label htmlFor="pincode">pincode</label>
              <input
                type="text"
                autoComplete="postal-code"
                id="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="pincode"
              />
            </div>
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
        </div>

        <div className="streetCaontainer">
          <div>
            <label htmlFor="street">
              Address {"("}Area and Street{")"}
            </label>
            <textarea
              id="street"
              autoComplete="street-address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Address (Area and Street)"
            />
          </div>
          <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
        </div>

        <div className="city state">
          <div className="cityCaontainer">
            <div>
              <label htmlFor="city">City</label>
              <input
                autoCapitalize="city"
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="city"
              />
            </div>
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
          <div className="stateCaontainer">
            <div>
              <label htmlFor="state">state</label>
              <input
                type="text"
                id="state"
                autoComplete="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="state"
              />
            </div>
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
        </div>
        <div className="landmark alternatePhone">
          <div className="landmarkCaontainer">
            <div>
              <label htmlFor="name">
                landmark {"("}optional{")"}
              </label>
              <input
                type="text"
                id="landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="landmark"
              />
            </div>
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
          <div className="alternatePhoneCaontainer">
            <div>
              <label htmlFor="alternatePhone">
                alternate Phone {"("}optional{")"}
              </label>
              <input
                type="text"
                autoComplete="off"
                id="alternatePhone"
                value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
                placeholder="alternatePhone"
              />
            </div>
            <div className="errorMsg">{/* <p>Lorem, ipsum dolor.</p> */}</div>
          </div>
        </div>
        <input
          type="submit"
          value="Save and Deliver Here"
          className="addAddressButton"
        />
      </div>
    </form>
  );
}

export default NewAddress;
