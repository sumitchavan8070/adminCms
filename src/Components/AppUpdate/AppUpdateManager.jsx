// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUpdates,
//   createUpdate,
//   updateUpdate,
//   deleteUpdate,
// } from "../../Slice/appUpdateSlice";
// import "../../CSS/AppUpdateManager.css"; // Import the CSS for styling

// const AppUpdateManager = () => {
//   const dispatch = useDispatch();
//   const updates = useSelector((state) => state.appUpdate.updates);
//   const status = useSelector((state) => state.appUpdate.status);
//   const error = useSelector((state) => state.appUpdate.error);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentUpdate, setCurrentUpdate] = useState(null);
//   const [formData, setFormData] = useState({
//     appName: "",
//     buildNo: "",
//     iosBuildNo: "",
//     version: "",
//     softUpdate: 0,
//     forceUpdate: 1,
//     playIcon: "",
//     downloadUrl: "",
//   });

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchUpdates());
//     }
//   }, [status, dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleCreateOrUpdate = (e) => {
//     e.preventDefault();
//     if (currentUpdate) {
//       dispatch(updateUpdate({ id: currentUpdate._id, update: formData }));
//     } else {
//       dispatch(createUpdate(formData));
//     }
//     setIsModalOpen(false);
//     setCurrentUpdate(null);
//     setFormData({
//       appName: "",
//       buildNo: "",
//       iosBuildNo: "",
//       version: "",
//       softUpdate: 0,
//       forceUpdate: 1,
//       playIcon: "",
//       downloadUrl: "",
//     });
//   };

//   const handleEdit = (update) => {
//     setFormData({
//       appName: update.appName,
//       buildNo: update.buildNo,
//       iosBuildNo: update.iosBuildNo,
//       version: update.version,
//       softUpdate: update.softUpdate,
//       forceUpdate: update.forceUpdate,
//       playIcon: update.playIcon,
//       downloadUrl: update.downloadUrl,
//     });
//     setCurrentUpdate(update);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteUpdate(id));
//   };

//   let content;
//   if (status === "loading") {
//     content = <div>Loading...</div>;
//   } else if (status === "succeeded") {
//     content = (
//       <table className="update-table">
//         <thead>
//           <tr>
//             <th>App Name</th>
//             <th>Build No</th>
//             <th>iOS Build No</th>
//             <th>Version</th>
//             <th>Soft Update</th>
//             <th>Force Update</th>
//             <th>Play Icon</th>
//             <th>Download URL</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {updates.length === 0 ? (
//             <tr>
//               <td colSpan="9" className="no-data">
//                 No app updates found.
//                 <button onClick={() => setIsModalOpen(true)}>
//                   Add New Update
//                 </button>
//               </td>
//             </tr>
//           ) : (
//             updates.map((update) => (
//               <tr key={update._id}>
//                 <td>{update.appName}</td>
//                 <td>{update.buildNo}</td>
//                 <td>{update.iosBuildNo}</td>
//                 <td>{update.version}</td>
//                 <td>{update.softUpdate}</td>
//                 <td>{update.forceUpdate}</td>
//                 <td>{update.playIcon}</td>
//                 <td>{update.downloadUrl}</td>
//                 <td>
//                   <button onClick={() => handleEdit(update)}>Edit</button>
//                   <button onClick={() => handleDelete(update._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     );
//   } else if (status === "failed") {
//     content = <div>{error}</div>;
//   }

