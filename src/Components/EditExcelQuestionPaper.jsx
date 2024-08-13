import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../Slice/questionPaperSlice";
import * as XLSX from "xlsx";
import "../CSS/EditExcelQuestionPaper.css";

const EditExcelQuestionPaper = () => {
  const location = useLocation();
  const { questions } = location.state || {};
  const [editableQuestions, setEditableQuestions] = useState(questions || []);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);
  const [deletedQuestions, setDeletedQuestions] = useState([]);
  const dispatch = useDispatch();

  const validateQuestion = (question) => {
    const errors = {};

    if (!question.catID) errors.catID = "Please provide a category ID.";
    if (!question.subCatID)
      errors.subCatID = "Please provide a subcategory ID.";
    if (!question.QPYearID) errors.QPYearID = "Please provide a year ID.";
    if (!question.question)
      errors.question = "Please provide the question text.";
    if (!question.option1) errors.option1 = "Please provide Option 1.";
    if (!question.option2) errors.option2 = "Please provide Option 2.";
    if (!question.option3) errors.option3 = "Please provide Option 3.";
    if (!question.option4) errors.option4 = "Please provide Option 4.";
    if (!question.answer) errors.answer = "Please select an answer.";

    return errors;
  };

  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...editableQuestions];
    updatedQuestions[index][field] = value;
    setEditableQuestions(updatedQuestions);
  };

  const handleUpdateQuestion = async (index) => {
    const question = editableQuestions[index];
    const errors = validateQuestion(question);

    if (Object.keys(errors).length === 0) {
      const updateObject = {
        catID: question.catID,
        subCatID: question.subCatID,
        QPYearID: question.QPYearID,
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        answer: question.answer,
        ...(question.subjectID && { subjectId: question.subjectID }),
        ...(question.topicID && { topicId: question.topicID }),
      };

      console.log("Update successful:", JSON.stringify(updateObject));

      try {
        const response = await dispatch(createQuestion(updateObject)).unwrap();
        console.log("Update successful:", response);

        // Update the question with the response data
        const updatedQuestions = [...editableQuestions];
        updatedQuestions[index] = {
          ...question,
          status: "uploaded",
          _id: response._id,
        };
        setEditableQuestions(updatedQuestions);

        // Add to the uploaded questions list
        setUploadedQuestions((prevUploaded) => [
          ...prevUploaded,
          { ...question, _id: response._id },
        ]);

        // Remove the question from the list after successful upload
        handleDeleteQuestion(index);
      } catch (error) {
        console.error("Failed to update the question:", error);
      }
    } else {
      console.log("Question at index", index, "has errors:", errors);
    }
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = editableQuestions.filter((_, i) => i !== index);
    const deletedQuestion = editableQuestions[index];
    setEditableQuestions(updatedQuestions);
    setDeletedQuestions((prevDeleted) => [...prevDeleted, deletedQuestion]);
    console.log(`Deleting question at index ${index}`);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(editableQuestions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Questions");
    XLSX.writeFile(wb, "Remaining_Questions.xlsx");
  };

  const downloadUploadedExcel = () => {
    const ws = XLSX.utils.json_to_sheet(uploadedQuestions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Uploaded_Questions");
    XLSX.writeFile(wb, "Uploaded_Questions.xlsx");
  };

  const downloadDeletedExcel = () => {
    const ws = XLSX.utils.json_to_sheet(deletedQuestions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Deleted_Questions");
    XLSX.writeFile(wb, "Deleted_Questions.xlsx");
  };

  return (
    <div className="edit-question-paper">
      <h2>Edit Excel Question Paper</h2>
      <div className="question-count">
        Questions Remaining: {editableQuestions.length}
      </div>
      <div className="excelButtons">
        <button className="btn btn-download" onClick={downloadExcel}>
          Download Remaining Questions Excel
        </button>
        <button className="btn btn-download" onClick={downloadUploadedExcel}>
          Download Uploaded Questions Excel
        </button>
        <button className="btn btn-download" onClick={downloadDeletedExcel}>
          Download Deleted Questions Excel
        </button>
      </div>
      <div className="questions-list">
        {editableQuestions.length > 0 ? (
          editableQuestions.map((question, index) => {
            const errors = validateQuestion(question);
            return (
              <div key={index} className="question-container">
                <label>
                  <strong>Category ID:</strong>
                  <input
                    type="text"
                    value={question.catID || ""}
                    onChange={(e) =>
                      handleInputChange(index, "catID", e.target.value)
                    }
                  />
                  {errors.catID && <p className="error-note">{errors.catID}</p>}
                </label>
                <label>
                  <strong>Subcategory ID:</strong>
                  <input
                    type="text"
                    value={question.subCatID || ""}
                    onChange={(e) =>
                      handleInputChange(index, "subCatID", e.target.value)
                    }
                  />
                  {errors.subCatID && (
                    <p className="error-note">{errors.subCatID}</p>
                  )}
                </label>
                <label>
                  <strong>Year ID:</strong>
                  <input
                    type="text"
                    value={question.QPYearID || ""}
                    onChange={(e) =>
                      handleInputChange(index, "QPYearID", e.target.value)
                    }
                  />
                  {errors.QPYearID && (
                    <p className="error-note">{errors.QPYearID}</p>
                  )}
                </label>
                <label>
                  <strong>Question:</strong>
                  <textarea
                    className="question-textarea"
                    value={question.question || ""}
                    onChange={(e) =>
                      handleInputChange(index, "question", e.target.value)
                    }
                    rows="8"
                  />
                  {errors.question && (
                    <p className="error-note">{errors.question}</p>
                  )}
                </label>
                <label>
                  <strong>Option 1:</strong>
                  <input
                    type="text"
                    value={question.option1 || ""}
                    onChange={(e) =>
                      handleInputChange(index, "option1", e.target.value)
                    }
                  />
                  {errors.option1 && (
                    <p className="error-note">{errors.option1}</p>
                  )}
                </label>
                <label>
                  <strong>Option 2:</strong>
                  <input
                    type="text"
                    value={question.option2 || ""}
                    onChange={(e) =>
                      handleInputChange(index, "option2", e.target.value)
                    }
                  />
                  {errors.option2 && (
                    <p className="error-note">{errors.option2}</p>
                  )}
                </label>
                <label>
                  <strong>Option 3:</strong>
                  <input
                    type="text"
                    value={question.option3 || ""}
                    onChange={(e) =>
                      handleInputChange(index, "option3", e.target.value)
                    }
                  />
                  {errors.option3 && (
                    <p className="error-note">{errors.option3}</p>
                  )}
                </label>
                <label>
                  <strong>Option 4:</strong>
                  <input
                    type="text"
                    value={question.option4 || ""}
                    onChange={(e) =>
                      handleInputChange(index, "option4", e.target.value)
                    }
                  />
                  {errors.option4 && (
                    <p className="error-note">{errors.option4}</p>
                  )}
                </label>
                <label>
                  <strong>Answer:</strong>
                  <select
                    value={question.answer || "Not provided"}
                    onChange={(e) =>
                      handleInputChange(index, "answer", e.target.value)
                    }
                  >
                    <option value="Not provided">Not provided</option>
                    <option value="option1">{question.option1}</option>
                    <option value="option2">{question.option2}</option>
                    <option value="option3">{question.option3}</option>
                    <option value="option4">{question.option4}</option>
                  </select>
                  {errors.answer && (
                    <p className="error-note">{errors.answer}</p>
                  )}
                </label>
                <div className="action-buttons">
                  <button
                    className="btn btn-success"
                    onClick={() => handleUpdateQuestion(index)}
                  >
                    Upload Question
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Delete Question
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>No questions found.</div>
        )}
      </div>
    </div>
  );
};

export default EditExcelQuestionPaper;
