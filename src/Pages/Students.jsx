// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../CSS/Students.css";

// const Students = () => {
//   const [students, setStudents] = useState([]);
//   const [plans, setPlans] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch all students
//         const studentsResponse = await axios.get("/get-all-students");
//         setStudents(studentsResponse.data);

//         // Fetch all plans
//         const plansResponse = await axios.get("/plans/get-all");
//         const plansData = plansResponse.data;

//         // Create a mapping of plan IDs to plan details
//         const plansMap = {};
//         plansData.forEach((plan) => {
//           plansMap[plan._id] = plan;
//         });
//         setPlans(plansMap);
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value.toLowerCase());
//   };

//   // Function to filter students based on search query
//   const filteredStudents = students.filter((student) => {
//     const name = student.name ? student.name.toLowerCase() : "";
//     const email = student.email ? student.email.toLowerCase() : "";
//     const mobileNumber = student.mobileNumber
//       ? student.mobileNumber.toLowerCase()
//       : "";

//     return (
//       name.includes(searchQuery) ||
//       email.includes(searchQuery) ||
//       mobileNumber.includes(searchQuery)
//     );
//   });

//   // Function to calculate subscription duration in days
//   const calculateDurationInDays = (startDate, endDate) => {
//     if (!startDate || !endDate) return "N/A";
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const durationInMs = end - start;
//     const durationInDays = durationInMs / (1000 * 60 * 60 * 24); // Convert ms to days
//     return Math.round(durationInDays);
//   };

