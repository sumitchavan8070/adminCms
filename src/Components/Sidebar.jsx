import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Handle logout
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch LOGOUT action to reset Redux state
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
        style={{ width: "280px" }}
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg className="bi pe-none me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <span className="fs-4">MeAdhikari</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${
                location.pathname === "/" ? "active" : "text-white"
              }`}
              aria-current="page"
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className={`nav-link ${
                location.pathname === "/categories" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/subcategories"
              className={`nav-link ${
                location.pathname === "/subcategories" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              Edit Year & SubCat
            </Link>
          </li>
          <li>
            <Link
              to="/question-papers"
              className={`nav-link ${
                location.pathname === "/question-papers"
                  ? "active"
                  : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#table"></use>
              </svg>
              Question Papers
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className={`nav-link ${
                location.pathname === "/students" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#grid"></use>
              </svg>
              Students
            </Link>
          </li>
          <li>
            <Link
              to="/subscription"
              className={`nav-link ${
                location.pathname === "/subscription" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Subscription
            </Link>
          </li>

          <li>
            <Link
              to="/poll"
              className={`nav-link ${
                location.pathname === "/poll" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Approve Polls
            </Link>
          </li>

          <li>
            <Link
              to="/post"
              className={`nav-link ${
                location.pathname === "/post" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Approve Post
            </Link>
          </li>

          <li>
            <Link
              to="/banner"
              className={`nav-link ${
                location.pathname === "/banner" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Banners Control
            </Link>
          </li>

          <li>
            <Link
              to="/feedback"
              className={`nav-link ${
                location.pathname === "/feedback" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Feedback Management
            </Link>
          </li>

          <li>
            <Link
              to="/donations"
              className={`nav-link ${
                location.pathname === "/donations" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Donation Management
            </Link>
          </li>

          <li>
            <Link
              to="/coupon"
              className={`nav-link ${
                location.pathname === "/coupon" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Coupon
            </Link>
          </li>

          <li>
            <Link
              to="/blog-manager"
              className={`nav-link ${
                location.pathname === "/blog-manager" ? "active" : "text-white"
              }`}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              Blog
            </Link>
          </li>
        </ul>
        <hr />

        {isAuthenticated && (
          <button
            className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleLogout}
            style={{
              padding: "10px",
              borderRadius: "50px",
              fontSize: "1rem",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 .5.5ZM7 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13A.5.5 0 0 1 7 1Z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-2-2a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-1.147 1.146a.5.5 0 0 0 .708.708l2-2Z"
              />
            </svg>
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
