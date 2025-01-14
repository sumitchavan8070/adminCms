import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuestion,
  createQuestion,
  fetchSubjects,
  fetchTopics,
  deleteQuestion,
} from "../Slice/questionPaperSlice";
import "../CSS/EditQuestionPaper.css";
import { useNavigate } from "react-router-dom";
import UploadExcel from "./UploadExcel";
import * as XLSX from "xlsx"; // Import XLSX for Excel handling

const EditQuestionPaper = ({ paperData, onClose }) => {
  const [questions, setQuestions] = useState(paperData.questions);
  const [isUploadExcelOpen, setIsUploadExcelOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors with default empty array
  const subjects = useSelector((state) => state.questionPapers.subjects || []);
  const topics = useSelector((state) => state.questionPapers.topics || []);
  const subjectsLoading = useSelector(
    (state) => state.questionPapers.subjectsLoading
  );
  const topicsLoading = useSelector(
    (state) => state.questionPapers.topicsLoading
  );
  const subjectsError = useSelector(
    (state) => state.questionPapers.subjectsError
  );
  const topicsError = useSelector((state) => state.questionPapers.topicsError);

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchTopics());
    // console.log("Paper data:", JSON.stringify(paperData));
  }, [dispatch, paperData]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = { ...newQuestions[index], [name]: value };
      return newQuestions;
    });
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      {
        _id: `new-${Date.now()}`, // Temporary ID for new questions
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        subject: "", // Add subject and topic fields
        topic: "",
      },
      ...prevQuestions,
    ]);
  };

  const handleDeleteQuestionUi = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const handleDeleteQuestion = (index, questionId) => {
    // console.log("index" + JSON.stringify(index));
    // console.log("questionId" + JSON.stringify(questionId));

    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(deleteQuestion({ questionId }))
        .then(() => {
          onClose();
        })
        .catch((error) => {
          console.error("Failed to delete question:", error);
        });
    }
  };

  // const handleUpdateQuestion = (question, index) => {
  //   console.log("Question to update" + JSON.stringify(question));

  //   // const questionToUpdate = questions[index];
  //   dispatch(
  //     updateQuestion({
  //       questionId: question._id,
  //       updatedData: {
  //         question: question.question,
  //         option1: question.option1,
  //         option2: question.option2,
  //         option3: question.option3,
  //         option4: question.option4,
  //         answer: question.answer,
  //         // ...(question.subject && {
  //         //   subjectId: question.subject,
  //         // }),
  //         // ...(question.topic && { topicId: question.topic }),
  //       },
  //     })
  //   )
  //     .then(() => {
  //       onClose();
  //     })
  //     .catch((error) => {
  //       console.error("Failed to update question:", error);
  //     });
  // };

  const handleUpdateQuestion = (question, index) => {
    // console.log("Question to update" + JSON.stringify(question));

    dispatch(
      updateQuestion({
        questionId: question._id,
        updatedData: {
          question: question.question,
          option1: question.option1,
          option2: question.option2,
          option3: question.option3,
          option4: question.option4,
          answer: question.answer,
        },
      })
    )
      .then(() => {
        // Update the UI by modifying the questions state
        setQuestions((prevQuestions) => {
          const newQuestions = [...prevQuestions];
          newQuestions[index] = { ...newQuestions[index], ...question };
          return newQuestions;
        });
        onClose(); // Optionally close the modal after updating
      })
      .catch((error) => {
        console.error("Failed to update question:", error);
      });
  };

  const handleSave = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleCreateQuestion = (index) => {
    const newQuestion = questions[index];
    dispatch(
      createQuestion({
        catID: paperData.catID,
        subCatID: paperData.subCatId,
        QPYearID: paperData.yearId,
        question: newQuestion.question,
        option1: newQuestion.option1,
        option2: newQuestion.option2,
        option3: newQuestion.option3,
        option4: newQuestion.option4,
        answer: newQuestion.answer,
        ...(newQuestion.subject && { subjectId: newQuestion.subject }),
        ...(newQuestion.topic && { topicId: newQuestion.topic }),
      })
    )
      .then((response) => {
        const newQuestionId = response.payload._id;
        setQuestions((prevQuestions) => {
          const newQuestions = [...prevQuestions];
          newQuestions[index] = { ...newQuestions[index], _id: newQuestionId };
          return newQuestions;
        });
      })
      .catch((error) => {
        console.error("Failed to create question:", error);
      });
  };

  const handleUploadExcel = () => {
    setIsUploadExcelOpen(true);
  };

  // const handleDownloadExcel = () => {
  //   if (questions && questions.length > 0) {
  //     const ws = XLSX.utils.json_to_sheet(questions);
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, "Questions");
  //     const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //     const blob = new Blob([wbout], { type: "application/octet-stream" });
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "questions.xlsx";
  //     link.click();
  //     URL.revokeObjectURL(url); // Clean up the URL object
  //   }
  // };

  const handleDownloadExcel = () => {
    if (questions && questions.length > 0) {
      const ws = XLSX.utils.json_to_sheet(questions);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Questions");

      // Generate the file name based on whether paperData.questionPaperName exists
      const fileName = paperData.questionPaperName
        ? `${paperData.questionPaperName}.xlsx`
        : "questions.xlsx";

      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName; // Use the generated file name
      link.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  if (subjectsLoading || topicsLoading) return <p>Loading...</p>;
  if (subjectsError) return <p>Error loading subjects: {subjectsError}</p>;
  if (topicsError) return <p>Error loading topics: {topicsError}</p>;

  return (
    <div className="edit-question-paper">
      {isUploadExcelOpen && (
        <UploadExcel
          onClose={() => setIsUploadExcelOpen(false)}
          paperData={paperData} // Pass the paperData to the UploadExcel component
        />
      )}
      <h2>Edit Question Paper</h2>
      <p className="question-count">Total Questions: {questions.length}</p>
      <div className="d-flex justify-content-center custom-margin">
        <button className="btn btn-primary mx-2" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button className="btn btn-secondary mx-2" onClick={handleUploadExcel}>
          Upload Excel
        </button>
        <button className="btn btn-success mx-2" onClick={handleDownloadExcel}>
          Download Excel
        </button>
        <button className="btn btn-danger mx-2" onClick={onClose}>
          Close
        </button>
      </div>

      {questions.map((question, index) => (
        <div key={question._id} className="question-container">
          <textarea
            name="question"
            value={question.question}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Question"
            rows="8"
            className="question-textarea"
          />
          <input
            type="text"
            name="option1"
            value={question.option1}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Option 1"
          />
          <input
            type="text"
            name="option2"
            value={question.option2}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Option 2"
          />
          <input
            type="text"
            name="option3"
            value={question.option3}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Option 3"
          />
          <input
            type="text"
            name="option4"
            value={question.option4}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Option 4"
          />
          <select
            name="answer"
            value={question.answer}
            onChange={(e) => handleInputChange(index, e)}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>

          {/* Subject Dropdown */}
          <select
            name="subject"
            value={question.subjectID || ""}
            onChange={(e) => handleInputChange(index, e)}
          >
            <option value="">Not Provided</option>
            {subjects.length === 0 ? (
              <option value="">No subjects available</option>
            ) : (
              subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subName}
                </option>
              ))
            )}
          </select>

          {/* Topic Dropdown */}
          <select
            name="topic"
            value={question.topicID || ""}
            onChange={(e) => handleInputChange(index, e)}
          >
            <option value="">Not Provided</option>
            {topics.length === 0 ? (
              <option value="">No topics available</option>
            ) : (
              topics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.topic}
                </option>
              ))
            )}
          </select>

          <div className="question-buttons">
            {question._id.startsWith("new-") ? (
              <>
                <button
                  className="btn btn-success"
                  onClick={() => handleCreateQuestion(index)}
                >
                  Add
                </button>
                <button
                  className="btn"
                  // onClick={() => handleDeleteQuestion(index)}
                  onClick={() => handleDeleteQuestionUi(index)}
                >
                  Delete Blank Question
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-success"
                  onClick={() => handleUpdateQuestion(question, index)}
                >
                  Update
                </button>
              </>
            )}
            <button
              className="btn btn-danger"
              // onClick={() => handleDeleteQuestion(index)}
              onClick={() => handleDeleteQuestion(index, question._id)}
            >
              Delete from Server
            </button>
          </div>
        </div>
      ))}

      {/* <div className="action-buttons">
        <button onClick={handleSave}>Save All</button>
        <button onClick={onClose}>Cancel</button>
      </div> */}

      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditQuestionPaper;
