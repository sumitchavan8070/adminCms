import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

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
        </ul>
        <hr />
      </div>
    </>
  );
};

export default Sidebar;
