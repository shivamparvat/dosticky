import Toolebar from "./utiles/Toolebar";
import { GrEdit } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import "./UserListTable.css";
import { useState } from "react";
import Pagination from "../../../component/Pagination";

function ListUser({ data }) {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(data.name);
  const [gender, setGender] = useState(data.gender);
  const [email, setEmail] = useState(data.email);
  const [number, setNumber] = useState(data.number);
  const SubmitHeadler = () => {};

  return (
    <>
      {editable ? (
        <div className="userEditable">
          <form action="" onSubmit={SubmitHeadler}>
            <div className="nameGender">
              <div className="nameCaontainer">
                <div>
                  <label htmlFor="name">full name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Fullname"
                  />
                </div>
                <div className="errorMsg">
                  {/* <p>Lorem, ipsum dolor.</p> */}
                </div>
              </div>
              <div className="genderCaontainer">
                <div>
                  <label htmlFor="gender">gender</label>
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <div className="errorMsg">
                  {/* <p>Lorem, ipsum dolor.</p> */}
                </div>
              </div>
            </div>
            <div className="emailnumber">
              <div className="emailCaontaineer">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
                <div className="errorMsg">
                  {/* <p>Lorem, ipsum dolor.</p> */}
                </div>
              </div>

              <div className="mobileNumberCaontainer">
                <label className="numberLabel" htmlFor="number">
                  number
                </label>
                <input
                  type="text"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Number"
                />
                <div className="errorMsg">
                  {/* <p>Lorem, ipsum dolor.</p> */}
                </div>
              </div>
            </div>
            <div className="singupbutton">
              <input type="submit" value="Update" />
              <div className="tooles">
                <div onClick={() => setEditable(editable ? false : true)}>
                  <RxCross2 />
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <>
          <ul className="list">
            <li>
              <input type="checkbox" name="" id="" />
            </li>
            <li>{data.name}</li>
            <li>{data.email}</li>
            <li>{data.number}</li>
            <li>{data.gender}</li>
            <li className="tooles">
              <div onClick={() => setEditable(editable ? false : true)}>
                <GrEdit />
              </div>
            </li>
          </ul>
          <Pagination />
        </>
      )}
    </>
  );
}
function UserListTable() {
  const data = {
    name: "shivam",
    email: "shivamgoswami2711@gmail.com",
    number: "6261282518",
    gender: "male",
  };
  return (
    <div className="UserListTable">
      <h2 className="title">users</h2>
      <div>
        <Toolebar />
      </div>
      <div className="userlistdashboard">
        <ListUser data={data} />
      </div>
    </div>
  );
}

export default UserListTable;
