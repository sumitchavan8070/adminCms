import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCategory, addCategory } from "../Slice/categoriesSlice";
import "../CSS/CategoryModal.css";

const CategoryModal = ({ show, onClose, category }) => {
  const [catName, setCatName] = useState("");
  const [catShortName, setCatShortName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      setCatName(category.catName);
      setCatShortName(category.catShortName);
      setDescription(category.description);
      setImage(category.image);
    } else {
      setCatName("");
      setCatShortName("");
      setDescription("");
      setImage("");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = {
      catName,
      catShortName,
      description,
      image,
    };

    if (category) {
      dispatch(updateCategory({ ...category, ...categoryData }));
    } else {
      dispatch(addCategory(categoryData));
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {category ? "Edit Category" : "Add Category"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category Short Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={catShortName}
                  onChange={(e) => setCatShortName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {category ? "Save changes" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
