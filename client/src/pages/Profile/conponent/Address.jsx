import React, { useEffect, useState } from "react";
import "../../Checkout/Checkout.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddNewAddress, GetAllAddress } from "../../../redux/actions/address";
// import { useNavigate } from "react-router-dom";
import NewAddress from "../../Checkout/component/NewAddress";
import AddressCard from "../../Checkout/component/AddressCard";

function Address() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const address = useSelector((state) => state.address);

  const [newaddress, setNewaddress] = useState(false);
  const [slectedAddress, setSlectedAddress] = useState("");

  useEffect(() => {
    dispatch(GetAllAddress());
  }, [dispatch]);

  function submitAddress(data) {
    dispatch(AddNewAddress(data));
    setNewaddress(false);
  }

  return (
    <div className="cartProducts">
      <div>
        <div className="addreses">
          <div className="oldAddress">
            <div>
              <div className="headding">
                <h2>Delivery Address</h2>
                {newaddress ? (
                  <>
                    <NewAddress
                      submitAddress={submitAddress}
                      ButtonText="Save Address"
                    />
                    <p
                      className="AddAddressButton"
                      onClick={() => setNewaddress(false)}
                    >
                      cancel
                    </p>
                  </>
                ) : (
                  <>
                    <p
                      className="AddAddressButton"
                      onClick={() =>
                        newaddress ? setNewaddress(false) : setNewaddress(true)
                      }
                    >
                      <AiOutlinePlus className="AddIcone" />
                      Add New address
                    </p>
                  </>
                )}
              </div>
            </div>
            {address.loading === true ? (
              <>loading....</>
            ) : (
              <AddressCard
                address={address}
                slectedAddress={slectedAddress}
                setSlectedAddress={setSlectedAddress}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
