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
import CreateQuestionPaperForm from "../Components/CreateQuestionPaperForm";

const QuestionPaperManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingPaper, setEditingPaper] = useState(null); // Add state for editing paper
  const [creatingPaper, setCreatingPaper] = useState(false); // State for creating paper

  // Get categories and question papers from the Redux store
  const categories = useSelector((state) => state.categories.categories);
  const questionPapers = useSelector(
    (state) => state.questionPapers.questionPapers
  );
  const questionPapersStatus = useSelector(
    (state) => state.questionPapers.status
  );
  const questionPapersError = useSelector(
    (state) => state.questionPapers.error
  );

  const categoriesStatus = useSelector((state) => state.categories.status);
  const categoriesError = useSelector((state) => state.categories.error);

  // Fetch categories on component mount
  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  // Fetch question papers when the selected category changes
  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(fetchQuestionPaperData(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleEdit = (paper) => {
    setEditingPaper(paper); // Set the editing paper
  };

  const handleView = (paperId) => {
    navigate(`/questionPapers/view/${paperId}`);
  };

  // const handleAddQuestionPaper = (catID, subCatID, yearID) => {
  //   navigate(
  //     `/questionPapers/add?catID=${catID}&subCatID=${subCatID}&yearID=${yearID}`
  //   );
  // };

  const handleDelete = (paperId) => {
    console.log("-----------handle delete", paperId);

    dispatch(deleteQuestionPaper(paperId)).then(() => {
      if (selectedCategoryId) {
        dispatch(fetchQuestionPaperData(selectedCategoryId));
      }
    });
  };

  const handleCloseEdit = () => {
    setEditingPaper(null);
    if (selectedCategoryId) {
      dispatch(fetchQuestionPaperData(selectedCategoryId));
    }
  };

  const handleCreate = () => {
    setCreatingPaper(true);
  };

  const handleCancelCreate = () => {
    setCreatingPaper(false);
  };

  const handleProceedCreate = (catID, subCatID, yearID) => {
    // setCreatingPaper(false);
    // handleAddQuestionPaper(catID, subCatID, yearID);
    console.log(catID);
    console.log(subCatID);
    console.log(yearID);
  };

  if (categoriesStatus === "loading" || questionPapersStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (categoriesStatus === "failed") {
    return <div>Error loading categories: {categoriesError}</div>;
  }

  if (questionPapersStatus === "failed") {
    return <div>Error loading question papers: {questionPapersError}</div>;
  }

  const hasQuestionPapers = questionPapers && questionPapers.length > 0;

  return (
    <div className="question-paper-management">
      <h2>Question Paper Management</h2>
      <select
        className="form-select"
        onChange={handleCategoryChange}
        value={selectedCategoryId || ""}
      >
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category._id}
            name={category.catName}
          >
            {category.catName}
          </option>
        ))}
      </select>
      {editingPaper ? (
        <EditQuestionPaper paperData={editingPaper} onClose={handleCloseEdit} />
      ) : creatingPaper ? (
        <CreateQuestionPaperForm
          onCancel={handleCancelCreate}
          onProceed={handleProceedCreate}
        />
      ) : (
        selectedCategoryId && (
          <>
            {hasQuestionPapers ? (
              <table>
                <thead>
                  <tr>
                    <th>PaperName</th>

                    <th>SubCategory</th>
                    <th>Year</th>
                    <th>Question Paper</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {questionPapers?.map((item) => (
                    // console.log("---------", item),
                    <tr key={item.yearId}>
                      <td>{item?.questionPaperName || "NA"}</td>

                      <td>{item.subCatName}</td>
                      <td>{item.QPYear}</td>
                      <td>
                        {item.questions ? "Available" : "Not Available"}
                        <span>& Total Questions: {item.questions.length}</span>
                      </td>
                      <td>
                        {item.questions ? (
                          <>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleEdit(item)}
                            >
                              View/Edit
                            </button>
                          </>
                        ) : (
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              handleAddQuestionPaper(
                                item.catID,
                                item.subCatID,
                                item.yearID
                              )
                            }
                          >
                            Add
                          </button>
                        )}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.yearId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-question-papers">
                <p>No question papers available for this category.</p>
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Question Paper
                </button>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default QuestionPaperManagement;
