// // import React, { useState, useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   uploadBanner,
// //   fetchBanners,
// //   deleteBanner,
// //   editBanner,
// // } from "../Slice/bannerSlice";
// // import { useNavigate } from "react-router-dom";
// // import "../CSS/BannerUpload.css";

// // const BannerUpload = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const [coverImage, setCoverImage] = useState(null);
// //   const [previewUrl, setPreviewUrl] = useState(null);
// //   const [cornerLabelText, setCornerLabelText] = useState("");
// //   const [cornerLabelColor, setCornerLabelColor] = useState("");
// //   const [index, setIndex] = useState(""); // New state for index
// //   const [editingBanner, setEditingBanner] = useState(null); // To handle editing

// //   const banners = useSelector((state) => state.banners.banners);

// //   useEffect(() => {
// //     dispatch(fetchBanners());
// //   }, [dispatch]);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setCoverImage(file);
// //       const previewUrl = URL.createObjectURL(file);
// //       setPreviewUrl(previewUrl);
// //     }
// //   };

// //   const handleRemovePreview = () => {
// //     setCoverImage(null);
// //     setPreviewUrl(null);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (coverImage) {
// //       const bannerData = {
// //         coverImage,
// //         cornerLabelText,
// //         cornerLabelColor,
// //         index: parseInt(index, 10), // Convert index to integer
// //       };

// //       if (editingBanner) {
// //         await dispatch(
// //           editBanner({
// //             _id: editingBanner._id,
// //             ...bannerData,
// //           })
// //         );
// //       } else {
// //         await dispatch(uploadBanner(bannerData));
// //       }
// //       navigate("/banner");
// //     }
// //   };

// //   const handleEditBanner = async (banner) => {
// //     setEditingBanner(banner);
// //     setCoverImage(null);
// //     setPreviewUrl(banner.coverImageUri);
// //     setCornerLabelText(banner.cornerLabelText);
// //     setCornerLabelColor(banner.cornerLabelColor);
// //     setIndex(banner.index || ""); // Set the index field for editing
// //   };

// //   const handleDeleteBanner = async (id) => {
// //     await dispatch(deleteBanner(id));
// //   };

// //   return (
// //     <div className="banner-upload">
// //       <h2>{editingBanner ? "Edit Banner" : "Upload New Banner"}</h2>
// //       <form onSubmit={handleSubmit}>
// //         <div>
// //           <label htmlFor="coverImage">Choose Banner Image</label>
// //           <input
// //             type="file"
// //             id="coverImage"
// //             accept="image/*"
// //             onChange={handleImageChange}
// //           />
// //         </div>

// //         {previewUrl && (
// //           <div className="banner-preview">
// //             <h3>Preview:</h3>
// //             <img src={previewUrl} alt="Banner Preview" />
// //             <button
// //               type="button"
// //               className="remove-preview-btn"
// //               onClick={handleRemovePreview}
// //             >
// //               Remove Preview
// //             </button>
// //           </div>
// //         )}

// //         <div>
// //           <label htmlFor="cornerLabelText">Corner Label Text (Optional)</label>
// //           <input
// //             type="text"
// //             id="cornerLabelText"
// //             value={cornerLabelText}
// //             onChange={(e) => setCornerLabelText(e.target.value)}
// //           />
// //         </div>

// //         <div>
// //           <label htmlFor="cornerLabelColor">
// //             Corner Label Color (Optional)
// //           </label>
// //           <input
// //             type="text"
// //             id="cornerLabelColor"
// //             value={cornerLabelColor}
// //             onChange={(e) => setCornerLabelColor(e.target.value)}
// //             placeholder="#FFFFFF"
// //           />
// //         </div>

// //         <div>
// //           <label htmlFor="index">Index (Optional)</label>
// //           <input
// //             type="number"
// //             id="index"
// //             value={index}
// //             onChange={(e) => setIndex(e.target.value)}
// //             placeholder="Enter index number"
// //           />
// //         </div>

// //         <button type="submit" disabled={!coverImage}>
// //           {editingBanner ? "Update Banner" : "Upload Banner"}
// //         </button>
// //       </form>

// //       <div className="banner-list">
// //         <h3>Available Banners</h3>
// //         <ul>
// //           {banners.map((banner) => (
// //             <li key={banner._id}>
// //               <img src={banner.coverImageUri} alt="Banner" />
// //               <div>
// //                 <p>{banner.cornerLabelText}</p>
// //                 <p>{banner.cornerLabelColor}</p>
// //                 <p>Index: {banner.index}</p> {/* Display index */}
// //                 <button
// //                   className="edit-banner-btn"
// //                   onClick={() => handleEditBanner(banner)}
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   className="delete-banner-btn"
// //                   onClick={() => handleDeleteBanner(banner._id)}
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BannerUpload;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   uploadBanner,
//   fetchBanners,
//   deleteBanner,
//   editBanner,
// } from "../Slice/bannerSlice";
// import { useNavigate } from "react-router-dom";
// import "../CSS/BannerUpload.css";

