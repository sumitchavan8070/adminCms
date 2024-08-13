import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Slice/categoriesSlice";
import { fetchQuestionPaperData } from "../../Slice/questionPaperSlice";
import { fetchSubCategories } from "../../Slice/subCategoriesSlice";
import "../../CSS/QuestionPapersTable.css"; // Import the CSS file

const QuestionPapersTableWithUnkownYear = () => {
  const [categoriesWithPapers, setCategoriesWithPapers] = useState({});

  const questionPapers = useSelector(
    (state) => state.questionPapers.questionPapers
  );
  const categories = useSelector((state) => state.categories.categories);
  const subCategories = useSelector(
    (state) => state.subCategories.subCategories
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    } else {
      // Initialize categories with empty papers
      const initialCategories = categories.reduce((acc, category) => {
        acc[category._id] = {
          catShortName: category.catShortName || "Unknown Category",
          papers: [],
        };
        return acc;
      }, {});

      setCategoriesWithPapers(initialCategories);

      // Fetch question papers for each category
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
    // Update categories with fetched question papers
    const updatedCategories = { ...categoriesWithPapers };

    questionPapers.forEach((paper) => {
      if (updatedCategories[paper.catID]) {
        // Avoid duplicate entries by checking if the entry already exists
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

  return (
    <div className="question-papers-table">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Year</th>
            <th>Total Questions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(categoriesWithPapers).map((catID) => {
            const category = categoriesWithPapers[catID];
            return category.papers.length ? (
              category.papers.map((paper, index) => (
                <tr key={`${catID}-${index}`}>
                  <td>{category.catShortName}</td>
                  <td>{paper.subCatName}</td>
                  <td>{paper.QPYear}</td>
                  <td>
                    {paper.questions.length > 0
                      ? `Available - Total Questions: ${paper.questions.length}`
                      : "Not Available"}
                  </td>
                </tr>
              ))
            ) : (
              <tr key={catID}>
                <td>{category.catShortName}</td>
                <td>--</td>
                <td>--</td>
                <td>Not Available</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionPapersTableWithUnkownYear;
