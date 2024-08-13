// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../../Slice/categoriesSlice";
// import { fetchQuestionPaperData } from "../../Slice/questionPaperSlice";
// import { fetchSubCategories } from "../../Slice/subCategoriesSlice";
// import "../../CSS/QuestionPapersTable.css"; // Import the CSS file

// const QuestionPapersTable = () => {
//   const [categoriesWithPapers, setCategoriesWithPapers] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({
//     key: "catShortName",
//     direction: "asc",
//   });
//   const [showAvailableOnly, setShowAvailableOnly] = useState(false);

//   const questionPapers = useSelector(
//     (state) => state.questionPapers.questionPapers
//   );
//   const categories = useSelector((state) => state.categories.categories);
//   const subCategories = useSelector(
//     (state) => state.subCategories.subCategories
//   );

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!categories.length) {
//       dispatch(fetchCategories());
//     } else {
//       const initialCategories = categories.reduce((acc, category) => {
//         acc[category._id] = {
//           catShortName: category.catShortName || "Unknown Category",
//           papers: [],
//         };
//         return acc;
//       }, {});

//       setCategoriesWithPapers(initialCategories);

//       categories.forEach((category) => {
//         if (category._id) {
//           dispatch(fetchQuestionPaperData(category._id));
//         }
//       });
//     }
//   }, [dispatch, categories]);

//   useEffect(() => {
//     if (!subCategories.length) {
//       dispatch(fetchSubCategories());
//     }
//   }, [dispatch, subCategories.length]);

//   useEffect(() => {
//     const updatedCategories = { ...categoriesWithPapers };

//     questionPapers.forEach((paper) => {
//       if (updatedCategories[paper.catID]) {
//         const existingPaperIndex = updatedCategories[
//           paper.catID
//         ].papers.findIndex(
//           (p) => p.subCatName === paper.subCatName && p.QPYear === paper.QPYear
//         );

//         if (existingPaperIndex === -1) {
//           updatedCategories[paper.catID].papers.push({
//             subCatName: paper.subCatName || "Unknown SubCategory",
//             QPYear: paper.QPYear || "Unknown Year",
//             questions: paper.questions || [],
//           });
//         }
//       }
//     });

//     setCategoriesWithPapers(updatedCategories);
//   }, [questionPapers]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value.toLowerCase());
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleFilter = () => {
//     setShowAvailableOnly((prev) => !prev);
//   };

//   const filteredCategories = Object.keys(categoriesWithPapers).filter(
//     (catID) => {
//       const category = categoriesWithPapers[catID];
//       return (
//         category.catShortName.toLowerCase().includes(searchQuery) ||
//         category.papers.some((paper) =>
//           paper.QPYear.toLowerCase().includes(searchQuery)
//         )
//       );
//     }
//   );

//   const sortedCategories = filteredCategories.sort((a, b) => {
//     const aValue = categoriesWithPapers[a][sortConfig.key];
//     const bValue = categoriesWithPapers[b][sortConfig.key];
//     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
//     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   return (
//     <div className="question-papers-table">
//       <div className="table-controls">
//         <input
//           type="text"
//           placeholder="Search by Category Name or Year"
//           onChange={handleSearch}
//           value={searchQuery}
//         />
//         <button onClick={() => handleSort("catShortName")}>
//           Sort by Category
//         </button>
//         <button onClick={() => handleSort("QPYear")}>Sort by Year</button>
//         <label>
//           <input
//             type="checkbox"
//             checked={showAvailableOnly}
//             onChange={handleFilter}
//           />
//           Show Available Only
//         </label>
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Category</th>
//             <th>SubCategory</th>
//             <th>Year</th>
//             <th>Total Questions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedCategories.flatMap((catID) => {
//             const category = categoriesWithPapers[catID];
//             return category.papers
//               .filter(
//                 (paper) => !showAvailableOnly || paper.questions.length > 0
//               )
//               .map((paper, index) => (
//                 <tr key={`${catID}-${index}`}>
//                   <td>{category.catShortName}</td>
//                   <td>{paper.subCatName}</td>
//                   <td>{paper.QPYear}</td>
//                   <td>
//                     {paper.questions.length > 0
//                       ? `Available - Total Questions: ${paper.questions.length}`
//                       : "Not Available"}
//                   </td>
//                 </tr>
//               ));
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuestionPapersTable;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Slice/categoriesSlice";
import { fetchQuestionPaperData } from "../../Slice/questionPaperSlice";
import { fetchSubCategories } from "../../Slice/subCategoriesSlice";
import "../../CSS/QuestionPapersTable.css"; // Import the CSS file

const QuestionPapersTable = () => {
  const [categoriesWithPapers, setCategoriesWithPapers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "catShortName",
    direction: "asc",
  });
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const questionPapers = useSelector(
    (state) => state.questionPapers.questionPapers
  );
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    } else {
      const initialCategories = categories.reduce((acc, category) => {
        acc[category._id] = {
          catShortName: category.catShortName || "Unknown Category",
          papers: [],
        };
        return acc;
      }, {});

      setCategoriesWithPapers(initialCategories);

      categories.forEach((category) => {
        if (category._id) {
          dispatch(fetchQuestionPaperData(category._id));
        }
      });
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (!subCategories.length) {
      dispatch(fetchSubCategories());
    }
  }, [dispatch, subCategories.length]);

  useEffect(() => {
    const updatedCategories = { ...categoriesWithPapers };

    questionPapers.forEach((paper) => {
      if (updatedCategories[paper.catID]) {
        const existingPaperIndex = updatedCategories[
          paper.catID
        ].papers.findIndex(
          (p) => p.subCatName === paper.subCatName && p.QPYear === paper.QPYear
        );

        if (existingPaperIndex === -1) {
          updatedCategories[paper.catID].papers.push({
            subCatName: paper.subCatName || "Unknown SubCategory",
            QPYear: paper.QPYear || "Unknown Year",
            questions: paper.questions || [],
          });
        }
      }
    });

    setCategoriesWithPapers(updatedCategories);
  }, [questionPapers]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = () => {
    setShowAvailableOnly((prev) => !prev);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const getStatus = (questionsLength) => {
    if (questionsLength > 100) {
      return "Danger";
    } else if (questionsLength === 100) {
      return "Completed";
    } else {
      return "Pending";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Danger":
        return "red";
      case "Completed":
        return "green";
      case "Pending":
        return "orange";
      default:
        return "black";
    }
  };

  const filteredCategories = Object.keys(categoriesWithPapers).filter(
    (catID) => {
      const category = categoriesWithPapers[catID];
      return (
        category.catShortName.toLowerCase().includes(searchQuery) ||
        category.papers.some((paper) =>
          paper.QPYear.toLowerCase().includes(searchQuery)
        )
      );
    }
  );

  const sortedCategories = filteredCategories.sort((a, b) => {
    const aValue = categoriesWithPapers[a][sortConfig.key];
    const bValue = categoriesWithPapers[b][sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="question-papers-table">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search by Category Name or Year"
          onChange={handleSearch}
          value={searchQuery}
        />
        <button onClick={() => handleSort("catShortName")}>
          Sort by Category
        </button>
        <button onClick={() => handleSort("QPYear")}>Sort by Year</button>
        <label>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={handleFilter}
          />
          Show Available Only
        </label>
        <label>
          Status Filter:
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="all">All</option>
            <option value="Completed">Complete</option>
            <option value="Pending">Pending</option>
            <option value="Danger">Danger</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Year</th>
            <th>Total Questions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.flatMap((catID) => {
            const category = categoriesWithPapers[catID];
            return category.papers
              .filter(
                (paper) =>
                  (!showAvailableOnly || paper.questions.length > 0) &&
                  (statusFilter === "all" ||
                    getStatus(paper.questions.length) === statusFilter)
              )
              .map((paper, index) => {
                const status = getStatus(paper.questions.length);
                return (
                  <tr key={`${catID}-${index}`}>
                    <td>{category.catShortName}</td>
                    <td>{paper.subCatName}</td>
                    <td>{paper.QPYear}</td>
                    <td>
                      {paper.questions.length > 0
                        ? `Available - Total Questions: ${paper.questions.length}`
                        : "Not Available"}
                    </td>
                    <td style={{ color: getStatusColor(status) }}>{status}</td>
                  </tr>
                );
              });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionPapersTable;