// const BannerUpload = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [coverImage, setCoverImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [cornerLabelText, setCornerLabelText] = useState("");
//   const [cornerLabelColor, setCornerLabelColor] = useState("");
//   const [index, setIndex] = useState("");
//   const [editingBanner, setEditingBanner] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const banners = useSelector((state) => state.banners.banners);
//   const status = useSelector((state) => state.banners.status);

//   useEffect(() => {
//     dispatch(fetchBanners());
//   }, [dispatch]);

//   const handleImageChange = (e) => {
//     if (!editingBanner) {
//       const file = e.target.files[0];
//       if (file) {
//         setCoverImage(file);
//         const previewUrl = URL.createObjectURL(file);
//         setPreviewUrl(previewUrl);
//       }
//     }
//   };

//   const handleRemovePreview = () => {
//     setCoverImage(null);
//     setPreviewUrl(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting form...");
//     if (editingBanner) {
//       await handleEditBanner();
//     } else {
//       console.log("clicked");

//       await handleUploadBanner();
//     }
//   };

//   const handleUploadBanner = async () => {
//     if (!coverImage) return;

//     const bannerData = {
//       coverImage,
//       cornerLabelText,
//       cornerLabelColor,
//       index: parseInt(index, 10),
//     };

//     setLoading(true);
//     console.log("Uploading banner data:", bannerData);

//     try {
//       await dispatch(uploadBanner(bannerData));
//       navigate("/banner");
//     } catch (error) {
//       console.error("Failed to upload banner:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditBanner = async () => {
//     const bannerData = {
//       _id: editingBanner._id,
//       cornerLabelText,
//       cornerLabelColor,
//       index: parseInt(index, 10),
//     };

//     setLoading(true);
//     console.log("Editing banner data:", bannerData);

//     try {
//       await dispatch(editBanner(bannerData));
//       navigate("/banner");
//     } catch (error) {
//       console.error("Failed to update banner:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (banner) => {
//     setEditingBanner(banner);
//     setCoverImage(null); // Clear cover image since it should not be changed
//     setPreviewUrl(banner.coverImageUri);
//     setCornerLabelText(banner.cornerLabelText);
//     setCornerLabelColor(banner.cornerLabelColor);
//     setIndex(banner.index || "");
//   };

//   const handleDeleteBanner = async (id) => {
//     await dispatch(deleteBanner(id));
//   };

//   return (
//     <div className="banner-upload">
//       <h2>{editingBanner ? "Edit Banner" : "Upload New Banner"}</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="coverImage">Choose Banner Image</label>
//           <input
//             type="file"
//             id="coverImage"
//             accept="image/*"
//             onChange={handleImageChange}
//             disabled={!!editingBanner} // Disable if editing
//           />
//         </div>

//         {previewUrl && (
//           <div className="banner-preview">
//             <h3>Preview:</h3>
//             <img src={previewUrl} alt="Banner Preview" />
//             <button
//               type="button"
//               className="remove-preview-btn"
//               onClick={handleRemovePreview}
//               disabled={!!editingBanner} // Disable if editing
//             >
//               Remove Preview
//             </button>
//           </div>
//         )}

//         <div>
//           <label htmlFor="cornerLabelText">Corner Label Text (Optional)</label>
//           <input
//             type="text"
//             id="cornerLabelText"
//             value={cornerLabelText}
//             onChange={(e) => setCornerLabelText(e.target.value)}
//           />
//         </div>

//         <div>
//           <label htmlFor="cornerLabelColor">
//             Corner Label Color (Optional)
//           </label>
//           <input
//             type="text"
//             id="cornerLabelColor"
//             value={cornerLabelColor}
//             onChange={(e) => setCornerLabelColor(e.target.value)}
//             placeholder="#FFFFFF"
//           />
//         </div>

//         <div>
//           <label htmlFor="index">Index (Optional)</label>
//           <input
//             type="number"
//             id="index"
//             value={index}
//             onChange={(e) => setIndex(e.target.value)}
//             placeholder="Enter index number"
//           />
//         </div>

//         <button type="submit" disabled={!coverImage || loading}>
//           {editingBanner ? "Update Banner" : "Upload Banner"}
//         </button>

//         {loading && <div className="loader">Loading...</div>}
//       </form>

