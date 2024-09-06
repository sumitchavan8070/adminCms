import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDonations,
  fetchDonationsByUserEmail,
  createDonation,
  updateDonation,
  deleteDonation,
} from "../Slice/donationSlice";
import "../CSS/DonationManager.css";

const DonationManager = () => {
  const [email, setEmail] = useState("");
  const [newDonation, setNewDonation] = useState({
    userId: "",
    donatePaymentId: "",
    amount: "",
  });
  const [editDonation, setEditDonation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(10);
  const [searchQueryTable, setSearchQueryTable] = useState("");

  const dispatch = useDispatch();
  const { donations, loading, error } = useSelector((state) => state.donations);

  useEffect(() => {
    dispatch(fetchDonations());
  }, [dispatch]);

  const handleSearch = () => {
    if (email) {
      dispatch(fetchDonationsByUserEmail(email));
    }
  };

  const handleCreate = () => {
    dispatch(createDonation(newDonation));
    setNewDonation({ userId: "", donatePaymentId: "", amount: "" });
  };

  const handleUpdate = () => {
    if (editDonation) {
      dispatch(
        updateDonation({ id: editDonation._id, donation: editDonation })
      );
      setEditDonation(null);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteDonation(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Function to handle the search input change
  const handleSearchTable = (event) => {
    setSearchQueryTable(event.target.value.toLowerCase());
  };

  // Function to filter donations based on search query
  //   const filteredDonations = donations.filter((donation) => {
  //     const userName = donation.userId?.name
  //       ? donation.userId.name.toLowerCase()
  //       : "";
  //     const userEmail = donation.userId?.email
  //       ? donation.userId.email.toLowerCase()
  //       : "";
  //     const donatePaymentId = donation.donatePaymentId
  //       ? donation.donatePaymentId.toLowerCase()
  //       : "";

  //     return (
  //       userName.includes(searchQueryTable) ||
  //       userEmail.includes(searchQueryTable) ||
  //       donatePaymentId.includes(searchQueryTable)
  //     );
  //   });

  // Function to filter donations based on search query
  const filteredDonations = donations.filter((donation) => {
    const userName = donation.userId?.name
      ? donation.userId.name.toLowerCase()
      : "";
    const userEmail = donation.userId?.email
      ? donation.userId.email.toLowerCase()
      : "";
    const donatePaymentId = donation.donatePaymentId
      ? donation.donatePaymentId.toLowerCase()
      : "";
    const amount = donation.amount
      ? donation.amount.toString().toLowerCase()
      : "";

    return (
      userName.includes(searchQueryTable) ||
      userEmail.includes(searchQueryTable) ||
      donatePaymentId.includes(searchQueryTable) ||
      amount.includes(searchQueryTable)
    );
  });

  //   // Calculate total donations
  //   const totalDonations = donations.reduce(
  //     (acc, donation) => acc + parseFloat(donation.amount || 0),
  //     0
  //   );

  //   // Pagination Logic
  //   const indexOfLastDonation = currentPage * donationsPerPage;
  //   const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  //   const currentDonations = donations.slice(
  //     indexOfFirstDonation,
  //     indexOfLastDonation
  //   );
  const totalDonations = filteredDonations.reduce(
    (acc, donation) => acc + parseFloat(donation.amount || 0),
    0
  );

  // Pagination Logic
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(
    indexOfFirstDonation,
    indexOfLastDonation
  );
  const totalPages = Math.ceil(donations.length / donationsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="donation-manager">
      <h2>Donation Manager</h2>

      {/* <div className="total-donations">
        <h3>Total Donations Received: ₹{totalDonations.toFixed(2)}</h3>
      </div> */}

      <div className="section">
        <h3>Search Donations by User Email</h3>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="section">
        <h3>Create New Donation</h3>
        <div className="input-group">
          <input
            type="text"
            value={newDonation.userId}
            onChange={(e) =>
              setNewDonation({ ...newDonation, userId: e.target.value })
            }
            placeholder="User ID"
          />
          <input
            type="text"
            value={newDonation.donatePaymentId}
            onChange={(e) =>
              setNewDonation({
                ...newDonation,
                donatePaymentId: e.target.value,
              })
            }
            placeholder="Payment ID"
          />
          <input
            type="number"
            value={newDonation.amount}
            onChange={(e) =>
              setNewDonation({ ...newDonation, amount: e.target.value })
            }
            placeholder="Amount"
          />
          <button onClick={handleCreate}>Create Donation</button>
        </div>
      </div>

      <div className="total-donations">
        <h3>Total Donations Received: ₹{totalDonations.toFixed(2)}</h3>
      </div>

      <div className="section">
        <h3>Search in table</h3>
        <div className="input-group">
          <input
            type="text"
            value={searchQueryTable}
            onChange={handleSearchTable}
            placeholder="Enter user email or name"
          />
        </div>
      </div>

      <div className="section">
        <h3>Donations List</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* <th>Donation ID</th> */}
                <th>User Name</th>
                <th>User Email</th>
                <th>Payment ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDonations.map((donation) => (
                <tr key={donation._id}>
                  {/* <td>{donation._id}</td> */}
                  <td>{donation.userId?.name}</td>
                  <td>{donation.userId?.email}</td>
                  <td>{donation.donatePaymentId}</td>
                  <td>{donation?.amount}</td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                  <td className="table-actions">
                    <button
                      className="edit-btn"
                      onClick={() => setEditDonation(donation)}
                      disabled={true}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(donation._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editDonation && (
        <div className="edit-form">
          <h3>Edit Donation</h3>
          <input
            type="text"
            value={editDonation.userId}
            onChange={(e) =>
              setEditDonation({ ...editDonation, userId: e.target.value })
            }
          />
          <input
            type="text"
            value={editDonation.donatePaymentId}
            onChange={(e) =>
              setEditDonation({
                ...editDonation,
                donatePaymentId: e.target.value,
              })
            }
          />
          <input
            type="number"
            value={editDonation.amount}
            onChange={(e) =>
              setEditDonation({ ...editDonation, amount: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update Donation</button>
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

export default DonationManager;
