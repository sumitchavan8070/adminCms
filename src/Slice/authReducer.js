// // // src/redux/reducers/authReducer.js
// // const initialState = {
// //   isAuthenticated: false,
// // };

// // const authReducer = (state = initialState, action) => {
// //   switch (action.type) {
// //     case "LOGIN":
// //       return { ...state, isAuthenticated: true };
// //     case "LOGOUT":
// //       return { ...state, isAuthenticated: false };
// //     default:
// //       return state;
// //   }
// // };

// // export default authReducer;
// // src/redux/reducers/authReducer.js
// const initialState = {
//   isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       localStorage.setItem("isAuthenticated", true); // Persist login state
//       return { ...state, isAuthenticated: true };
//     case "LOGOUT":
//       localStorage.removeItem("isAuthenticated"); // Clear persisted state
//       return { ...state, isAuthenticated: false };
//     default:
//       return state;
//   }
// };

// export default authReducer;
// src/redux/reducers/authReducer.js
const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  role: localStorage.getItem("role") || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("role", action.payload.role); // Save role in localStorage
      return { ...state, isAuthenticated: true, role: action.payload.role };
    case "LOGOUT":
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      return { ...state, isAuthenticated: false, role: null };
    default:
      return state;
  }
};

export default authReducer;
