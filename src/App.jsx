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
            <Route path="/subscription" element={<QuestionPaperManagement />} />
            <Route
              path="/edit-excel-question-paper"
              element={<EditExcelQuestionPaper />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
