import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import EditExcelQuestionPaper from "./EditExcelQuestionPaper";
import "../CSS/UploadExcel.css"; // Import the CSS file
import { uploadPdf } from "../Slice/pdfSlice";

const UploadExcel = ({ onClose, paperData }) => {
  const dispatch = useDispatch();
  const { status, extractedText, questionsJson } = useSelector(
    (state) => state.pdf
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate(); // Hook for navigation

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    const fileType = selectedFile.type;
    if (fileType === "application/pdf") {
      // Handle PDF upload
      dispatch(uploadPdf(selectedFile));
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel"
    ) {
      // Handle Excel upload
      setIsLoading(true); // Start loading

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Check for mandatory columns
        const mandatoryColumns = [
          "question",
          "option1",
          "option2",
          "option3",
          "option4",
        ];
        const columns = Object.keys(jsonData[0]);
        const hasAllMandatoryColumns = mandatoryColumns.every((column) =>
          columns.includes(column)
        );

        if (!hasAllMandatoryColumns) {
          setUploadStatus("Upload failed. Missing mandatory columns.");
          setIsLoading(false); // Stop loading
          return;
        }

        // Prepare data
        const dataToPrint = {
          questions: jsonData.map((question) => ({
            catID: paperData.catID, // Assuming you need context-specific IDs
            subCatID: paperData.subCatId,
            QPYearID: paperData.yearId,
            question: question.question,
            option1: question.option1,
            option2: question.option2,
            option3: question.option3,
            option4: question.option4,
            answer: question.answer,
            ...(question.SubjectID && { subjectID: question.SubjectID }),
            ...(question.TopicID && { topicID: question.TopicID }),
          })),
        };

        // Set the questions state
        setQuestions(dataToPrint.questions);
        setUploadStatus("File uploaded successfully.");
        console.log("questions:", JSON.stringify(dataToPrint, null, 2));

        // Navigate to EditExcelQuestionPaper without paperData
        navigate("/edit-excel-question-paper", {
          state: { questions: dataToPrint.questions },
        });

        setIsLoading(false); // Stop loading

        // Optional: Reset the file input or close the upload modal if applicable
        // onClose();
      };

      reader.readAsBinaryString(selectedFile);
    } else {
      setUploadStatus("Unsupported file type.");
    }
  };

  const handleDownloadText = () => {
    if (extractedText) {
      const blob = new Blob([extractedText], {
        type: "text/plain;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "extracted_text.txt";
      link.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  const handleDownloadExcel = () => {
    if (questionsJson && questionsJson.length > 0) {
      const ws = XLSX.utils.json_to_sheet(questionsJson);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Questions");
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const blob = new Blob([wbout], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "questions.xlsx";
      link.click();
      URL.revokeObjectURL(url); // Clean up the URL object
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload File</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <p>
                <strong>Category:</strong> {paperData.catID}
              </p>
              <p>
                <strong>Subcategory:</strong> {paperData.subCatName}
              </p>
              <p>
                <strong>Year:</strong> {paperData.QPYear}
              </p>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                type="file"
                accept=".xlsx, .xls, .pdf"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <div className="mt-3 d-flex justify-content-between align-items-center">
                  <p className="mb-0">Selected File: {selectedFile.name}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={handleRemoveFile}
                  >
                    Remove File
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
            >
              {isLoading || status === "loading" ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Uploading...
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
          {uploadStatus && (
            <div className="alert alert-info text-center m-3">
              <p className="mb-0">{uploadStatus}</p>
            </div>
          )}
          {status === "succeeded" && (
            <div className="alert alert-success text-center m-3">
              <p className="mb-0">PDF processed successfully!</p>
              <button
                className="btn btn-success me-2"
                onClick={handleDownloadText}
              >
                Download Extracted Text
              </button>
              <button className="btn btn-success" onClick={handleDownloadExcel}>
                Download Generated Excel
              </button>
            </div>
          )}
          {status === "failed" && (
            <div className="alert alert-danger text-center m-3">
              <p className="mb-0">Error processing PDF</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadExcel;
