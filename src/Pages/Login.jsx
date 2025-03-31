// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   ADMIN_USERNAME,
//   ADMIN_PASSWORD,
//   EMPLOYEE_USERNAME,
//   EMPLOYEE_PASSWORD,
//   DEVELOPER_USERNAME,
//   DEVELOPER_PASSWORD,
// } from "../GlobalStrings/globalStrings";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [role, setRole] = useState("admin"); // Default role is admin
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Get valid credentials based on selected role
//     let validUsername, validPassword;
//     if (role === "admin") {
//       validUsername = ADMIN_USERNAME;
//       validPassword = ADMIN_PASSWORD;
//     } else if (role === "employee") {
//       validUsername = EMPLOYEE_USERNAME;
//       validPassword = EMPLOYEE_PASSWORD;
//     } else if (role === "developer") {
//       validUsername = DEVELOPER_USERNAME;
//       validPassword = DEVELOPER_PASSWORD;
//     }

//     // Check credentials
//     if (username === validUsername && password === validPassword) {
//       dispatch({ type: "LOGIN", payload: { role } }); // Dispatch role with login
//       navigate("/"); // Redirect to home after login
//     } else {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Welcome Back</h2>
//         <p className="login-subtitle">Please log in to continue</p>

//         {error && <p className="error-message">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           {/* Username Field */}
//           <div className="input-group">
//             <label htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Role Dropdown */}
//           <div className="input-group">
//             <label htmlFor="role">Role</label>
//             <select
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="admin">Admin</option>
//               <option value="employee">Employee</option>
//               <option value="developer">Developer</option>
//             </select>
//           </div>

//           {/* Login Button */}
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  EMPLOYEE_USERNAME,
  EMPLOYEE_PASSWORD,
  DEVELOPER_USERNAME,
  DEVELOPER_PASSWORD,
} from "../GlobalStrings/globalStrings";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("admin"); // Default role is admin
  const [showPassword, setShowPassword] = useState(false); // State for show/hide password
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get valid credentials based on selected role
    let validUsername, validPassword;
    if (role === "admin") {
      validUsername = ADMIN_USERNAME;
      validPassword = ADMIN_PASSWORD;
    } else if (role === "employee") {
      validUsername = EMPLOYEE_USERNAME;
      validPassword = EMPLOYEE_PASSWORD;
    } else if (role === "developer") {
      validUsername = DEVELOPER_USERNAME;
      validPassword = DEVELOPER_PASSWORD;
    }

    // Check credentials
    if (username === validUsername && password === validPassword) {
      dispatch({ type: "LOGIN", payload: { role } }); // Dispatch role with login
      navigate("/"); // Redirect to home after login
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to continue</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Role Dropdown */}
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
              <option value="developer">Developer</option>
            </select>
          </div>
          {/* Username Field */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Field with Show/Hide Functionality */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-slash"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C13.578 10.924 13.682 10.555 13.6 10.18c-.082-.374-.29-.712-.602-1.01-.312-.298-.71-.545-1.198-.74l-.18-.05a3.05 3.05 0 0 0-.87-.28c-.31-.07-.634-.12-.97-.146-.336-.025-.674-.025-1.014 0a3.05 3.05 0 0 0-.87.28l-.18.05c-.488.2-.886.442-1.198.74-.312.298-.52.636-.602 1.01-.082.374-.082.776 0 1.18.082.404.29.74.602 1.01.312.298.71.545 1.198.74l.18.05a3.05 3.05 0 0 0 .87.28c.31.07.634.12.97.146.336.025.674.025 1.014 0a3.05 3.05 0 0 0 .87-.28l.18-.05c.488-.2.886-.442 1.198-.74.312-.298.52-.636.602-1.01.082-.374.082-.776 0-1.18zM10.06 8.46a1.65 1.65 0 0 1-.232-.74l-.18-.05a1.65 1.65 0 0 1-.74-.232c-.298-.12-.545-.312-.74-.562-.195-.25-.31-.542-.31-.87 0-.33.115-.62.31-.87.195-.25.442-.442.74-.562.298-.12.642-.18.982-.18.34 0 .682.06.982.18.298.12.545.312.74.562.195.25.31.542.31.87 0 .33-.115.62-.31.87-.195.25-.442.442-.74.562-.298.12-.642.18-.982.18-.34 0-.682-.06-.982-.18zm-4.522 0a1.65 1.65 0 0 1-.232-.74l-.18-.05a1.65 1.65 0 0 1-.74-.232c-.298-.12-.545-.312-.74-.562-.195-.25-.31-.542-.31-.87 0-.33.115-.62.31-.87.195-.25.442-.442.74-.562.298-.12.642-.18.982-.18.34 0 .682.06.982.18.298.12.545.312.74.562.195.25.31.542.31.87 0 .33-.115.62-.31.87-.195.25-.442.442-.74.562-.298.12-.642.18-.982.18-.34 0-.682-.06-.982-.18z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
