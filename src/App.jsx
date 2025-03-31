// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Pages/Home";
// import Categories from "./Pages/Categories";
// import QuestionPapers from "./Pages/QuestionPapers";
// import Sidebar from "./Components/Sidebar";
// import Students from "./Pages/Students";
// import Subscription from "./Pages/Subscription"; // Assuming you have a separate component for Subscription
// import CategoriesComponent from "./Components/CategoriesComponent";
// import QuestionPaperManagement from "./Pages/QuestionPaperManagement";
// import EditExcelQuestionPaper from "./Components/EditExcelQuestionPaper";
// import SubcategoriesComponent from "./Components/SubcategoriesComponent";
// import CategoriesTable from "./Components/CategoriesTable";
// import BannerUpload from "./Pages/BannerUpload";
// import PlansAdmin from "./Pages/PlansAdmin";
// import PollManage from "./Pages/PollManage";
// import PostManage from "./Pages/PostManage";
// import FeedbackManage from "./Pages/FeedbackManage";
// import DonationManager from "./Pages/DonationManager";
// import AppUpdateManager from "./Components/AppUpdate/AppUpdateManager";
// import CouponManagement from "./Pages/CouponsPage";
// import CouponsPage from "./Pages/CouponsPage";
// import BlogForm from "./Pages/CMS/BlogForm";

// function App() {
//   return (
//     <div className="app">
//       <Router>
//         <Sidebar />
//         <div className="page-content">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/categories" element={<Categories />} />
//             <Route path="/subcategories" element={<CategoriesTable />} />

//             <Route
//               path="/question-papers"
//               element={<QuestionPaperManagement />}
//             />
//             <Route path="/students" element={<Students />} />
//             <Route path="/subscription" element={<PlansAdmin />} />
//             <Route
//               path="/edit-excel-question-paper"
//               element={<EditExcelQuestionPaper />}
//             />
//             <Route path="/banner" element={<BannerUpload />} />
//             <Route path="/poll" element={<PollManage />} />
//             <Route path="/post" element={<PostManage />} />
//             <Route path="/feedback" element={<FeedbackManage />} />
//             <Route path="/donations" element={<DonationManager />} />
//             <Route path="/app-updates" component={<AppUpdateManager />} />
//             <Route path="/coupon" element={<CouponsPage />} />

//             <Route path="/blog-manager" element={<BlogForm />} />

//             {/* <Route path="/blogs" element={<WebsiteBlogAdmin />} /> */}
//           </Routes>
//         </div>
//       </Router>
//     </div>
//   );
// }

// export default App;
// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import QuestionPapers from "./Pages/QuestionPapers";
import Sidebar from "./Components/Sidebar";
import Students from "./Pages/Students";
import Subscription from "./Pages/Subscription";
import CategoriesComponent from "./Components/CategoriesComponent";
import QuestionPaperManagement from "./Pages/QuestionPaperManagement";
import EditExcelQuestionPaper from "./Components/EditExcelQuestionPaper";
import SubcategoriesComponent from "./Components/SubcategoriesComponent";
import CategoriesTable from "./Components/CategoriesTable";
import BannerUpload from "./Pages/BannerUpload";
import PlansAdmin from "./Pages/PlansAdmin";
import PollManage from "./Pages/PollManage";
import PostManage from "./Pages/PostManage";
import FeedbackManage from "./Pages/FeedbackManage";
import DonationManager from "./Pages/DonationManager";
import AppUpdateManager from "./Components/AppUpdate/AppUpdateManager";
import CouponManagement from "./Pages/CouponsPage";
import CouponsPage from "./Pages/CouponsPage";
import BlogForm from "./Pages/CMS/BlogForm";
import Login from "./Pages/Login";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div className="app">
      <Router>
        <Sidebar />
        <div className="page-content">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/unauthorized"
              element={<h1>Unauthorized Access</h1>}
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <Categories />
                </PrivateRoute>
              }
            />
            <Route
              path="/question-papers"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <QuestionPaperManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/students"
              element={
                <PrivateRoute allowedRoles={["admin", "developer"]}>
                  <Students />
                </PrivateRoute>
              }
            />
            <Route
              path="/subscription"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <PlansAdmin />
                </PrivateRoute>
              }
            />
            <Route
              path="/categories-component"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <CategoriesComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/subcategories-component"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <SubcategoriesComponent />
                </PrivateRoute>
              }
            />
            <Route
              path="/subcategories"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <CategoriesTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-excel-question-paper"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <EditExcelQuestionPaper />
                </PrivateRoute>
              }
            />
            <Route
              path="/banner"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <BannerUpload />
                </PrivateRoute>
              }
            />
            <Route
              path="/poll"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <PollManage />
                </PrivateRoute>
              }
            />
            <Route
              path="/post"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <PostManage />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <FeedbackManage />
                </PrivateRoute>
              }
            />
            <Route
              path="/donations"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <DonationManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/app-updates"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AppUpdateManager />
                </PrivateRoute>
              }
            />
            <Route
              path="/coupon"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <CouponsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/coupon-management"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <CouponManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/blog-manager"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <BlogForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
