// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchPosts,
//   approvePost,
//   rejectPost,
//   deletePost,
//   undoApprovePost,
//   undoRejectPost,
// } from "../Slice/postsSlice";
// import ImageModal from "../Components/Modal/ImageModal"; // Import the ImageModal component
// import "../CSS/Post.css";

// const PostManage = () => {
//   const dispatch = useDispatch();
//   const { posts, loading, error } = useSelector((state) => state.posts);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null); // State for selected image
//   const postsPerPage = 10;

//   useEffect(() => {
//     dispatch(fetchPosts());
//   }, [dispatch]);

//   const handleApprove = (postId) => {
//     dispatch(approvePost(postId));
//   };

//   const handleReject = (postId) => {
//     dispatch(rejectPost(postId));
//   };

//   const handleDelete = (postId) => {
//     dispatch(deletePost(postId));
//   };

//   const handleUndoApprove = (postId) => {
//     dispatch(undoApprovePost(postId));
//   };

//   const handleUndoReject = (postId) => {
//     dispatch(undoRejectPost(postId));
//   };

//   const filterPosts = (posts) => {
//     let filteredPosts = [...posts];

//     if (searchQuery) {
//       filteredPosts = filteredPosts.filter((post) =>
//         post.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (statusFilter !== "all") {
//       filteredPosts = filteredPosts.filter((post) =>
//         statusFilter === "pending"
//           ? !post.approved && !post.rejected
//           : statusFilter === "approved"
//           ? post.approved
//           : statusFilter === "rejected"
//           ? post.rejected
//           : false
//       );
//     }

//     return filteredPosts.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//   };

