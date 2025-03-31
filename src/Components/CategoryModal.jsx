// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { updateCategory, addCategory } from "../Slice/categoriesSlice";
// import "../CSS/CategoryModal.css";

// const CategoryModal = ({ show, onClose, category }) => {
//   const [catName, setCatName] = useState("");
//   const [catShortName, setCatShortName] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   const [pdfFiles, setPdfFiles] = useState([{ heading: "", source: "" }]);

//   const [categoryNumber, setCategoryNumber] = useState("");

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (category) {
//       setCategoryNumber(category.categoryNumber || ""); // Set categoryNumber
//       setCatName(category.catName);
//       setCatShortName(category.catShortName);
//       setDescription(category.description);
//       setImage(category.image);
//       setPdfFiles(category.pdfFiles || [{ heading: "", source: "" }]);
//     } else {
//       setCatName("");
//       setCatShortName("");
//       setDescription("");
//       setImage("");
//       setPdfFiles([{ heading: "", source: "" }]);
//       setCategoryNumber(""); // Reset categoryNumber
//     }
//   }, [category]);

//   const handlePdfChange = (index, field, value) => {
//     setPdfFiles((prevPdfFiles) => {
//       const updatedPdfFiles = prevPdfFiles.map((pdfFile, i) =>
//         i === index ? { ...pdfFile, [field]: value } : pdfFile
//       );
//       return updatedPdfFiles;
//     });
//   };

//   const handleAddPdfFile = () => {
//     setPdfFiles((prevPdfFiles) => [
//       ...prevPdfFiles,
//       { heading: "", source: "" },
//     ]);
//   };

//   const handleRemovePdfFile = (index) => {
//     setPdfFiles((prevPdfFiles) => prevPdfFiles.filter((_, i) => i !== index));
//   };

//   const handleCategoryNumberChange = (e) => {
//     const value = e.target.value;

//     // Check if the value is empty or a valid number, then update state
//     if (value === "" || !isNaN(Number(value))) {
//       setCategoryNumber(Number(value));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const parsedCategoryNumber = Number(categoryNumber);
//     if (isNaN(parsedCategoryNumber) || parsedCategoryNumber < 0) {
//       alert("Please enter a valid non-negative number for Category Number.");
//       return;
//     }
//     console.log("categoryNumber while submitting " + parsedCategoryNumber);

//     const categoryData = {
//       catName,
//       catShortName,
//       description,
//       image,
//       pdfFiles,
//       categoryNumber: parsedCategoryNumber, // Use the parsed number here
//     };

//     console.log("categoryData", JSON.stringify(categoryData));

//     if (category) {
//       dispatch(updateCategory({ ...category, ...categoryData }));
//     } else {
//       dispatch(addCategory(categoryData));
//     }
//     onClose();
//   };

//   if (!show) return null;

//   return (
//     <div className="modal" style={{ display: "block" }}>
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">
//               {category ? "Edit Category" : "Add Category"}
//             </h5>
//             <button type="button" className="close" onClick={onClose}>
//               <span>&times;</span>
//             </button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="modal-body">
//               {/* <div className="form-group">
//                 <label>Category Number</label>
//                 <input
//                   type="number"
//                   value={categoryNumber}
//                   onChange={(e) => setCategoryNumber(e.target.value)}
//                 />

//               </div> */}

//               <div className="form-group">
//                 <label>Category Number</label>
//                 <input
//                   type="number"
//                   value={categoryNumber}
//                   onChange={handleCategoryNumberChange}
//                   // min="0" // Optional: Prevent negative numbers directly in the input
//                   placeholder="If you will not select category number it assign automatically"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Category Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={catName}
//                   onChange={(e) => setCatName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Category Short Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={catShortName}
//                   onChange={(e) => setCatShortName(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   className="form-control"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 ></textarea>
//               </div>
//               <div className="form-group">
//                 <label>Image URL</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={image}
//                   onChange={(e) => setImage(e.target.value)}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>PDF Files</label>
//                 {pdfFiles.map((pdfFile, index) => (
//                   <div key={index} className="pdf-file-group">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Heading"
//                       value={pdfFile.heading}
//                       onChange={(e) =>
//                         handlePdfChange(index, "heading", e.target.value)
//                       }
//                     />
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Source"
//                       value={pdfFile.source}
//                       onChange={(e) =>
//                         handlePdfChange(index, "source", e.target.value)
//                       }
//                     />
//                     <button
//                       type="button"
//                       className="btn btn-danger"
//                       onClick={() => handleRemovePdfFile(index)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={handleAddPdfFile}
//                 >
//                   Add PDF File
//                 </button>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={onClose}
//               >
//                 Close
//               </button>
//               <button type="submit" className="btn btn-primary">
//                 {category ? "Save changes" : "Add Category"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryModal;
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCategory, addCategory } from "../Slice/categoriesSlice";
import "../CSS/CategoryModal.css";

