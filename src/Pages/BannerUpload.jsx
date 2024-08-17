// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { uploadBanner } from "../Slice/bannerSlice";
// import { useNavigate } from "react-router-dom";

// const BannerUpload = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [coverImage, setCoverImage] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [cornerLabelText, setCornerLabelText] = useState("");
//   const [cornerLabelColor, setCornerLabelColor] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setCoverImage(file);
//       const previewUrl = URL.createObjectURL(file);
//       setPreviewUrl(previewUrl);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (coverImage) {
//       await dispatch(
//         uploadBanner({ coverImage, cornerLabelText, cornerLabelColor })
//       );
//       navigate("/banners");
//     }
//   };

//   return (
//     <div className="banner-upload">
//       <h2>Upload New Banner</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="coverImage">Choose Banner Image</label>
//           <input
//             type="file"
//             id="coverImage"
//             accept="image/*"
//             onChange={handleImageChange}
//           />
//         </div>

//         {previewUrl && (
//           <div>
//             <h3>Preview:</h3>
//             <img
//               src={previewUrl}
//               alt="Banner Preview"
//               style={{
//                 width: "100%",
//                 maxWidth: "1280px", // YouTube banner preferred width
//                 height: "auto",
//                 border: "1px solid #ccc",
//                 marginTop: "10px",
//               }}
//             />
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

//         <button type="submit" disabled={!coverImage}>
//           Upload Banner
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BannerUpload;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadBanner, fetchBanners, deleteBanner } from "../Slice/bannerSlice";
import { useNavigate } from "react-router-dom";
import "../CSS/BannerUpload.css";

const BannerUpload = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cornerLabelText, setCornerLabelText] = useState("");
  const [cornerLabelColor, setCornerLabelColor] = useState("");

  const banners = useSelector((state) => state.banners.banners);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const handleRemovePreview = () => {
    setCoverImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (coverImage) {
      await dispatch(
        uploadBanner({ coverImage, cornerLabelText, cornerLabelColor })
      );
      navigate("/banner");
    }
  };

  const handleDeleteBanner = async (id) => {
    await dispatch(deleteBanner(id));
  };

  return (
    <div className="banner-upload">
      <h2>Upload New Banner</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="coverImage">Choose Banner Image</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleImageChange}
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

        <button type="submit" disabled={!coverImage}>
          Upload Banner
        </button>
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