//   const filteredPosts = filterPosts(posts);
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const openImageModal = (imageUrl) => {
//     setSelectedImage(imageUrl);
//   };

//   const closeImageModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div className="post-manage-container">
//       <h1 className="heading">Posts Page</h1>
//       {loading && <div className="loading">Loading...</div>}
//       {error && <div className="error-text">{error}</div>}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search posts by description"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <select
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           <option value="all">Show All Rows</option>
//           <option value="pending">Pending</option>
//           <option value="approved">Approved</option>
//           <option value="rejected">Rejected</option>
//         </select>
//       </div>
//       <table className="posts-table">
//         <thead>
//           <tr>
//             <th>Posted By</th>
//             <th>Time</th>
//             <th>Description</th>
//             <th>Image</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentPosts.map((post) => (
//             <tr key={post._id}>
//               <td>{post.postedBy}</td>
//               <td>{new Date(post.createdAt).toLocaleString()}</td>
//               <td>{post.description}</td>
//               <td>
//                 {post.imageUrl ? (
//                   <img
//                     src={`https://res.cloudinary.com/sdchavan/image/upload/${post.imageUrl}`}
//                     alt="Post"
//                     width="100"
//                     style={{ cursor: "pointer" }} // Indicate clickable image
//                     onClick={() =>
//                       openImageModal(
//                         `https://res.cloudinary.com/sdchavan/image/upload/${post.imageUrl}`
//                       )
//                     } // Open modal
//                   />
//                 ) : (
//                   "No Image"
//                 )}
//               </td>
//               <td
//                 className={`status ${
//                   post.approved
//                     ? "approved"
//                     : post.rejected
//                     ? "rejected"
//                     : "pending"
//                 }`}
//               >
//                 {post.approved
//                   ? "Approved"
//                   : post.rejected
//                   ? "Rejected"
//                   : "Pending"}
//               </td>
//               <td className="button-container-post">
//                 {!post.approved && !post.rejected && (
//                   <>
//                     <button
//                       className="approve-button"
//                       onClick={() => handleApprove(post._id)}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       className="reject-button"
//                       onClick={() => handleReject(post._id)}
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {post.approved && (
//                   <button
//                     className="undo-button"
//                     onClick={() => handleUndoApprove(post._id)}
//                   >
//                     Undo Approve
//                   </button>
//                 )}
//                 {post.rejected && (
//                   <button
//                     className="undo-button"
//                     onClick={() => handleUndoReject(post._id)}
//                   >
//                     Undo Reject
//                   </button>
//                 )}
//                 <button
//                   className="delete-button"
//                   onClick={() => handleDelete(post._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="pagination">
//         <button
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {[...Array(totalPages).keys()].map((pageNumber) => (
//           <button
//             key={pageNumber}
//             onClick={() => paginate(pageNumber + 1)}
//             className={currentPage === pageNumber + 1 ? "active" : ""}
//           >
//             {pageNumber + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => paginate(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {/* Image Modal */}
//       <ImageModal
//         isOpen={!!selectedImage}
//         onClose={closeImageModal}
//         imageUrl={selectedImage}
//       />
//     </div>
//   );
// };

// export default PostManage;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  approvePost,
  rejectPost,
  deletePost,
  undoApprovePost,
  undoRejectPost,
  updatePost, // Import the updatePost action
} from "../Slice/postsSlice";
import ImageModal from "../Components/Modal/ImageModal";
import "../CSS/Post.css";

const PostManage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const postsPerPage = 10;

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleApprove = (postId) => {
    dispatch(approvePost(postId));
  };

  const handleReject = (postId) => {
    dispatch(rejectPost(postId));
  };

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleUndoApprove = (postId) => {
    dispatch(undoApprovePost(postId));
  };

  const handleUndoReject = (postId) => {
    dispatch(undoRejectPost(postId));
  };

  const handleToggleSponsored = (post) => {
    dispatch(
      updatePost({
        ...post,
        isSponsored: !post.isSponsored,
      })
    );
  };

  const filterPosts = (posts) => {
    let filteredPosts = [...posts];

    if (searchQuery) {
      filteredPosts = filteredPosts.filter((post) =>
        post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filteredPosts = filteredPosts.filter((post) =>
        statusFilter === "pending"
          ? !post.approved && !post.rejected
          : statusFilter === "approved"
          ? post.approved
          : statusFilter === "rejected"
          ? post.rejected
          : false
      );
    }

    return filteredPosts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const filteredPosts = filterPosts(posts);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="post-manage-container">
      <h1 className="heading">Posts Page</h1>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-text">{error}</div>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search posts by description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Show All Rows</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <table className="posts-table">
        <thead>
          <tr>
            <th>Posted By</th>
            <th>Time</th>
            <th>Description</th>
            <th>Image</th>
            <th>Status</th>
            <th>Sponsored</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post._id}>
              <td>{post.postedBy}</td>
              <td>{new Date(post.createdAt).toLocaleString()}</td>
              <td>{post.description}</td>
              <td>
                {post.imageUrl ? (
                  <img
                    src={`https://res.cloudinary.com/sdchavan/image/upload/${post.imageUrl}`}
                    alt="Post"
                    width="100"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      openImageModal(
                        `https://res.cloudinary.com/sdchavan/image/upload/${post.imageUrl}`
                      )
                    }
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td
                className={`status ${
                  post.approved
                    ? "approved"
                    : post.rejected
                    ? "rejected"
                    : "pending"
                }`}
              >
                {post.approved
                  ? "Approved"
                  : post.rejected
                  ? "Rejected"
                  : "Pending"}
              </td>
              <td>
                <button
                  className={`sponsored-button ${
                    post.isSponsored ? "sponsored" : "not-sponsored"
                  }`}
                  onClick={() => handleToggleSponsored(post)}
                >
                  {post.isSponsored ? "Sponsored" : "Not Sponsored"}
                </button>
              </td>
              <td className="button-container-post">
                {!post.approved && !post.rejected && (
                  <>
                    <button
                      className="approve-button"
                      onClick={() => handleApprove(post._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleReject(post._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {post.approved && (
                  <button
                    className="undo-button"
                    onClick={() => handleUndoApprove(post._id)}
                  >
                    Undo Approve
                  </button>
                )}
                {post.rejected && (
                  <button
                    className="undo-button"
                    onClick={() => handleUndoReject(post._id)}
                  >
                    Undo Reject
                  </button>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(post._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? "active" : ""}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeImageModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default PostManage;
