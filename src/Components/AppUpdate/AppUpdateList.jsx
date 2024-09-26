import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdates } from "../../Slice/appUpdateSlice";
import AppUpdateItem from "./AppUpdateItem";
import AppUpdateModal from "./AppUpdateModal";

const AppUpdateList = () => {
  const dispatch = useDispatch();
  const updates = useSelector((state) => state.appUpdate.updates);
  const status = useSelector((state) => state.appUpdate.status);
  const error = useSelector((state) => state.appUpdate.error);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUpdates());
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    if (updates.length === 0) {
      content = (
        <div>
          <p>No app updates found.</p>
          <button onClick={() => setIsModalOpen(true)}>Add New Update</button>
        </div>
      );
    } else {
      content = updates.map((update) => (
        <AppUpdateItem key={update._id} update={update} />
      ));
    }
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>App Updates</h2>
      {content}
      {isModalOpen && <AppUpdateModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AppUpdateList;
