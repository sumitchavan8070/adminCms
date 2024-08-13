import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestionPaper,
  updateQuestionPaper,
} from "../Slice/questionPaperSlice";

const QuestionPaperForm = ({ currentPaper }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    subjectID: "",
    topicID: "",
    // Other fields
  });

  useEffect(() => {
    if (currentPaper) {
      setFormData(currentPaper);
    }
  }, [currentPaper]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPaper) {
      dispatch(updateQuestionPaper(formData));
    } else {
      dispatch(createQuestionPaper(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input
          type="text"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Option 1:
        <input
          type="text"
          name="option1"
          value={formData.option1}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Option 2:
        <input
          type="text"
          name="option2"
          value={formData.option2}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Option 3:
        <input
          type="text"
          name="option3"
          value={formData.option3}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Option 4:
        <input
          type="text"
          name="option4"
          value={formData.option4}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Answer:
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleChange}
          required
        />
      </label>
      {/* Add more fields */}
      <button type="submit">
        {currentPaper ? "Update" : "Create"} Question Paper
      </button>
    </form>
  );
};

export default QuestionPaperForm;
