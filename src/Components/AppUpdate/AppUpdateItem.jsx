import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUpdate, deleteUpdate } from "../../Slice/appUpdateSlice";
import AppUpdateModal from "./AppUpdateModal";

const AppUpdateItem = ({ update }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUpdate, setEditUpdate] = useState(update);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteUpdate(update._id));
  };

  const handleSave = (updatedData) => {
    dispatch(updateUpdate({ id: update._id, update: updatedData }));
    setIsModalOpen(false);
  };

  return (
    <div className="update-item">
      <h3>{update.appName}</h3>
      <p>Version: {update.version}</p>
      <p>Build No: {update.buildNo}</p>
      <p>iOS Build No: {update.iosBuildNo || "N/A"}</p>
      <p>
        Download URL:{" "}
        <a href={update.downloadUrl} target="_blank" rel="noopener noreferrer">
          {update.downloadUrl}
        </a>
      </p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {isModalOpen && (
        <AppUpdateModal
          update={editUpdate}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AppUpdateItem;
