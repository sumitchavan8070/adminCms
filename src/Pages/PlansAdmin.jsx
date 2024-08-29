// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchPlans,
// //   createPlan,
// //   updatePlan,
// //   deletePlan,
// // } from "../Slice/plansSlice";

// // const PlansAdmin = () => {
// //   const dispatch = useDispatch();
// //   const { plans, status, error } = useSelector((state) => state.plans);

// //   const [newPlan, setNewPlan] = useState({
// //     plan: "",
// //     name: "",
// //     price: "",
// //     features: [],
// //     popular: false,
// //     durationInDays: 0,
// //   });

// //   const [editPlan, setEditPlan] = useState(null);

// //   useEffect(() => {
// //     dispatch(fetchPlans());
// //   }, [dispatch]);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setNewPlan((prevPlan) => ({
// //       ...prevPlan,
// //       [name]: type === "checkbox" ? checked : value,
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (editPlan) {
// //       dispatch(updatePlan({ ...editPlan, ...newPlan }));
// //       setEditPlan(null);
// //     } else {
// //       dispatch(createPlan(newPlan));
// //     }
// //     setNewPlan({
// //       plan: "",
// //       name: "",
// //       price: "",
// //       features: [],
// //       popular: false,
// //       durationInDays: 0,
// //     });
// //   };

// //   const handleEdit = (plan) => {
// //     setEditPlan(plan);
// //     setNewPlan(plan);
// //   };

// //   const handleDelete = (planId) => {
// //     dispatch(deletePlan(planId));
// //   };

// //   return (
// //     <div>
// //       <h1>Manage Subscription Plans</h1>

// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           name="plan"
// //           value={newPlan.plan}
// //           onChange={handleChange}
// //           placeholder="Plan"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="name"
// //           value={newPlan.name}
// //           onChange={handleChange}
// //           placeholder="Plan Name"
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="price"
// //           value={newPlan.price}
// //           onChange={handleChange}
// //           placeholder="Price"
// //           required
// //         />
// //         <input
// //           type="number"
// //           name="durationInDays"
// //           value={newPlan.durationInDays}
// //           onChange={handleChange}
// //           placeholder="Duration (Days)"
// //           required
// //         />
// //         <textarea
// //           name="features"
// //           value={newPlan.features.join(", ")}
// //           onChange={(e) =>
// //             setNewPlan((prevPlan) => ({
// //               ...prevPlan,
// //               features: e.target.value.split(",").map((f) => f.trim()),
// //             }))
// //           }
// //           placeholder="Features (comma-separated)"
// //           required
// //         />
// //         <label>
// //           <input
// //             type="checkbox"
// //             name="popular"
// //             checked={newPlan.popular}
// //             onChange={handleChange}
// //           />
// //           Popular
// //         </label>
// //         <button type="submit">
// //           {editPlan ? "Update Plan" : "Create Plan"}
// //         </button>
// //       </form>

// //       {status === "loading" && <p>Loading...</p>}
// //       {status === "failed" && <p>Error: {error}</p>}

// //       <h2>Current Plans</h2>
// //       <ul>
// //         {plans.map((plan) => (
// //           <li key={plan.plan}>
// //             <h3>{plan.name}</h3>
// //             <p>{plan.price}</p>
// //             <p>Duration: {plan.durationInDays} days</p>
// //             <ul>
// //               {plan.features.map((feature, index) => (
// //                 <li key={index}>{feature}</li>
// //               ))}
// //             </ul>
// //             <p>{plan.popular ? "Popular" : "Not Popular"}</p>
// //             <button onClick={() => handleEdit(plan)}>Edit</button>
// //             <button onClick={() => handleDelete(plan.plan)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default PlansAdmin;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchPlans,
//   createPlan,
//   updatePlan,
//   deletePlan,
// } from "../Slice/plansSlice";
// import "../CSS/PlansAdmin.css"; // Import the CSS file

// const PlansAdmin = () => {
//   const dispatch = useDispatch();
//   const { plans, status, error } = useSelector((state) => state.plans);

//   const [newPlan, setNewPlan] = useState({
//     plan: "",
//     name: "",
//     price: "",
//     features: [],
//     popular: false,
//     durationInDays: 0,
//   });

//   const [editPlan, setEditPlan] = useState(null);

//   useEffect(() => {
//     dispatch(fetchPlans());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewPlan((prevPlan) => ({
//       ...prevPlan,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editPlan) {
//       dispatch(updatePlan({ ...editPlan, ...newPlan }));
//       setEditPlan(null);
//     } else {
//       dispatch(createPlan(newPlan));
//     }
//     setNewPlan({
//       plan: "",
//       name: "",
//       price: "",
//       features: [],
//       popular: false,
//       durationInDays: 0,
//     });
//   };

//   const handleEdit = (plan) => {
//     setEditPlan(plan);
//     setNewPlan(plan);
//   };

//   const handleDelete = (planId) => {
//     dispatch(deletePlan(planId));
//   };

//   return (
//     <div className="plans-admin-container">
//       <h1>Manage Subscription Plans</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="plan"
//           value={newPlan.plan}
//           onChange={handleChange}
//           placeholder="Plan"
//           required
//         />
//         <input
//           type="text"
//           name="name"
//           value={newPlan.name}
//           onChange={handleChange}
//           placeholder="Plan Name"
//           required
//         />
//         <input
//           type="text"
//           name="price"
//           value={newPlan.price}
//           onChange={handleChange}
//           placeholder="Price"
//           required
//         />
//         <input
//           type="number"
//           name="durationInDays"
//           value={newPlan.durationInDays}
//           onChange={handleChange}
//           placeholder="Duration (Days)"
//           required
//         />
//         <textarea
//           name="features"
//           value={newPlan.features.join(", ")}
//           onChange={(e) =>
//             setNewPlan((prevPlan) => ({
//               ...prevPlan,
//               features: e.target.value.split(",").map((f) => f.trim()),
//             }))
//           }
//           placeholder="Features (comma-separated)"
//           required
//         />
//         <label>
//           <input
//             type="checkbox"
//             name="popular"
//             checked={newPlan.popular}
//             onChange={handleChange}
//           />
//           Popular
//         </label>
//         <button type="submit">
//           {editPlan ? "Update Plan" : "Create Plan"}
//         </button>
//       </form>

//       {status === "loading" && <p className="loading">Loading...</p>}
//       {status === "failed" && <p className="error">Error: {error}</p>}

//       <div className="current-plans">
//         <h2>Current Plans</h2>
//         <ul>
//           {plans.map((plan) => (
//             <li key={plan.plan}>
//               <h3>{plan.name}</h3>
//               <p>{plan.price}</p>
//               <p>Duration: {plan.durationInDays} days</p>
//               <ul>
//                 {plan.features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//               <p>{plan.popular ? "Popular" : "Not Popular"}</p>
//               <button onClick={() => handleEdit(plan)}>Edit</button>
//               <button onClick={() => handleDelete(plan.plan)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PlansAdmin;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlans,
  createPlan,
  updatePlan,
  deletePlan,
} from "../Slice/plansSlice";
import "../CSS/PlansAdmin.css"; // Import the CSS file

