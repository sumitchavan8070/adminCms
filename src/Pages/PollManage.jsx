import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPolls,
  approvePoll,
  rejectPoll,
  undoApproval,
  undoReject,
  deletePoll,
} from "../Slice/pollsSlice";
import "../CSS/Poll.css"; // Import CSS file

const PollManage = () => {
  const dispatch = useDispatch();
  const { polls, loading, error } = useSelector((state) => state.polls);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all"); // For sorting based on status
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const pollsPerPage = 10; // Number of polls per page

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  // Handler functions
  const handleApprove = (pollId) => {
    dispatch(approvePoll({ postId: pollId, approved: true }));
  };

  const handleReject = (pollId) => {
    dispatch(rejectPoll({ postId: pollId, rejected: true }));
  };

  const handleUndoApprove = (pollId) => {
    dispatch(undoApproval({ postId: pollId, approved: false }));
  };

  const handleUndoReject = (pollId) => {
    dispatch(undoReject({ postId: pollId, rejected: false }));
  };

  const handleDelete = (pollId) => {
    dispatch(deletePoll(pollId));
  };

  const filterPolls = (polls) => {
    let filteredPolls = [...polls]; // Create a copy of the array

    // Apply search filter
    if (searchQuery) {
      filteredPolls = filteredPolls.filter(
        (poll) =>
          poll.postedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
          poll.poll.question
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          poll.poll.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filteredPolls = filteredPolls.filter((poll) =>
        statusFilter === "pending"
          ? !poll.approved && !poll.rejected
          : statusFilter === "approved"
          ? poll.approved
          : statusFilter === "rejected"
          ? poll.rejected
          : false
      );
    }

    return filteredPolls.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  // Get current polls for the page
  const filteredPolls = filterPolls(polls);
  const indexOfLastPoll = currentPage * pollsPerPage;
  const indexOfFirstPoll = indexOfLastPoll - pollsPerPage;
  const currentPolls = filteredPolls.slice(indexOfFirstPoll, indexOfLastPoll);
  const totalPages = Math.ceil(filteredPolls.length / pollsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="poll-manage-container">
      <h1 className="heading">Polls Page</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-text">{error}</div>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search polls based on id , question , option , answer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Show All Rows</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <table className="students-table">
        <thead>
          <tr>
            <th>Posted By</th>
            <th>Time</th>
            <th>Question</th>
            <th>Options</th>
            <th>Answer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPolls.map((poll) => (
            <tr key={poll._id}>
              <td>{poll.postedBy}</td>
              <td>{new Date(poll.createdAt).toLocaleString()}</td>
              <td>{poll.poll.question}</td>
              <td>{poll.poll.options.join(", ")}</td>
              <td>{poll.poll.answer}</td>
              <td
                className={`status ${
                  poll.approved
                    ? "approved"
                    : poll.rejected
                    ? "rejected"
                    : "pending"
                }`}
              >
                {poll.approved
                  ? "Approved"
                  : poll.rejected
                  ? "Rejected"
                  : "Pending"}
              </td>
              <td className="button-container-poll">
                {!poll.approved && !poll.rejected && (
                  <>
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(poll._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(poll._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {poll.approved && (
                  <button
                    className="undo-button"
                    onClick={() => handleUndoApprove(poll._id)}
                  >
                    Undo Approve
                  </button>
                )}
                {poll.rejected && (
                  <button
                    className="undo-button"
                    onClick={() => handleUndoReject(poll._id)}
                  >
                    Undo Reject
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(poll._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default PollManage;