//   return (
//     <div className="app-update-manager">
//       <h2>App Update Manager</h2>
//       {content}
//       <button onClick={() => setIsModalOpen(true)}>Add New Update</button>
//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>{currentUpdate ? "Edit App Update" : "Add New App Update"}</h2>
//             <form onSubmit={handleCreateOrUpdate}>
//               <label>
//                 App Name:
//                 <input
//                   type="text"
//                   name="appName"
//                   value={formData.appName}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <label>
//                 Build Number:
//                 <input
//                   type="number"
//                   name="buildNo"
//                   value={formData.buildNo}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <label>
//                 iOS Build Number:
//                 <input
//                   type="number"
//                   name="iosBuildNo"
//                   value={formData.iosBuildNo}
//                   onChange={handleChange}
//                 />
//               </label>
//               <label>
//                 Version:
//                 <input
//                   type="text"
//                   name="version"
//                   value={formData.version}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <label>
//                 Soft Update:
//                 <input
//                   type="number"
//                   name="softUpdate"
//                   value={formData.softUpdate}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <label>
//                 Force Update:
//                 <input
//                   type="number"
//                   name="forceUpdate"
//                   value={formData.forceUpdate}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <label>
//                 Play Icon URL:
//                 <input
//                   type="text"
//                   name="playIcon"
//                   value={formData.playIcon}
//                   onChange={handleChange}
//                 />
//               </label>
//               <label>
//                 Download URL:
//                 <input
//                   type="text"
//                   name="downloadUrl"
//                   value={formData.downloadUrl}
//                   onChange={handleChange}
//                   required
//                 />
//               </label>
//               <button type="submit">Save</button>
//               <button type="button" onClick={() => setIsModalOpen(false)}>
//                 Cancel
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppUpdateManager;

// components/AppUpdateManager/AppUpdateManager.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpdates,
  createUpdate,
  updateUpdate,
  deleteUpdate,
} from "../../Slice/appUpdateSlice";
import "../../CSS/AppUpdateManager.css";

const AppUpdateManager = () => {
  const dispatch = useDispatch();
  const updates = useSelector((state) => state.appUpdate.updates);
  const status = useSelector((state) => state.appUpdate.status);
  const error = useSelector((state) => state.appUpdate.error);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(null);
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

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUpdates());
    }
  }, [status, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if (currentUpdate) {
      dispatch(updateUpdate({ id: currentUpdate._id, update: formData }));
    } else {
      dispatch(createUpdate(formData));
    }
    setIsModalOpen(false);
    setCurrentUpdate(null);
    setFormData({
      appName: "",
      buildNo: "",
      iosBuildNo: "",
      version: "",
      softUpdate: 0,
      forceUpdate: 1,
      playIcon: "",
      downloadUrl: "",
    });
  };

  const handleEdit = (update) => {
    setFormData({
      appName: update.appName,
      buildNo: update.buildNo,
      iosBuildNo: update.iosBuildNo,
      version: update.version,
      softUpdate: update.softUpdate,
      forceUpdate: update.forceUpdate,
      playIcon: update.playIcon,
      downloadUrl: update.downloadUrl,
    });
    setCurrentUpdate(update);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteUpdate(id));
  };

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <table className="update-table">
        <thead>
          <tr>
            <th>App Name</th>
            <th>Build No</th>
            <th>iOS Build No</th>
            <th>Version</th>
            <th>Soft Update</th>
            <th>Force Update</th>
            <th>Play Icon</th>
            <th>Download URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {updates.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-data">
                No app updates found.
                <button onClick={() => setIsModalOpen(true)}>
                  Add New Update
                </button>
              </td>
            </tr>
          ) : (
            updates.map((update) => (
              <tr key={update._id}>
                <td>{update.appName}</td>
                <td>{update.buildNo}</td>
                <td>{update.iosBuildNo}</td>
                <td>{update.version}</td>
                <td>{update.softUpdate}</td>
                <td>{update.forceUpdate}</td>
                <td>{update.playIcon}</td>
                <td>{update.downloadUrl}</td>
                <td>
                  <button onClick={() => handleEdit(update)}>Edit</button>
                  <button onClick={() => handleDelete(update._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="app-update-manager">
      <h2>App Update Manager</h2>
      {content}
      <button onClick={() => setIsModalOpen(true)}>Add New Update</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{currentUpdate ? "Edit App Update" : "Add New App Update"}</h2>
            <form onSubmit={handleCreateOrUpdate}>
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
              {/* Other fields */}
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppUpdateManager;