const PlansAdmin = () => {
  const dispatch = useDispatch();
  const { plans, status, error } = useSelector((state) => state.plans);

  const [newPlan, setNewPlan] = useState({
    plan: "",
    name: "",
    price: "",
    features: [],
    popular: false,
    durationInDays: 0,
  });

  const [editPlan, setEditPlan] = useState(null);

  useEffect(() => {
    dispatch(fetchPlans());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPlan((prevPlan) => ({
      ...prevPlan,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editPlan) {
      dispatch(updatePlan({ ...editPlan, ...newPlan }));
      setEditPlan(null);
    } else {
      dispatch(createPlan(newPlan));
    }
    setNewPlan({
      plan: "",
      name: "",
      price: "",
      features: [],
      popular: false,
      durationInDays: 0,
    });
  };

  const handleEdit = (plan) => {
    setEditPlan(plan);
    setNewPlan(plan);
  };

  const handleDelete = (planId) => {
    dispatch(deletePlan(planId));
  };

  return (
    <div className="plans-admin-container">
      <h1>Manage Subscription Plans</h1>

      <form onSubmit={handleSubmit} className="plan-form">
        <input
          type="text"
          name="plan"
          value={newPlan.plan}
          onChange={handleChange}
          placeholder="Plan"
          required
        />
        <input
          type="text"
          name="name"
          value={newPlan.name}
          onChange={handleChange}
          placeholder="Plan Name"
          required
        />
        <input
          type="text"
          name="price"
          value={newPlan.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="durationInDays"
          value={newPlan.durationInDays}
          onChange={handleChange}
          placeholder="Duration (Days)"
          required
        />
        <textarea
          name="features"
          value={newPlan.features.join(", ")}
          onChange={(e) =>
            setNewPlan((prevPlan) => ({
              ...prevPlan,
              features: e.target.value.split(",").map((f) => f.trim()),
            }))
          }
          placeholder="Features (comma-separated)"
          required
        />
        <label>
          <input
            type="checkbox"
            name="popular"
            checked={newPlan.popular}
            onChange={handleChange}
          />
          Popular
        </label>
        <button type="submit" className="submit-button">
          {editPlan ? "Update Plan" : "Create Plan"}
        </button>
      </form>

      {status === "loading" && <p className="loading">Loading...</p>}
      {status === "failed" && <p className="error">Error: {error}</p>}

      <div className="current-plans">
        <h2>Current Plans</h2>
        {plans.length === 0 ? (
          <div className="no-plans">
            <p>No plans available.</p>
          </div>
        ) : (
          <ul>
            {plans.map((plan) => (
              <li key={plan.plan} className="plan-item">
                <h3>{plan.name}</h3>
                <p className="plan-price">{plan.price}</p>
                <p className="plan-duration">
                  Duration: {plan.durationInDays} days
                </p>
                <ul className="plan-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <p className="plan-popularity">
                  {plan.popular ? "Popular" : "Not Popular"}
                </p>
                <div className="plan-buttons">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.plan)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PlansAdmin;
