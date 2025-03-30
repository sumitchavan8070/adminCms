import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../Slice/couponSlice";
import { Modal, Button, Table, Form, Spinner, Alert } from "react-bootstrap";
import { fetchPlans } from "../Slice/plansSlice";

const CouponManagement = () => {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.coupons);
  const { plans } = useSelector((state) => state.plans);

  // Local state for modal
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Form fields
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState(""); // Expiry date field
  const [selectedPlan, setSelectedPlan] = useState(""); // Associated plan
  const [text, setText] = useState(""); // Text field
  const [link, setLink] = useState(""); // Link field
  const [isActive, setIsActive] = useState(true); // isActive dropdown

  // Filters
  const [filterStatus, setFilterStatus] = useState("all"); // For isActive filter (all/active/inactive)

  useEffect(() => {
    dispatch(fetchCoupons());
    dispatch(fetchPlans());
  }, [dispatch]);

  // Open modal for creating a new coupon
  const handleOpenCreateModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setSelectedCoupon(null);
    setCouponCode("");
    setDiscountPercentage("");
    setMaxDiscountAmount("");
    setExpiryDate("");
    setSelectedPlan("");
    setText("");
    setLink("");
    setIsActive(true); // Default isActive to true for new coupons
  };

  // Open modal for editing an existing coupon
  const handleOpenEditModal = (coupon) => {
    setShowModal(true);
    setIsEditing(true);
    setSelectedCoupon(coupon);
    setCouponCode(coupon.code);
    setDiscountPercentage(coupon.discountPercentage);
    setMaxDiscountAmount(coupon.maxDiscountAmount);
    setExpiryDate(coupon.expiryDate);
    setSelectedPlan(coupon.associatedPlan || "");
    setText(coupon.text); // Pre-fill text
    setLink(coupon.link); // Pre-fill link
    setIsActive(coupon.isActive); // Pre-fill isActive status
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedCoupon(null);
    setCouponCode("");
    setDiscountPercentage("");
    setMaxDiscountAmount("");
    setExpiryDate("");
    setSelectedPlan("");
    setText("");
    setLink("");
    setIsActive(true); // Reset isActive to default
  };

  // Save or update a coupon
  const handleSaveCoupon = async () => {
    if (
      !couponCode ||
      !discountPercentage ||
      !maxDiscountAmount ||
      !expiryDate ||
      !selectedPlan ||
      !text ||
      !link
    ) {
      alert("All fields are required!");
      return;
    }

    const couponData = {
      code: couponCode,
      discountPercentage: parseFloat(discountPercentage),
      maxDiscountAmount: parseFloat(maxDiscountAmount),
      expiryDate,
      associatedPlan: selectedPlan,
      text,
      link,
      isActive, // Include isActive in the payload
    };

    if (isEditing && selectedCoupon) {
      dispatch(updateCoupon({ id: selectedCoupon._id, couponData }));
    } else {
      dispatch(createCoupon(couponData));
    }

    handleCloseModal();
  };

  // Delete a coupon
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupon(id));
    }
  };

  // Toggle isActive status
  const handleToggleStatus = (id, isActive) => {
    if (
      window.confirm(
        `Are you sure you want to ${
          isActive ? "disable" : "enable"
        } this coupon?`
      )
    ) {
      const couponData = { isActive: !isActive }; // Toggle isActive
      dispatch(updateCoupon({ id, couponData }));
    }
  };

  // Filter and sort logic
  const filteredAndSortedCoupons = coupons
    .filter((coupon) => {
      return (
        filterStatus === "all" ||
        (filterStatus === "active" && coupon.isActive) ||
        (filterStatus === "inactive" && !coupon.isActive)
      );
    })
    .sort((a, b) => {
      // Sort active coupons to the top
      return b.isActive - a.isActive;
    });

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Coupon Management</h1>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-6 offset-md-6 d-flex justify-content-end">
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="all">All Coupons</option>
            <option value="active">Active Coupons</option>
            <option value="inactive">Inactive Coupons</option>
          </Form.Select>
        </div>
      </div>

      {/* Buttons */}
      <Button
        variant="primary"
        className="mb-3"
        onClick={handleOpenCreateModal}
      >
        Create New Coupon
      </Button>

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Table */}
      {!loading && !error && (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Coupon Code</th>
              <th>Discount %</th>
              <th>Max Discount</th>
              <th>Associated Plan</th>
              <th>Expiry Date</th>
              <th>Text</th>
              <th>Link</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCoupons.length > 0 ? (
              filteredAndSortedCoupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.code}</td>
                  <td>{coupon.discountPercentage}%</td>
                  <td>₹{coupon.maxDiscountAmount}</td>
                  <td>
                    {plans.find((plan) => plan._id === coupon.associatedPlan)
                      ?.name || "N/A"}
                  </td>
                  <td>{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                  <td>{coupon.text}</td>
                  <td>
                    <a
                      href={coupon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      {coupon.link}
                    </a>
                  </td>
                  <td>
                    {coupon.isActive ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-danger">Inactive</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleOpenEditModal(coupon)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDelete(coupon._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant={coupon.isActive ? "secondary" : "success"}
                      size="sm"
                      onClick={() =>
                        handleToggleStatus(coupon._id, coupon.isActive)
                      }
                    >
                      {coupon.isActive ? "Disable" : "Enable"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No coupons match the criteria.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Create/Edit Coupon */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Coupon" : "Create Coupon"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCouponCode" className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDiscountPercentage" className="mb-3">
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount percentage"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formMaxDiscountAmount" className="mb-3">
              <Form.Label>Max Discount Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter max discount amount"
                value={maxDiscountAmount}
                onChange={(e) => setMaxDiscountAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formAssociatedPlan" className="mb-3">
              <Form.Label>Select Plan</Form.Label>
              <Form.Control
                as="select"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option value="">Choose a plan</option>
                {plans.map((plan) => (
                  <option key={plan._id} value={plan._id}>
                    {plan.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formExpiryDate" className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </Form.Group>

            {/* Add Text Field */}
            <Form.Group controlId="formText" className="mb-3">
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>

            {/* Add Link Field */}
            <Form.Group controlId="formLink" className="mb-3">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Form.Group>

            {/* Add isActive Dropdown */}
            <Form.Group controlId="formIsActive" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={isActive}
                onChange={(e) => setIsActive(e.target.value === "true")}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveCoupon}>
            {isEditing ? "Update Coupon" : "Create Coupon"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CouponManagement;
