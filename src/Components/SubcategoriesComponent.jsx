import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../Slice/subCategoriesSlice"; // Update the path as needed

const SubcategoriesComponent = () => {
  const dispatch = useDispatch();
  const { subCategories, status, error } = useSelector(
    (state) => state.subCategories
  );

  const [showEditModal, setShowEditModal] = useState(false);
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [editSubcategory, setEditSubcategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  useEffect(() => {
    dispatch(fetchSubcategories());
  }, [dispatch]);

  const handleAddSubcategory = () => {
    if (newSubcategory.trim()) {
      dispatch(addSubcategory(newSubcategory.trim()));
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

  const handleDeleteSubcategory = (subcategoryId) => {
    dispatch(deleteSubcategory(subcategoryId));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="subcategories-component">
      <table>
        <thead>
          <tr>
            <th>Subcategory</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory) => (
            <tr key={subCategory._id}>
              <td>{subCategory.subCatName}</td>
              <td>
                <button
                  onClick={() => {
                    setEditSubcategoryId(subCategory._id);
                    setEditSubcategory(subCategory.subCatName);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSubcategory(subCategory._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
                placeholder="Enter Subcategory"
              />
              <button onClick={handleAddSubcategory}>Add Subcategory</button>
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
    </div>
  );
};

export default SubcategoriesComponent;