//   return (
//     <div className="students-table">
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by Name, Mobile Number, or Email"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Mobile Number</th>
//             <th>Subscription Status</th>
//             <th>Subscription Plan</th>
//             <th>Subscription Duration (Days)</th>
//             <th>Date of Purchase</th>
//             <th>Date of Expiry</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map((student) => (
//             <tr key={student._id}>
//               <td>{student.name || "N/A"}</td>
//               <td>{student.username || "N/A"}</td>
//               <td>{student.email || "N/A"}</td>
//               <td>{student.mobileNumber || "N/A"}</td>
//               <td>{student.isSubscriptionActive ? "Active" : "N/A"}</td>
//               <td>
//                 {plans[student.subscriptionPlanID]
//                   ? plans[student.subscriptionPlanID].name
//                   : "N/A"}
//               </td>
//               <td>
//                 {calculateDurationInDays(
//                   student.subscriptionStartDate,
//                   student.subscriptionExpiryDate
//                 )}
//               </td>
//               <td>
//                 {student.subscriptionStartDate
//                   ? new Date(student.subscriptionStartDate).toLocaleDateString()
//                   : "N/A"}
//               </td>
//               <td>
//                 {student.subscriptionExpiryDate
//                   ? new Date(
//                       student.subscriptionExpiryDate
//                     ).toLocaleDateString()
//                   : "N/A"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Students;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Students.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [plans, setPlans] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10; // Number of students per page
  const [selectAll, setSelectAll] = useState(false); // New state for Select All checkbox

  const [globalFreePlan, setGlobalFreePlan] = useState(""); // State for global free plan status

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showGlobalFreePlanForm, setShowGlobalFreePlanForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    fetchData();
    fetchGlobalFreePlanStatus();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all students
      const studentsResponse = await axios.get("/get-all-students");
      setStudents(studentsResponse.data);

      // Fetch all plans
      const plansResponse = await axios.get("/plans/get-all");
      const plansData = plansResponse.data;

      // Create a mapping of plan IDs to plan details
      const plansMap = {};
      plansData.forEach((plan) => {
        plansMap[plan._id] = plan;
      });
      setPlans(plansMap);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Function to filter students based on search query
  const filteredStudents = students.filter((student) => {
    const name = student.name ? student.name.toLowerCase() : "";
    const email = student.email ? student.email.toLowerCase() : "";
    const mobileNumber = student.mobileNumber
      ? student.mobileNumber.toLowerCase()
      : "";

    return (
      name.includes(searchQuery) ||
      email.includes(searchQuery) ||
      mobileNumber.includes(searchQuery)
    );
  });

  // Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // Function to calculate subscription duration in days
  const calculateDurationInDays = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMs = end - start;
    const durationInDays = durationInMs / (1000 * 60 * 60 * 24); // Convert ms to days
    return Math.round(durationInDays);
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId]
    );
  };

  const enableFreePlan = async () => {
    try {
      const responce = await axios.put("/enable-free-plan", {
        studentIds: selectedStudents,
      });
      await fetchData();
      alert("Free plan enabled for selected students");
    } catch (error) {
      alert(error);
      console.error("Error enabling free plan", error);
    }
  };

  const disablePlan = async () => {
    try {
      await axios.put("/disable-plan", { studentIds: selectedStudents });
      await fetchData();
      alert("Plan disabled for selected students");
    } catch (error) {
      alert(error);
      console.error("Error disabling plan", error);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      // Select all students on the current page
      const currentStudentIds = currentStudents.map((student) => student._id);
      setSelectedStudents(currentStudentIds);
    } else {
      // Deselect all students
      setSelectedStudents([]);
    }
  };

  // Fetch the current status of the global free plan
  // const fetchGlobalFreePlanStatus = async () => {
  //   try {
  //     const response = await axios.get("/global-free-plan-status");
  //     setGlobalFreePlan(response.data.status);
  //   } catch (error) {
  //     console.error("Error fetching global free plan status", error);
  //   }
  // };

  // const handleGlobalFreePlanChange = async (event) => {
  //   const status = event.target.value;
  //   setGlobalFreePlan(status);

  //   try {
  //     await axios.put("/update-global-free-plan", { status });
  //     alert(`Global Free Plan ${status === "Active" ? "Enabled" : "Disabled"}`);
  //   } catch (error) {
  //     console.error("Error updating global free plan status", error);
  //   }
  // };

  const fetchGlobalFreePlanStatus = async () => {
    try {
      const response = await axios.get("/global-free-plan-status");
      setGlobalFreePlan(response.data.status);
      setStartDate(new Date(response.data.subscriptionStartDate || Date.now()));
      setEndDate(new Date(response.data.subscriptionExpiryDate || Date.now()));
    } catch (error) {
      console.error("Error fetching global free plan status", error);
    }
  };

  const handleGlobalFreePlanChange = (event) => {
    setGlobalFreePlan(event.target.value);
  };

  const handleGlobalFreePlanSave = async () => {
    try {
      await axios.put("/update-global-free-plan", {
        status: globalFreePlan,
        subscriptionStartDate: startDate,
        subscriptionExpiryDate: endDate,
      });
      alert(
        `Global Free Plan ${
          globalFreePlan === "Active" ? "Enabled" : "Disabled"
        }`
      );
    } catch (error) {
      console.error("Error updating global free plan status", error);
    }
  };
  return (
    <div className="students-table">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Name, Mobile Number, or Email"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* <div className="global-free-plan">
        <label htmlFor="global-free-plan">Global Free Plan While Login:</label>
        <select
          id="global-free-plan"
          value={globalFreePlan}
          onChange={handleGlobalFreePlanChange}
        >
          <option value="" disabled>
            Not Selected
          </option>
          <option value="Active">Active</option>
          <option value="Disable">Disable</option>
        </select>

        <div className="date-picker-container">
          <label>Subscription Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        <div className="date-picker-container">
          <label>Subscription Expiry Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        <button onClick={handleGlobalFreePlanSave} disabled={!globalFreePlan}>
          Save
        </button>
      </div> */}

      <div className="button-container">
        <button
          onClick={() => setShowGlobalFreePlanForm(!showGlobalFreePlanForm)}
        >
          Set Free Plan Activity Status
        </button>
        <button onClick={enableFreePlan} disabled={!selectedStudents.length}>
          Enable Free Plan For Selected
        </button>
        <button onClick={disablePlan} disabled={!selectedStudents.length}>
          Disable Plan For Selected
        </button>
      </div>

      {showGlobalFreePlanForm && (
        <form className="global-free-plan">
          <label htmlFor="global-free-plan">
            Global Free Plan While Login:
          </label>
          <select
            id="global-free-plan"
            value={globalFreePlan}
            onChange={handleGlobalFreePlanChange}
          >
            <option value="" disabled>
              Not Selected
            </option>
            <option value="Active">Active</option>
            <option value="Disable">Disable</option>
          </select>

          <div className="date-picker-container">
            <label>Subscription Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy/MM/dd"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className="date-picker-container">
            <label>Subscription Expiry Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy/MM/dd"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <button onClick={handleGlobalFreePlanSave} disabled={!globalFreePlan}>
            Save
          </button>
        </form>
      )}

      {/* <div className="button-container">
        <button onClick={enableFreePlan} disabled={!selectedStudents.length}>
          Enable Free Plan For Selected
        </button>
        <button onClick={disablePlan} disabled={!selectedStudents.length}>
          Disable Plan For Selected
        </button>
      </div> */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Subscription Status</th>
            <th>Subscription Plan</th>
            <th>Subscription Duration (Days)</th>
            <th>Date of Purchase</th>
            <th>Date of Expiry</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student) => (
            <tr key={student._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => handleSelectStudent(student._id)}
                />
              </td>
              <td>{student.name || "-"}</td>
              <td>{student.username || "-"}</td>
              <td>{student.email || "-"}</td>
              <td>{student.mobileNumber || "-"}</td>
              <td>{student.isSubscriptionActive ? "Active" : "Inactive"}</td>
              <td>
                {plans[student.subscriptionPlanID]
                  ? plans[student.subscriptionPlanID].name
                  : "N/A"}
              </td>
              <td>
                {calculateDurationInDays(
                  student.subscriptionStartDate,
                  student.subscriptionExpiryDate
                )}
              </td>
              <td>
                {student.subscriptionStartDate
                  ? new Date(student.subscriptionStartDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {student.subscriptionExpiryDate
                  ? new Date(
                      student.subscriptionExpiryDate
                    ).toLocaleDateString()
                  : "N/A"}
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

export default Students;
