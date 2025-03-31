import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../Slice/categoriesSlice";
import CategoryModal from "../Components/CategoryModal";
import { IoMdAddCircle } from "react-icons/io";

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setShowEditModal(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedCategory(null);
  };

  const handleCategoryDelete = (category) => {
    dispatch(deleteCategory(category._id));
  };

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    // Sort categories by categoryNumber in ascending order
    const sortedCategories = [...categories].sort(
      (a, b) => a.categoryNumber - b.categoryNumber
    );

    content = (
      <div className="row">
        {sortedCategories.map((category) => (
          <div className="col-md-4 mb-3" key={category._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.catName}</h5>
                <p className="card-text">No: {category.categoryNumber}</p>
                <p className="card-text">Category ID: {category._id}</p>

                <button
                  onClick={() => handleEditClick(category)}
                  className="btn btn-primary catButton"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger catButton"
                  onClick={() => handleCategoryDelete(category)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <div className="headerNav">
        <h1>Categories</h1>
        <button
          type="button"
          className="btn btn-primary addCatButton"
          onClick={handleAddClick}
        >
          <IoMdAddCircle size={30} style={{ marginRight: 10 }} />
          Add New Category
        </button>
      </div>
      <CategoryModal
        show={showEditModal}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
      {content}
    </div>
  );
};

export default Categories;
