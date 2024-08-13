import React from "react";
import { useSelector } from "react-redux";
import "../CSS/YearChartComponent.css"; // Import the CSS file

const YearChartComponent = () => {
  const { categories } = useSelector((state) => state.categories);

  // Calculate totals
  const totalCategories = categories.length;
  const totalSubcategories = categories.reduce(
    (count, category) =>
      count + (category.subcategories ? category.subcategories.length : 0),
    0
  );
  const totalYears = categories.reduce(
    (count, category) =>
      count +
      (category.subcategories
        ? category.subcategories.reduce(
            (subCount, subCategory) =>
              subCount + (subCategory.years ? subCategory.years.length : 0),
            0
          )
        : 0),
    0
  );

  return (
    <div className="year-chart-component">
      <div className="card">
        <h3>Statistics</h3>
        <p>Total Categories: {totalCategories}</p>
        <p>Total Subcategories: {totalSubcategories}</p>
        <p>Total Years: {totalYears}</p>
      </div>
    </div>
  );
};

export default YearChartComponent;
