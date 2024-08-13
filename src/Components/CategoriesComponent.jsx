import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
  addYear,
  updateYear,
  deleteYear,
} from "../Slice/subcatSlice"; // Update the path as needed

const CategoriesComponent = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditYearModal, setShowEditYearModal] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [editYearId, setEditYearId] = useState(null);
  const [editSubcategory, setEditSubcategory] = useState("");
  const [editYearValue, setEditYearValue] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");
  const [newYear, setNewYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddSubcategory = (categoryId) => {
    if (newSubcategory.trim()) {
      dispatch(
        addSubcategory({ categoryId, subcategory: newSubcategory.trim() })
      );
      setNewSubcategory("");
    }
  };

  const handleUpdateSubcategory = () => {
    if (editSubcategory.trim()) {
      dispatch(
        updateSubcategory({
          id: editSubcategoryId,
          subcategory: editSubcategory.trim(),
        })
      );
      setShowEditModal(false);
    }
  };

  const handleDeleteSubcategory = (categoryId, subcategoryId) => {
    dispatch(deleteSubcategory({ categoryId, subcategoryId }));
  };

  const handleAddYear = (categoryId, subcategoryId, year) => {
    if (year.trim()) {
      dispatch(addYear({ categoryId, subcategoryId, year: year.trim() }));
      setNewYear("");
    }
  };

  const handleUpdateYear = (yearId, year) => {
    if (year.trim()) {
      dispatch(updateYear({ id: yearId, year: year.trim() }));
      setShowEditYearModal(false);
    }
  };

  const handleDeleteYear = (yearId) => {
    dispatch(deleteYear(yearId));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="categories-component">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) =>
            category.subcategories?.map((subCategory) =>
              subCategory.years.map((year) => (
                <tr key={year._id}>
                  <td>{category.catName}</td>
                  <td>{subCategory.subCatName}</td>
                  <td>{year.QPYear}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditSubcategoryId(subCategory._id);
                        setEditSubcategory(subCategory.subCatName);
                        setShowEditModal(true);
                      }}
                    >
                      Edit Subcategory
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteSubcategory(category._id, subCategory._id)
                      }
                    >
                      Delete Subcategory
                    </button>
                    <button
                      onClick={() => {
                        setEditYearId(year._id);
                        setEditYearValue(year.QPYear);
                        setShowEditYearModal(true);
                      }}
                    >
                      Edit Year
                    </button>
                    <button onClick={() => handleDeleteYear(year._id)}>
                      Delete Year
                    </button>
                  </td>
                </tr>
              ))
            )
          )}
          <tr>
            <td>
              <input
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                placeholder="Enter Subcategory"
              />
              <button onClick={() => handleAddSubcategory(selectedCategory)}>
                Add Subcategory
              </button>
            </td>
            <td>
              <select
                value={selectedSubcategory}
                onChange={(e) => {
                  const subcategoryId = e.target.value;
                  setSelectedSubcategory(subcategoryId);
                  const selectedCat = categories.find((cat) =>
                    cat.subcategories.some(
                      (subCat) => subCat._id === subcategoryId
                    )
                  );
                  setSelectedCategory(selectedCat?._id || "");
                }}
              >
                <option value="">Select Subcategory</option>
                {categories.flatMap((cat) =>
                  cat.subcategories?.map((subCat) => (
                    <option key={subCat._id} value={subCat._id}>
                      {subCat.subCatName}
                    </option>
                  ))
                )}
              </select>
              <input
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="Enter Year"
              />
              <button
                onClick={() =>
                  handleAddYear(selectedCategory, selectedSubcategory, newYear)
                }
              >
                Add Year
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Edit Subcategory Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Subcategory</h2>
            <input
              value={editSubcategory}
              onChange={(e) => setEditSubcategory(e.target.value)}
              placeholder="Enter Updated Subcategory"
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateSubcategory}>Update</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Year Modal */}
      {showEditYearModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Year</h2>
            <input
              value={editYearValue}
              onChange={(e) => setEditYearValue(e.target.value)}
              placeholder="Enter Updated Year"
            />
            <div className="modal-buttons">
              <button
                onClick={() => handleUpdateYear(editYearId, editYearValue)}
              >
                Update
              </button>
              <button onClick={() => setShowEditYearModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesComponent;