//       <div className="banner-list">
//         <h3>Available Banners</h3>
//         <ul>
//           {banners.map((banner) => (
//             <li key={banner._id}>
//               <img src={banner.coverImageUri} alt="Banner" />
//               <div>
//                 <p>{banner.cornerLabelText}</p>
//                 <p>{banner.cornerLabelColor}</p>
//                 <p>Index: {banner.index}</p>
//                 <button
//                   className="edit-banner-btn"
//                   onClick={() => handleEditClick(banner)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="delete-banner-btn"
//                   onClick={() => handleDeleteBanner(banner._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BannerUpload;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadBanner,
  fetchBanners,
  deleteBanner,
  editBanner,
} from "../Slice/bannerSlice";
import { useNavigate } from "react-router-dom";
import "../CSS/BannerUpload.css";

const BannerUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cornerLabelText, setCornerLabelText] = useState("");
  const [cornerLabelColor, setCornerLabelColor] = useState("");
  const [index, setIndex] = useState("");
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const banners = useSelector((state) => state.banners.banners);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleImageChange = (e) => {
    if (!editingBanner) {
      const file = e.target.files[0];
      if (file) {
        setCoverImage(file);
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
      }
    }
  };

  const handleRemovePreview = () => {
    setCoverImage(null);
    setPreviewUrl(null);
  };

  const handleUploadBanner = async () => {
    if (!coverImage) return;

    const bannerData = {
      coverImage,
      cornerLabelText,
      cornerLabelColor,
      index: parseInt(index, 10),
    };

    setLoading(true);
    console.log("Uploading banner data:", bannerData);

    try {
      await dispatch(uploadBanner(bannerData));
      navigate("/banner");
    } catch (error) {
      console.error("Failed to upload banner:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBanner = async () => {
    const bannerData = {
      _id: editingBanner._id,
      cornerLabelText,
      cornerLabelColor,
      index: parseInt(index, 10),
    };

    setLoading(true);
    console.log("Editing banner data:", bannerData);

    try {
      await dispatch(editBanner(bannerData));
      navigate("/banner");
    } catch (error) {
      console.error("Failed to update banner:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (banner) => {
    setEditingBanner(banner);
    setCoverImage(null); // Clear cover image since it should not be changed
    setPreviewUrl(banner.coverImageUri);
    setCornerLabelText(banner.cornerLabelText);
    setCornerLabelColor(banner.cornerLabelColor);
    setIndex(banner.index || "");
  };

  const handleDeleteBanner = async (id) => {
    await dispatch(deleteBanner(id));
  };

  return (
    <div className="banner-upload">
      <h2>{editingBanner ? "Edit Banner" : "Upload New Banner"}</h2>
      <form>
        <div>
          <label htmlFor="coverImage">Choose Banner Image</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageChange}
            disabled={!!editingBanner} // Disable if editing
          />
        </div>

        {previewUrl && (
          <div className="banner-preview">
            <h3>Preview:</h3>
            <img src={previewUrl} alt="Banner Preview" />
            <button
              type="button"
              className="remove-preview-btn"
              onClick={handleRemovePreview}
              disabled={!!editingBanner} // Disable if editing
            >
              Remove Preview
            </button>
          </div>
        )}

        <div>
          <label htmlFor="cornerLabelText">Corner Label Text (Optional)</label>
          <input
            type="text"
            id="cornerLabelText"
            value={cornerLabelText}
            onChange={(e) => setCornerLabelText(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cornerLabelColor">
            Corner Label Color (Optional)
          </label>
          <input
            type="text"
            id="cornerLabelColor"
            value={cornerLabelColor}
            onChange={(e) => setCornerLabelColor(e.target.value)}
            placeholder="#FFFFFF"
          />
        </div>

        <div>
          <label htmlFor="index">Index (Optional)</label>
          <input
            type="number"
            id="index"
            value={index}
            onChange={(e) => setIndex(e.target.value)}
            placeholder="Enter index number"
          />
        </div>

        <div>
          {!editingBanner ? (
            <button
              type="button"
              onClick={handleUploadBanner}
              disabled={!coverImage || loading}
            >
              Upload Banner
            </button>
          ) : (
            <button type="button" onClick={handleEditBanner} disabled={loading}>
              Update Banner
            </button>
          )}
        </div>

        {loading && <div className="loader">Loading...</div>}
      </form>

      <div className="banner-list">
        <h3>Available Banners</h3>
        <ul>
          {banners.map((banner) => (
            <li key={banner._id}>
              <img src={banner.coverImageUri} alt="Banner" />
              <div>
                <p>{banner.cornerLabelText}</p>
                <p>{banner.cornerLabelColor}</p>
                <p>Index: {banner.index}</p>
                <button
                  className="edit-banner-btn"
                  onClick={() => handleEditClick(banner)}
                >
                  Edit
                </button>
                <button
                  className="delete-banner-btn"
                  onClick={() => handleDeleteBanner(banner._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BannerUpload;
