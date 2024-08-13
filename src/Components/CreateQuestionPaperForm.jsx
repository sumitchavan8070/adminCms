import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Slice/categoriesSlice";
import {
  fetchQuestionPaperData,
  deleteQuestionPaper,
} from "../Slice/questionPaperSlice"; // Import deleteQuestionPaper
import { useNavigate } from "react-router-dom";
import EditQuestionPaper from "../Components/EditQuestionPaper"; // Import EditQuestionPaper
import "../CSS/QuestionPaperManagement.css";
import { fetchSubCategories } from "../Slice/subCategoriesSlice";
import { fetchYears } from "../Slice/yearsSlice";

const CreateQuestionPaperForm = ({ onCancel, onProceed }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  ); // Assuming you have subCategories slice

  const [categoryWithYear, setCategoryWithYear] = useState("");
  const [subCatID, setSubCatID] = useState("");
  const [catID, setCatID] = useState("");
  const [QPYearID, setQPYearID] = useState("");

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
    dispatch(fetchSubCategories()); // Fetch combined subcat and year options
  }, [dispatch, categories.length]);

  const handleCategoryPicker = (catId, subCatId, yearId) => {
    setCatID(catId);
    setSubCatID(subCatId);
    setQPYearID(yearId);
  };

  const handleProceed = () => {
    onProceed(catID, subCatID, QPYearID);
  };

  return (
    <div className="create-question-paper-form">
      <select
        className="form-select"
        value={categoryWithYear}
        onChange={(e) => {
          const selectedItem = subCategories.find(
            (item) => item._id === e.target.value
          );
          setCategoryWithYear(selectedItem._id);
          setSubCatID(selectedItem.subCatId ? selectedItem.subCatId._id : "");
          setCatID(selectedItem.catId ? selectedItem.catId._id : "");
          setQPYearID(selectedItem._id);
          handleCategoryPicker(
            selectedItem.catId._id,
            selectedItem.subCatId._id,
            selectedItem._id
          );
        }}
      >
        <option value="">Select Category - SubCategory - Year</option>
        {subCategories.map((item) => (
          <option key={item._id} value={item._id}>
            {`${item.catId ? item.catId.catShortName : "Unknown"} - ${
              item.subCatId ? item.subCatId.subCatName : "Unknown Subcategory"
            } - ${item.QPYear}`}
          </option>
        ))}
      </select>
      <button className="btn btn-primary" onClick={handleProceed}>
        Proceed
      </button>
      <button className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default CreateQuestionPaperForm;
