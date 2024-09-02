import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFeedbacks,
  deleteFeedback,
  replyToFeedback,
  updateFeedbackInterest,
} from "../Slice/feedbacksSlice";
import "../CSS/Feedback.css"; // Import CSS file

const FeedbackManage = () => {
  const dispatch = useDispatch();
  const { feedbacks, loading, error } = useSelector((state) => state.feedbacks);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const feedbacksPerPage = 10; // Number of feedbacks per page

  const [replyText, setReplyText] = useState(""); // For replying to feedback
  const [selectedFeedback, setSelectedFeedback] = useState(null); // For managing selected feedback

  useEffect(() => {
    dispatch(fetchFeedbacks());
  }, [dispatch]);

  const handleDelete = (feedbackId) => {
    dispatch(deleteFeedback(feedbackId));
  };

  const handleReply = (id) => {
    dispatch(replyToFeedback({ id, reply: replyText }));
    setReplyText("");
    setSelectedFeedback(null); // Close the popup after replying
  };

  const filterFeedbacks = (feedbacks) => {
    let filteredFeedbacks = [...feedbacks];

    // Apply search filter
    if (searchQuery) {
      filteredFeedbacks = filteredFeedbacks.filter(
        (feedback) =>
          feedback.feedback.toLowerCase().includes(searchQuery.toLowerCase()) ||
          feedback?.userid?.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    return filteredFeedbacks.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  // Get current feedbacks for the page
  const filteredFeedbacks = filterFeedbacks(feedbacks);
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );
  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    hours = String(hours).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handleInterestChange = (feedbackId, isInterested) => {
    dispatch(updateFeedbackInterest({ feedbackId, isInterested }));
  };

  return (
    <div className="feedback-manage-container">
      <h1 className="heading">Feedback Management</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-text">{error}</div>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search feedbacks by content or username"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="feedbacks-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created Date</th>
            <th>User Email</th>
            <th>Mobile Number</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentFeedbacks.map((feedback) => (
            <tr key={feedback._id}>
              <td>{feedback?.userid?.name}</td>
              <td>{formatDate(feedback?.createdAt)}</td>
              <td>{feedback?.userid?.email}</td>
              <td>{feedback?.userid?.mobileNumber}</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.rating}</td>
              <td className="button-container-feedback">
                {feedback.status == "replied" ? (
                  <button className="reply-button">Replied</button>
                ) : (
                  <button
                    className="reply-button"
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    Reply
                  </button>
                )}

                {feedback.isInterested === true ? (
                  <button
                    className="noInt-button"
                    onClick={() => handleInterestChange(feedback._id, false)}
                  >
                    not intrested
                  </button>
                ) : (
                  <button
                    className="noInt-button"
                    onClick={() => handleInterestChange(feedback._id, true)}
                  >
                    intrested
                  </button>
                )}

                <button
                  className="delete-button"
                  onClick={() => handleDelete(feedback._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFeedback && (
        <div className="reply-modal">
          <h5>Reply to Feedback</h5>
          <p>
            <strong>To :</strong> {selectedFeedback.userid?.name} (
            {selectedFeedback.userid?.email})
          </p>
          <p>
            <strong>Feedback ID:</strong> {selectedFeedback._id}
          </p>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <button
            className="reply-button"
            onClick={() => handleReply(selectedFeedback._id)}
          >
            Send
          </button>
          <button
            className="delete-button"
            onClick={() => setSelectedFeedback(null)}
          >
            Cancel
          </button>
        </div>
      )}
      <div className="pagination">
        <div className="arrow">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? "disabled" : ""}
          >
            &laquo;
          </button>
        </div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          )
        )}
        <div className="arrow">
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? "disabled" : ""}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackManage;
