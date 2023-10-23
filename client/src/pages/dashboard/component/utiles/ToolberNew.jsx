import { AiOutlinePlus } from "react-icons/ai";
import { TbMenuOrder } from "react-icons/tb";

const ToolberNew = ({ setNewProduct, newProduct }) => {
  return (
    <div className="Toolebar new">
      <ul>
        <li>
          <input type="checkbox" />
          <p>Action</p>
          <select name="action" id="action">
            <option value="action">delete</option>
            <option value="action">activate</option>
            <option value="action">deactivate</option>
          </select>
        </li>
        <li>
          <input type="search" name="search" id="search" />
        </li>
        <li>
          <TbMenuOrder />
        </li>
        <li onClick={() => setNewProduct(newProduct ? false : true)}>
          <AiOutlinePlus
          />
        </li>
        <li>
          <p>orderby</p>
          <select name="orderBy" id="orderBy">
            <option value="fhds">GH</option>
            <option value="fhds">GH</option>
            <option value="fhds">GH</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default ToolberNew;
