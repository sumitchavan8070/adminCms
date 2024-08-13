import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Slice/categoriesSlice";
import "../CSS/CategoryForm.css";

const CategoryForm = ({ onCancel, onProceed, catID }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!catID && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, catID, categories.length]);

  const validate = () => {
    const newErrors = {};
    if (!selectedCategory) newErrors.category = "Category is required";
    if (!selectedSubCategory) newErrors.subCategory = "SubCategory is required";
    if (!selectedYear) {
      newErrors.year = "Year is required";
    } else if (!/^\d+$/.test(selectedYear)) {
      newErrors.year = "Year must be a number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = () => {
    if (validate()) {
      onProceed(selectedCategory, selectedSubCategory, selectedYear);
    }
  };

  return (
    <div className="create-question-paper-form">
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        disabled={!!catID}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.catName}
          </option>
        ))}
      </select>
      {errors.category && <div className="error">{errors.category}</div>}

      <label htmlFor="subCategory">SubCategory:</label>
      <select
        id="subCategory"
        className="form-select"
        value={selectedSubCategory}
        onChange={(e) => setSelectedSubCategory(e.target.value)}
      >
        <option value="">Select SubCategory</option>
        {["PRE", "MAINS", "SARAL"].map((subCat) => (
          <option key={subCat} value={subCat}>
            {subCat}
          </option>
        ))}
      </select>
      {errors.subCategory && <div className="error">{errors.subCategory}</div>}

      <label htmlFor="year">Year:</label>
      <input
        type="text"
        id="year"
        className="form-input"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      />
      {errors.year && <div className="error">{errors.year}</div>}

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleProceed}>
          Submit
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
