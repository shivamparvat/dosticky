import { TbMenuOrder } from "react-icons/tb";
import "./Toolebar.css";

function Toolebar() {
  return (
    <div className="Toolebar">
      <ul>
        <li>
          <input type="checkbox" />
          <p>Action</p>
          <select name="action" id="action">
            <option value="action">delete</option>
            <option value="action">delete</option>
          </select>
        </li>
        <li><input type="search" name="search" id="search" /></li>
        <li>
          <TbMenuOrder />
        </li>
        <li>
          <p>orderBy</p>
          <select name="orderBy" id="orderBy">
            <option value="fhds">GH</option>
            <option value="fhds">GH</option>
            <option value="fhds">GH</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default Toolebar;
