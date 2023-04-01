import { useState } from "react";
import "./CategoryPage.css";
import NewCategory from "./CategoryPage/NewCategory";
import ToolberNew from "./utiles/ToolberNew";


function CategoryPage() {
  const [newCategory, setNewCategory] = useState(false);
  return (
    <div className="CategoryPageMainCantainer">
      <div>
        <ToolberNew setNewProduct={setNewCategory} newProduct={newCategory} />
      </div>
      <div>{newCategory && <div className="addnewCategoryPage"><NewCategory/></div>}</div>
    </div>
  );
}

export default CategoryPage;
