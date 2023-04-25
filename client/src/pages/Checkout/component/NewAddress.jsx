import React, {useState } from "react";
import "./NewAddress.css";
import { useDispatch } from "react-redux";
import {GetAllAddress } from "../../../redux/actions/address";
function NewAddress({ submitAddress,ButtonText,addressData }) {
  const dispatch = useDispatch();
  
  
  const [name, setName] = useState((addressData && addressData.name) || "");
  const [number, setNumber] = useState((addressData && addressData.number) || "");
  const [pincode, setPincode] = useState((addressData && addressData.pincode) || "");
  const [street, setStreet] = useState((addressData && addressData.street) || "");
  const [city, setCity] = useState((addressData && addressData.city) || "");
  const [state, setState] = useState((addressData && addressData.state) || "");
  const [landmark, setLandmark] = useState((addressData && addressData.landmark) || "");
  const [alternatePhone, setAlternatePhone] = useState((addressData && addressData.alternatePhone) || "");
  
  function newAddressSubmit(e) {
    e.preventDefault();
    const data = {
      name,
      number,
      zip:pincode,
      street,
      city,
      state,
      landmark,
      alternate_number:alternatePhone,
    };
    submitAddress(data)
    dispatch(GetAllAddress());
  }
  
  return (
    <form className="AddressForm" action="" onSubmit={newAddressSubmit}>
      <div className="newAddress">
        <div className="nameCaontainer">
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
          value={ButtonText}
          className="addAddressButton"
        />
      </div>
    </form>
  );
}

export default NewAddress;
