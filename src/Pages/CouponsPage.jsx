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

  // Local state for modal
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const { plans } = useSelector((state) => state.plans);

  // Form fields
  const [couponCode, setCouponCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState(""); // New state for expiryDate

  // const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(""); // To store the selected plan

  useEffect(() => {
    dispatch(fetchCoupons());
    dispatch(fetchPlans());
  }, [dispatch]);

  // setPlans(data);

  const handleOpenCreateModal = () => {
    setShowModal(true);
    setIsEditing(false);
    setSelectedCoupon(null);
    setCouponCode("");
    setDiscountPercentage("");
    setMaxDiscountAmount("");
    setExpiryDate(""); // Reset expiry date
  };

  const handleOpenEditModal = (coupon) => {
    setShowModal(true);
    setIsEditing(true);
    setSelectedCoupon(coupon);
    setCouponCode(coupon.code);
    setDiscountPercentage(coupon.discountPercentage);
    setMaxDiscountAmount(coupon.maxDiscountAmount);
    setExpiryDate(coupon.expiryDate); // Set expiry date for editing
    setSelectedPlan(coupon.associatedPlan || ""); // Pre-fill associated plan
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setSelectedCoupon(null);
    setCouponCode("");
    setDiscountPercentage("");
    setMaxDiscountAmount("");
    setExpiryDate(""); // Reset expiry date
  };

  // const handleSaveCoupon = async () => {
  //   if (
  //     !couponCode ||
  //     !discountPercentage ||
  //     !maxDiscountAmount ||
  //     !expiryDate
  //   ) {
  //     alert("All fields are required!");
  //     return;
  //   }

  //   const couponData = {
  //     code: couponCode,
  //     discountPercentage: parseFloat(discountPercentage),
  //     maxDiscountAmount: parseFloat(maxDiscountAmount),
  //     expiryDate, // Include expiryDate
  //   };

  //   if (isEditing && selectedCoupon) {
  //     dispatch(updateCoupon({ id: selectedCoupon._id, couponData }));
  //   } else {
  //     dispatch(createCoupon(couponData));
  //   }

  //   handleCloseModal();
  // };
  const handleSaveCoupon = async () => {
    if (
      !couponCode ||
      !discountPercentage ||
      !maxDiscountAmount ||
      !expiryDate ||
      !selectedPlan
    ) {
      alert("All fields are required!");
      return;
    }

    const couponData = {
      code: couponCode,
      discountPercentage: parseFloat(discountPercentage),
      maxDiscountAmount: parseFloat(maxDiscountAmount),
      expiryDate,
      associatedPlan: selectedPlan, // Include the associated plan
    };

    if (isEditing && selectedCoupon) {
      dispatch(updateCoupon({ id: selectedCoupon._id, couponData }));
    } else {
      dispatch(createCoupon(couponData));
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupon(id));
    }
  };

  return (
    <div className="container mt-5">
      <h1>Coupon Management</h1>
      <Button
        variant="primary"
        className="mb-3"
        onClick={handleOpenCreateModal}
      >
        Create New Coupon
      </Button>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Discount Percentage</th>
              <th>Max Discount Amount</th>
              <th>Associated Plan</th>
              <th>Expiry Date</th> {/* Add expiry date column */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map(
                (coupon) => (
                  console.log(coupon),
                  (
                    <tr key={coupon._id}>
                      <td>{coupon.code}</td>
                      <td>{coupon.discountPercentage}%</td>
                      <td>₹{coupon.maxDiscountAmount}</td>
                      <td>
                        {plans.find(
                          (plan) => plan._id === coupon.associatedPlan
                        )?.name || "N/A"}
                      </td>
                      <td>
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </td>
                      {/* Display expiry date */}
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
                          onClick={() => handleDelete(coupon._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  )
                )
              )
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No coupons available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Create/Edit Coupon */}
      <Modal show={showModal} onHide={handleCloseModal}>
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

            {/* Add Expiry Date Field */}
            <Form.Group controlId="formExpiryDate" className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
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
