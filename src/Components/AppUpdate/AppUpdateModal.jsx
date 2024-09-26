// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

// const AppUpdateModal = ({ update, onSave, onClose }) => {
//   const [appName, setAppName] = useState(update?.appName || "");
//   const [buildNo, setBuildNo] = useState(update?.buildNo || "");
//   const [iosBuildNo, setIosBuildNo] = useState(update?.iosBuildNo || "");
//   const [version, setVersion] = useState(update?.version || "");
//   const [softUpdate, setSoftUpdate] = useState(update?.softUpdate || 0);
//   const [forceUpdate, setForceUpdate] = useState(update?.forceUpdate || 1);
//   const [playIcon, setPlayIcon] = useState(update?.playIcon || "");
//   const [downloadUrl, setDownloadUrl] = useState(update?.downloadUrl || "");

//   useEffect(() => {
//     if (update) {
//       setAppName(update.appName);
//       setBuildNo(update.buildNo);
//       setIosBuildNo(update.iosBuildNo);
//       setVersion(update.version);
//       setSoftUpdate(update.softUpdate);
//       setForceUpdate(update.forceUpdate);
//       setPlayIcon(update.playIcon);
//       setDownloadUrl(update.downloadUrl);
//     }
//   }, [update]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedData = {
//       appName,
//       buildNo,
//       iosBuildNo,
//       version,
//       softUpdate,
//       forceUpdate,
//       playIcon,
//       downloadUrl,
//     };
//     onSave(updatedData);
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <form onSubmit={handleSubmit}>
//           <h2>{update ? "Edit Update" : "Create Update"}</h2>
//           <label>
//             App Name:
//             <input
//               type="text"
//               value={appName}
//               onChange={(e) => setAppName(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Build Number:
//             <input
//               type="number"
//               value={buildNo}
//               onChange={(e) => setBuildNo(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             iOS Build Number:
//             <input
//               type="number"
//               value={iosBuildNo || ""}
//               onChange={(e) => setIosBuildNo(e.target.value)}
//             />
//           </label>
//           <label>
//             Version:
//             <input
//               type="text"
//               value={version}
//               onChange={(e) => setVersion(e.target.value)}
//               required
//             />
//           </label>
//           <label>
//             Soft Update:
//             <input
//               type="number"
//               value={softUpdate}
//               onChange={(e) => setSoftUpdate(e.target.value)}
//             />
//           </label>
//           <label>
//             Force Update:
//             <input
//               type="number"
//               value={forceUpdate}
//               onChange={(e) => setForceUpdate(e.target.value)}
//             />
//           </label>
//           <label>
//             Play Icon URL:
//             <input
//               type="text"
//               value={playIcon}
//               onChange={(e) => setPlayIcon(e.target.value)}
//             />
//           </label>
//           <label>
//             Download URL:
//             <input
//               type="text"
//               value={downloadUrl}
//               onChange={(e) => setDownloadUrl(e.target.value)}
//               required
//             />
//           </label>
//           <button type="submit">Save</button>
//           <button type="button" onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// AppUpdateModal.propTypes = {
//   update: PropTypes.object,
//   onSave: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default AppUpdateModal;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUpdate } from "../../Slice/appUpdateSlice";

const AppUpdateModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    appName: "",
    buildNo: "",
    iosBuildNo: "",
    version: "",
    softUpdate: 0,
    forceUpdate: 1,
    playIcon: "",
    downloadUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUpdate(formData))
      .unwrap() // Use unwrap to handle any errors
      .then(() => {
        onClose(); // Close modal after successful submission
      })
      .catch((error) => {
        console.error("Failed to create update:", error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New App Update</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <label>
            App Name:
            <input
              type="text"
              name="appName"
              value={formData.appName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Build Number:
            <input
              type="number"
              name="buildNo"
              value={formData.buildNo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            iOS Build Number:
            <input
              type="number"
              name="iosBuildNo"
              value={formData.iosBuildNo}
              onChange={handleChange}
            />
          </label>
          <label>
            Version:
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Soft Update:
            <input
              type="number"
              name="softUpdate"
              value={formData.softUpdate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Force Update:
            <input
              type="number"
              name="forceUpdate"
              value={formData.forceUpdate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Play Icon URL:
            <input
              type="text"
              name="playIcon"
              value={formData.playIcon}
              onChange={handleChange}
            />
          </label>
          <label>
            Download URL:
            <input
              type="text"
              name="downloadUrl"
              value={formData.downloadUrl}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppUpdateModal;
