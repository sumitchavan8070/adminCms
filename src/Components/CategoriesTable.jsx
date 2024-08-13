import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubcategory,
  addYear,
  createExamEntry,
  deleteSubcategory,
  deleteYear,
  editSubcategory,
  editYear,
  fetchCategoriesWithSubcategoriesAndYears,
} from "../Slice/categoriesSlice";
import CreateQuestionPaperForm from "./CreateQuestionPaperForm";
import "../CSS/CategoriesTable.css";
import CategoryForm from "./CategoryForm";
import EditCatYearForm from "./EditCatYearForm";
import YearChartComponent from "./YearChartComponent";
import QuestionPapersTable from "./home/QuestionPapersTable";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector(
    (state) => state.categories
  );

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditShowForm] = useState(false);
  const [isEditingSubCat, setIsEditingSubCat] = useState(false);
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [isAddingYear, setIsAddingYear] = useState(false);
  const [isAddingSubCat, setIsAddingSubCat] = useState(false);

  const [editSubCatFormProps, setEditSubCatFormProps] = useState({});
  const [addSubCatFormProps, setAddSubCatFormProps] = useState({});

  const [editYearFormProps, setEditYearFormProps] = useState({});
  const [addYearFormProps, setAddYearFormProps] = useState({});

  useEffect(() => {
    dispatch(fetchCategoriesWithSubcategoriesAndYears());
  }, [dispatch]);

  const handleAddCategoryEntry = () => {
    setShowForm(true);
  };

  const handleEditSubCategory = (category, subCategory) => {
    setIsEditingYear(false);
    setIsEditingSubCat(true);
    setEditSubCatFormProps({ category, subCategory });
    setEditShowForm(true);
  };

  const handleAddSubCategory = (category) => {
    setIsAddingYear(false);
    setIsAddingSubCat(true);
    setAddSubCatFormProps({ category });
    setEditShowForm(true);
  };

  const handleEditYear = (category, subCategory, year) => {
    setIsEditingSubCat(false);
    setIsEditingYear(true);
    setEditYearFormProps({ category, subCategory, year });
    setEditShowForm(true);
  };

  const handleAddYear = (category, subCategory) => {
    setIsAddingSubCat(false);
    setIsAddingYear(true);
    console.log("Sending Values " + category, subCategory);
    setAddYearFormProps({ category, subCategory });
    setEditShowForm(true);
  };

  const handleAddCategoryEntryProceed = (categoryId, subCatName, year) => {
    dispatch(createExamEntry({ categoryId, subCatName, year }));
    setShowForm(false);
  };

  const handleEditCatYearFormProceed = (
    categoryId,
    subCatName,
    subCategoryId,
    year,
    selectedYearId
  ) => {
    if (isEditingSubCat) {
      dispatch(editSubcategory({ categoryId, subCatName, subCategoryId }));
      setEditShowForm(false);
    } else if (isEditingYear) {
      const yearId = selectedYearId;
      const QPYear = year;
      dispatch(editYear({ yearId, QPYear }));
      setEditShowForm(false);
    } else if (isAddingSubCat) {
      dispatch(addSubcategory({ categoryId, subCatName }));
      setEditShowForm(false);
    } else if (isAddingYear) {
      // console.log(
      //   "Yes , we can do it ",
      //   categoryId,
      //   subCatName,
      //   subCategoryId,
      //   year,
      //   selectedYearId
      // );

      let subcategoryId = subCategoryId;
      let QPYear = year;
      dispatch(addYear({ categoryId, subcategoryId, QPYear }));
      setEditShowForm(false);
    }
  };

  const handleDeleteYear = (yearId) => {
    if (window.confirm("Are you sure you want to delete this year?")) {
      dispatch(deleteYear(yearId));
    }
  };

  const handleDeleteSubcategory = (categoryId, subCategoryId, yearId) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      dispatch(deleteSubcategory({ categoryId, subCategoryId, yearId }));
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="categories-component">
      {/* <YearChartComponent /> Add the new component here */}
      {showForm && (
        <CategoryForm
          onCancel={() => setShowForm(false)}
          onProceed={handleAddCategoryEntryProceed}
        />
      )}
      {showEditForm && (
        <EditCatYearForm
          onCancel={() => setEditShowForm(false)}
          onProceed={handleEditCatYearFormProceed}
          {...editSubCatFormProps}
          {...editYearFormProps}
          {...addSubCatFormProps}
          {...addYearFormProps}
        />
      )}
      <button onClick={handleAddCategoryEntry}>Add Category Entry</button>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              {category.subcategories && category.subcategories.length > 0 ? (
                category.subcategories.map((subCategory) =>
                  subCategory.years && subCategory.years.length > 0 ? (
                    subCategory.years.map((year) => (
                      <tr key={year._id}>
                        <td>{category.catName}</td>
                        <td>{subCategory.subCatName}</td>
                        <td>{year.QPYear}</td>
                        <td>
                          <button
                            onClick={() =>
                              handleEditSubCategory(category, subCategory)
                            }
                          >
                            Edit Subcategory
                          </button>
                          <button
                            onClick={() =>
                              handleEditYear(category, subCategory, year)
                            }
                          >
                            Edit Year
                          </button>
                          <button onClick={() => handleDeleteYear(year._id)}>
                            Delete Year
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteSubcategory(
                                category._id,
                                subCategory._id,
                                year._id
                              )
                            }
                          >
                            Delete Subcategory
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={subCategory._id}>
                      <td>{category.catName}</td>
                      <td>
                        {subCategory.subCatName ? subCategory.subCatName : "--"}
                      </td>
                      <td>No years available</td>
                      <td>
                        {!subCategory.subCatName && (
                          <>
                            <button
                              onClick={() => handleAddSubCategory(category)}
                            >
                              Add Subcategory
                            </button>
                          </>
                        )}
                        <button
                          onClick={() =>
                            handleEditSubCategory(category, subCategory)
                          }
                        >
                          Edit Subcategory
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSubcategory(
                              category._id,
                              subCategory._id,
                              null
                            )
                          }
                        >
                          Delete Subcategory
                        </button>
                        <button
                          onClick={() => handleAddYear(category, subCategory)}
                        >
                          Add Year
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr key={category._id}>
                  <td>{category.catName}</td>
                  <td>No</td>
                  <td>No</td>
                  <td>
                    <button onClick={() => handleAddSubcategory(category._id)}>
                      Add Subcategory
                    </button>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