const CategoryModal = ({ show, onClose, category }) => {
  const [catName, setCatName] = useState("");
  const [catShortName, setCatShortName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [pdfFiles, setPdfFiles] = useState([{ heading: "", source: "" }]);
  const [categoryNumber, setCategoryNumber] = useState("");
  const [landingPageSlug, setLandingPageSlug] = useState(""); // ✅ Manually entered slug

  const dispatch = useDispatch();

  useEffect(() => {
    if (category) {
      setCategoryNumber(category.categoryNumber || "");
      setCatName(category.catName);
      setCatShortName(category.catShortName);
      setDescription(category.description);
      setImage(category.image);
      setPdfFiles(category.pdfFiles || [{ heading: "", source: "" }]);
      setLandingPageSlug(category.landingPageSlug || ""); // ✅ Load existing slug if editing
    } else {
      setCatName("");
      setCatShortName("");
      setDescription("");
      setImage("");
      setPdfFiles([{ heading: "", source: "" }]);
      setCategoryNumber("");
      setLandingPageSlug(""); // ✅ Reset slug for new category
    }
  }, [category]);

  const handlePdfChange = (index, field, value) => {
    setPdfFiles((prevPdfFiles) => {
      const updatedPdfFiles = prevPdfFiles.map((pdfFile, i) =>
        i === index ? { ...pdfFile, [field]: value } : pdfFile
      );
      return updatedPdfFiles;
    });
  };

  const handleAddPdfFile = () => {
    setPdfFiles((prevPdfFiles) => [
      ...prevPdfFiles,
      { heading: "", source: "" },
    ]);
  };

  const handleRemovePdfFile = (index) => {
    setPdfFiles((prevPdfFiles) => prevPdfFiles.filter((_, i) => i !== index));
  };

  const handleCategoryNumberChange = (e) => {
    const value = e.target.value;
    if (value === "" || !isNaN(Number(value))) {
      setCategoryNumber(Number(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedCategoryNumber = Number(categoryNumber);
    if (isNaN(parsedCategoryNumber) || parsedCategoryNumber < 0) {
      alert("Please enter a valid non-negative number for Category Number.");
      return;
    }

    // if (!landingPageSlug.trim()) {
    //   alert("Landing Page Slug is required.");
    //   return;
    // }

    const categoryData = {
      catName,
      catShortName,
      description,
      image,
      pdfFiles,
      categoryNumber: parsedCategoryNumber,
      landingPageSlug, // ✅ Manually entered slug
    };

    console.log("categoryData", JSON.stringify(categoryData));

    if (category) {
      dispatch(updateCategory({ ...category, ...categoryData }));
    } else {
      dispatch(addCategory(categoryData));
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {category ? "Edit Category" : "Add Category"}
            </h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label>Category Number</label>
                <input
                  type="number"
                  value={categoryNumber}
                  onChange={handleCategoryNumberChange}
                  placeholder="If you do not select a category number, it assigns automatically"
                />
              </div>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category Short Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={catShortName}
                  onChange={(e) => setCatShortName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Landing Page Slug</label>
                <input
                  type="text"
                  className="form-control"
                  value={landingPageSlug}
                  onChange={(e) => setLandingPageSlug(e.target.value)}
                  placeholder="Enter a slug for the landing page"
                />
              </div>
              <div className="form-group">
                <label>PDF Files</label>
                {pdfFiles.map((pdfFile, index) => (
                  <div key={index} className="pdf-file-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Heading"
                      value={pdfFile.heading}
                      onChange={(e) =>
                        handlePdfChange(index, "heading", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Source"
                      value={pdfFile.source}
                      onChange={(e) =>
                        handlePdfChange(index, "source", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemovePdfFile(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddPdfFile}
                >
                  Add PDF File
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {category ? "Save changes" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
