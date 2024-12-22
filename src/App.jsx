import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import QuestionPapers from "./Pages/QuestionPapers";
import Sidebar from "./Components/Sidebar";
import Students from "./Pages/Students";
import Subscription from "./Pages/Subscription"; // Assuming you have a separate component for Subscription
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

function App() {
  return (
    <div className="app">
      <Router>
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/subcategories" element={<CategoriesTable />} />

            <Route
              path="/question-papers"
              element={<QuestionPaperManagement />}
            />
            <Route path="/students" element={<Students />} />
            <Route path="/subscription" element={<PlansAdmin />} />
            <Route
              path="/edit-excel-question-paper"
              element={<EditExcelQuestionPaper />}
            />
            <Route path="/banner" element={<BannerUpload />} />
            <Route path="/poll" element={<PollManage />} />
            <Route path="/post" element={<PostManage />} />
            <Route path="/feedback" element={<FeedbackManage />} />
            <Route path="/donations" element={<DonationManager />} />
            <Route path="/app-updates" component={<AppUpdateManager />} />
            <Route path="/coupon" element={<CouponsPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
