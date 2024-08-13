// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "../CSS/Students.css";

// // const Students = () => {
// //   const [students, setStudents] = useState([]);

// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const response = await axios.get("/get-all-students");
// //         setStudents(response.data);
// //       } catch (error) {
// //         console.error("Error fetching students", error);
// //       }
// //     };

// //     fetchStudents();
// //   }, []);

// //   return (
// //     <div className="students-table">
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Username</th>
// //             <th>Email</th>
// //             <th>Mobile Number</th>
// //             <th>Subscription Status</th>
// //             <th>Subscription Period</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {students.map((student) => (
// //             <tr key={student._id}>
// //               <td>{student.name}</td>
// //               <td>{student.username}</td>
// //               <td>{student.email}</td>
// //               <td>{student.mobileNumber}</td>
// //               <td>{student.subscriptionStatus}</td>
// //               <td>{student.subscriptionPeriod}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default Students;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../CSS/Students.css";

// const Students = () => {
//   const [students, setStudents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("/get-all-students");
//         console.log(JSON.stringify(response));

//         setStudents(response.data);
//       } catch (error) {
//         console.error("Error fetching students", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value.toLowerCase());
//   };

//   // Function to filter students based on search query
//   const filteredStudents = students.filter((student) => {
//     return (
//       student.name.toLowerCase().includes(searchQuery) ||
//       student.email.toLowerCase().includes(searchQuery) ||
//       student.mobileNumber.toLowerCase().includes(searchQuery)
//     );
//   });

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
//             <th>Subscription Period</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredStudents.map((student) => (
//             <tr key={student._id}>
//               <td>{student.name}</td>
//               <td>{student.username}</td>
//               <td>{student.email}</td>
//               <td>{student.mobileNumber}</td>
//               <td>{student.subscriptionStatus}</td>
//               <td>{student.subscriptionPeriod}</td>
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

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/get-all-students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudents();
  }, []);

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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Subscription Status</th>
            <th>Subscription Period</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student._id}>
              <td>{student.name || "N/A"}</td>
              <td>{student.username || "N/A"}</td>
              <td>{student.email || "N/A"}</td>
              <td>{student.mobileNumber || "N/A"}</td>
              <td>{student.subscriptionStatus || "N/A"}</td>
              <td>{student.subscriptionPeriod || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
