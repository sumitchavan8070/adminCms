import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchYears,
  addYear,
  updateYear,
  deleteYear,
} from "../Slice/yearSlice"; // Update the path as needed

const YearsComponent = () => {
  const dispatch = useDispatch();
  const { years, status, error } = useSelector((state) => state.years);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editYearId, setEditYearId] = useState(null);
  const [editYearValue, setEditYearValue] = useState("");
  const [newYear, setNewYear] = useState("");

  useEffect(() => {
    dispatch(fetchYears());
  }, [dispatch]);

  const handleAddYear = () => {
    if (newYear.trim()) {
      dispatch(addYear(newYear.trim()));
      setNewYear("");
    }
  };

  const handleUpdateYear = () => {
    if (editYearValue.trim()) {
      dispatch(updateYear({ id: editYearId, year: editYearValue.trim() }));
      setShowEditModal(false);
    }
  };

  const handleDeleteYear = (yearId) => {
    dispatch(deleteYear(yearId));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="years-component">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => (
            <tr key={year._id}>
              <td>{year.year}</td>
              <td>
                <button
                  onClick={() => {
                    setEditYearId(year._id);
                    setEditYearValue(year.year);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteYear(year._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
                placeholder="Enter Year"
              />
              <button onClick={handleAddYear}>Add Year</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Edit Year Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Year</h2>
            <input
              value={editYearValue}
              onChange={(e) => setEditYearValue(e.target.value)}
              placeholder="Enter Updated Year"
            />
            <div className="modal-buttons">
              <button onClick={handleUpdateYear}>Update</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearsComponent;
