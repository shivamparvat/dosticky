import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCategory, CategoryAll } from "../../../../redux/actions/category";
import "./NewCategory.css";

function NewCategory() {
  const [title, setTitle] = useState("");
  const [File, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  // const category = useSelector((state) => state.category.category);
  
  function onSubmitHeadler(event){
      event.preventDefault();
      const data = new FormData();
      data.append("file", File);
      data.append("category", title);
      data.append("description", description);
    dispatch(AddCategory(data));
    dispatch(CategoryAll())
  };
  return (
    <div className="NewCategoryCantainer">
      <p className="newtitle">new category</p>
      <div>
        <div className="imagesShow">
            <div>
                <img src={File && File} alt="" />
            </div>
            </div>
      </div>
      <form action="" onSubmit={onSubmitHeadler} method="post">
        <div>
          <div className="titleCantainer">
            <label htmlFor="title">title</label>
            <input
              type="text"
              placeholder="title"
              required
              className="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="title"
            />
            <div className="msg">
              <p></p>
            </div>
          </div>
          <div className="imagesCantainer">
            <label htmlFor="images">images</label>
            <input
              required
              type="file"
              placeholder="images"
              accept=".webp"
              multiple
              className="images"
              onChange={(e) => setFile(e.target.files[0])}
              autoComplete="images"
            />
            <div className="msg">
              <p></p>
            </div>
          </div>

          <div className="descriptionCantainer">
            <label htmlFor="description">description</label>
            <textarea
              placeholder="description"
              className="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="description"
            />
            <div className="msg">
              <p></p>
            </div>
          </div>
        </div>
        <div className="newButton">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}

export default NewCategory;

//     data.append("file", file);
//     data.append("userName", username);
//     data.append("password", password);
//     data.append("email", email);
