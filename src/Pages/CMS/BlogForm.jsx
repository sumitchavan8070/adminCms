// import React, { useState, useEffect } from "react";
// import "./BlogForm.css"; // Import the CSS file
// import axios from "axios"; // For API calls

// const BlogForm = () => {
//   // State management
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [blogs, setBlogs] = useState([]); // State to store all blogs
//   const [newCategory, setNewCategory] = useState({ name: "", slug: "" });
//   const [newTag, setNewTag] = useState("");
//   const [editingCategory, setEditingCategory] = useState(null); // Track category being edited
//   const [editingTag, setEditingTag] = useState(null); // Track tag being edited
//   const [editingBlog, setEditingBlog] = useState(null); // Track blog being edited
//   const [currentBlog, setCurrentBlog] = useState({
//     title: { en: "", mr: "" },
//     description: { en: "", mr: "" },
//     slug: "",
//     date: "",
//     category: "",
//     tags: [],
//     image: "",
//     author: "",
//     readingTime: "",
//     content: { en: "", mr: "" },
//   });

//   // Fetch categories, tags, and blogs on component mount
//   useEffect(() => {
//     fetchCategories();
//     fetchTags();
//     fetchBlogs();
//   }, []);

//   // Fetch all categories from the backend
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/blogs/categories");
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   // Fetch all tags from the backend
//   const fetchTags = async () => {
//     try {
//       const response = await axios.get("/blogs/tags");
//       setTags(response.data);
//     } catch (error) {
//       console.error("Error fetching tags:", error);
//     }
//   };

//   // Fetch all blogs from the backend
//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get("/blogs/blogs");
//       setBlogs(response.data);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   // Automatically generate slug when category name changes
//   const handleCategoryNameChange = (e) => {
//     const name = e.target.value;
//     const slug = name
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^a-z0-9-]/g, "");
//     setNewCategory({ name, slug });
//   };

//   // Add or update a category
//   const handleAddCategory = async () => {
//     if (newCategory.name && newCategory.slug) {
//       try {
//         if (editingCategory !== null) {
//           // Update existing category
//           await axios.put(`/blogs/categories/${editingCategory}`, newCategory);
//         } else {
//           // Add new category
//           await axios.post("/blogs/categories", newCategory);
//         }
//         setNewCategory({ name: "", slug: "" });
//         setEditingCategory(null);
//         fetchCategories(); // Refresh the category list
//       } catch (error) {
//         console.error("Error saving category:", error);
//       }
//     }
//   };

//   // Edit a category
//   const handleEditCategory = (category) => {
//     setNewCategory({ name: category.name, slug: category.slug });
//     setEditingCategory(category._id);
//   };

//   // Delete a category
//   const handleDeleteCategory = async (categoryId) => {
//     try {
//       await axios.delete(`/blogs/categories/${categoryId}`);
//       fetchCategories(); // Refresh the category list
//     } catch (error) {
//       console.error("Error deleting category:", error);
//     }
//   };

//   // Add or update a tag
//   const handleAddTag = async () => {
//     if (newTag.trim()) {
//       try {
//         if (editingTag !== null) {
//           // Update existing tag
//           await axios.put(`/blogs/tags/${editingTag}`, { name: newTag.trim() });
//         } else {
//           // Add new tag
//           await axios.post("/blogs/tags", { name: newTag.trim() });
//         }
//         setNewTag("");
//         setEditingTag(null);
//         fetchTags(); // Refresh the tag list
//       } catch (error) {
//         console.error("Error saving tag:", error);
//       }
//     }
//   };

//   // Edit a tag
//   const handleEditTag = (tag) => {
//     setNewTag(tag.name);
//     setEditingTag(tag._id);
//   };

//   // Delete a tag
//   const handleDeleteTag = async (tagId) => {
//     try {
//       await axios.delete(`/blogs/tags/${tagId}`);
//       fetchTags(); // Refresh the tag list
//     } catch (error) {
//       console.error("Error deleting tag:", error);
//     }
//   };

//   // Add a tag to the current blog
//   const handleAddTagToBlog = (tagId) => {
//     if (tagId && !currentBlog.tags.includes(tagId)) {
//       setCurrentBlog((prev) => ({
//         ...prev,
//         tags: [...prev.tags, tagId],
//       }));
//     }
//   };

//   // Remove a tag from the current blog
//   const handleRemoveBlogTag = (index) => {
//     setCurrentBlog((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((_, i) => i !== index),
//     }));
//   };

//   // Handle form submission to create or update a blog
//   const handleAddBlog = async () => {
//     try {
//       if (editingBlog !== null) {
//         // Update existing blog
//         await axios.put(`/blogs/blogs/${editingBlog}`, currentBlog);
//         alert("Blog updated successfully!");
//       } else {
//         // Create new blog
//         await axios.post("/blogs/blogs", currentBlog);
//         alert("Blog published successfully!");
//       }
//       resetBlogForm();
//       fetchBlogs(); // Refresh the blog list
//     } catch (error) {
//       console.error("Error publishing blog:", error);
//     }
//   };

//   // Reset the blog form
//   const resetBlogForm = () => {
//     setCurrentBlog({
//       title: { en: "", mr: "" },
//       description: { en: "", mr: "" },
//       slug: "",
//       date: "",
//       category: "",
//       tags: [],
//       image: "",
//       author: "",
//       readingTime: "",
//       content: { en: "", mr: "" },
//     });
//     setEditingBlog(null);
//   };

//   // Populate the form with blog data for editing
//   const handleEditBlog = (blog) => {
//     setCurrentBlog({
//       title: blog.title,
//       description: blog.description,
//       slug: blog.slug,
//       date: blog.date,
//       category: blog.category._id,
//       tags: blog.tags.map((tag) => tag._id),
//       image: blog.image,
//       author: blog.author,
//       readingTime: blog.readingTime,
//       content: blog.content,
//     });
//     setEditingBlog(blog._id);
//   };

//   // Delete a blog
//   const handleDeleteBlog = async (blogId) => {
//     try {
//       await axios.delete(`/blogs/blogs/${blogId}`);
//       fetchBlogs(); // Refresh the blog list
//       alert("Blog deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Blog Management System</h1>

//       {/* Category and Tag Sections */}
//       <div className="row">
//         {/* Category Section */}
//         <div className="section">
//           <h2>Manage Categories</h2>
//           <div className="form-group">
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="Category Name"
//                 value={newCategory.name}
//                 onChange={handleCategoryNameChange}
//               />
//               <input
//                 type="text"
//                 placeholder="Slug"
//                 value={newCategory.slug}
//                 readOnly
//               />
//             </div>
//             <button
//               type="button"
//               onClick={handleAddCategory}
//               disabled={!newCategory.name || !newCategory.slug}
//             >
//               {editingCategory !== null ? "Update Category" : "Add Category"}
//             </button>
//           </div>
//           <div className="category-list">
//             <h3>Existing Categories:</h3>
//             <ul>
//               {categories.map((cat) => (
//                 <li key={cat._id}>
//                   {cat.name} ({cat.slug})
//                   <button
//                     type="button"
//                     onClick={() => handleEditCategory(cat)}
//                     className="edit-btn"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleDeleteCategory(cat._id)}
//                     className="delete-btn"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Tag Section */}
//         <div className="section">
//           <h2>Manage Tags</h2>
//           <div className="form-group">
//             <div className="input-group">
//               <input
//                 type="text"
//                 placeholder="New Tag"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 disabled={!newTag.trim()}
//               >
//                 {editingTag !== null ? "Update Tag" : "Add Tag"}
//               </button>
//             </div>
//             <div className="tag-list">
//               <h3>Available Tags:</h3>
//               <div className="tag-container">
//                 {tags.map((tag) => (
//                   <span key={tag._id} className="tag">
//                     {tag.name}
//                     <button
//                       type="button"
//                       onClick={() => handleEditTag(tag)}
//                       className="edit-btn"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteTag(tag._id)}
//                       className="delete-btn"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Blog Form */}
//       <div className="section">
//         <h2>{editingBlog !== null ? "Edit Blog Post" : "Create Blog Post"}</h2>
//         <div className="form-group">
//           {/* Titles */}
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="English Title"
//               value={currentBlog.title.en}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   title: { ...prev.title, en: e.target.value },
//                 }))
//               }
//             />
//             <input
//               type="text"
//               placeholder="Marathi Title"
//               value={currentBlog.title.mr}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   title: { ...prev.title, mr: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Descriptions */}
//           <div className="input-group">
//             <textarea
//               placeholder="English Description"
//               value={currentBlog.description.en}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   description: { ...prev.description, en: e.target.value },
//                 }))
//               }
//             />
//             <textarea
//               placeholder="Marathi Description"
//               value={currentBlog.description.mr}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   description: { ...prev.description, mr: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Category Selection */}
//           <div className="input-group">
//             <select
//               value={currentBlog.category}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   category: e.target.value,
//                 }))
//               }
//               disabled={categories.length === 0}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat._id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Tag Selection */}
//           <div className="input-group">
//             <div className="tag-selector">
//               <select
//                 value=""
//                 onChange={(e) => handleAddTagToBlog(e.target.value)}
//                 disabled={tags.length === 0}
//               >
//                 <option value="">Select Tags</option>
//                 {tags.map((tag) => (
//                   <option key={tag._id} value={tag._id}>
//                     {tag.name}
//                   </option>
//                 ))}
//               </select>
//               <div className="selected-tags">
//                 {currentBlog.tags.map((tagId, index) => {
//                   const tag = tags.find((t) => t._id === tagId);
//                   return (
//                     <span key={index} className="tag">
//                       {tag?.name}
//                       <button
//                         type="button"
//                         onClick={() => handleRemoveBlogTag(index)}
//                         className="remove-tag"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Other Fields */}
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Slug"
//               value={currentBlog.slug}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({ ...prev, slug: e.target.value }))
//               }
//             />
//             <input
//               type="date"
//               value={currentBlog.date}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({ ...prev, date: e.target.value }))
//               }
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={currentBlog.image}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({ ...prev, image: e.target.value }))
//               }
//             />
//             <input
//               type="text"
//               placeholder="Author"
//               value={currentBlog.author}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({ ...prev, author: e.target.value }))
//               }
//             />
//             <input
//               type="text"
//               placeholder="Reading Time"
//               value={currentBlog.readingTime}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   readingTime: e.target.value,
//                 }))
//               }
//             />
//           </div>

//           {/* Content Editors */}
//           <div className="input-group">
//             <textarea
//               placeholder="English Content (HTML)"
//               value={currentBlog.content.en}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   content: { ...prev.content, en: e.target.value },
//                 }))
//               }
//             />
//             <textarea
//               placeholder="Marathi Content (HTML)"
//               value={currentBlog.content.mr}
//               onChange={(e) =>
//                 setCurrentBlog((prev) => ({
//                   ...prev,
//                   content: { ...prev.content, mr: e.target.value },
//                 }))
//               }
//             />
//           </div>

//           {/* Publish/Update Button */}
//           <button
//             type="button"
//             onClick={handleAddBlog}
//             disabled={!currentBlog.category || !currentBlog.title.en}
//             className="publish-btn"
//           >
//             {editingBlog !== null ? "Update Blog Post" : "Publish Blog Post"}
//           </button>
//         </div>
//       </div>

//       <div className="section">
//         <h2>Published Blogs</h2>
//         <div className="blog-list">
//           {blogs.map((blog) => (
//             <div key={blog._id} className="blog-card">
//               <img
//                 src={blog.image}
//                 alt={blog.title.en}
//                 className="blog-image"
//               />

//               <h3>{blog.title.en}</h3>

//               <p className="blog-slug">
//                 <strong>Slug:</strong> {blog.slug}
//               </p>

//               <p className="blog-category">
//                 <strong>Category:</strong>{" "}
//                 {blog.category?.name || "Uncategorized"}
//               </p>

//               <div className="blog-tags">
//                 <strong>Tags:</strong>
//                 {blog.tags.map((tag) => (
//                   <span key={tag._id} className="tag">
//                     {tag.name}
//                   </span>
//                 ))}
//               </div>

//               <p className="blog-description">{blog.description.en}</p>

//               <div className="blog-actions">
//                 <button
//                   type="button"
//                   onClick={() => handleEditBlog(blog)}
//                   className="edit-btn"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleDeleteBlog(blog._id)}
//                   className="delete-btn"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogForm;

import React, { useState, useEffect } from "react";
import "./BlogForm.css"; // Import the CSS file
import axios from "axios"; // For API calls

const BlogForm = () => {
  // State management
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [blogs, setBlogs] = useState([]); // State to store all blogs
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });
  const [newTag, setNewTag] = useState("");
  const [editingCategory, setEditingCategory] = useState(null); // Track category being edited
  const [editingTag, setEditingTag] = useState(null); // Track tag being edited
  const [editingBlog, setEditingBlog] = useState(null); // Track blog being edited
  const [currentBlog, setCurrentBlog] = useState({
    title: { en: "", mr: "" },
    description: { en: "", mr: "" },
    slug: "",
    date: "",
    category: "",
    tags: [],
    image: "",
    author: "",
    readingTime: "",
    content: { en: "", mr: "" },
  });

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all"); // Single tag filter

  // Fetch categories, tags, and blogs on component mount
  useEffect(() => {
    fetchCategories();
    fetchTags();
    fetchBlogs();
  }, []);

  // Fetch all categories from the backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/blogs/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch all tags from the backend
  const fetchTags = async () => {
    try {
      const response = await axios.get("/blogs/tags");
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  // Fetch all blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/blogs/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Automatically generate slug when category name changes
  const handleCategoryNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setNewCategory({ name, slug });
  };

  // Add or update a category
  const handleAddCategory = async () => {
    if (newCategory.name && newCategory.slug) {
      try {
        if (editingCategory !== null) {
          // Update existing category
          await axios.put(`/blogs/categories/${editingCategory}`, newCategory);
        } else {
          // Add new category
          await axios.post("/blogs/categories", newCategory);
        }
        setNewCategory({ name: "", slug: "" });
        setEditingCategory(null);
        fetchCategories(); // Refresh the category list
      } catch (error) {
        console.error("Error saving category:", error);
      }
    }
  };

  // Edit a category
  const handleEditCategory = (category) => {
    setNewCategory({ name: category.name, slug: category.slug });
    setEditingCategory(category._id);
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/blogs/categories/${categoryId}`);
      fetchCategories(); // Refresh the category list
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Add or update a tag
  const handleAddTag = async () => {
    if (newTag.trim()) {
      try {
        if (editingTag !== null) {
          // Update existing tag
          await axios.put(`/blogs/tags/${editingTag}`, { name: newTag.trim() });
        } else {
          // Add new tag
          await axios.post("/blogs/tags", { name: newTag.trim() });
        }
        setNewTag("");
        setEditingTag(null);
        fetchTags(); // Refresh the tag list
      } catch (error) {
        console.error("Error saving tag:", error);
      }
    }
  };

  // Edit a tag
  const handleEditTag = (tag) => {
    setNewTag(tag.name);
    setEditingTag(tag._id);
  };

  // Delete a tag
  const handleDeleteTag = async (tagId) => {
    try {
      await axios.delete(`/blogs/tags/${tagId}`);
      fetchTags(); // Refresh the tag list
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  // Add a tag to the current blog
  const handleAddTagToBlog = (tagId) => {
    if (tagId && !currentBlog.tags.includes(tagId)) {
      setCurrentBlog((prev) => ({
        ...prev,
        tags: [...prev.tags, tagId],
      }));
    }
  };

  // Remove a tag from the current blog
  const handleRemoveBlogTag = (index) => {
    setCurrentBlog((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission to create or update a blog
  const handleAddBlog = async () => {
    try {
      if (editingBlog !== null) {
        // Update existing blog
        await axios.put(`/blogs/blogs/${editingBlog}`, currentBlog);
        alert("Blog updated successfully!");
      } else {
        // Create new blog
        await axios.post("/blogs/blogs", currentBlog);
        alert("Blog published successfully!");
      }
      resetBlogForm();
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  // Reset the blog form
  const resetBlogForm = () => {
    setCurrentBlog({
      title: { en: "", mr: "" },
      description: { en: "", mr: "" },
      slug: "",
      date: "",
      category: "",
      tags: [],
      image: "",
      author: "",
      readingTime: "",
      content: { en: "", mr: "" },
    });
    setEditingBlog(null);
  };

  // Populate the form with blog data for editing
  const handleEditBlog = (blog) => {
    setCurrentBlog({
      title: blog.title,
      description: blog.description,
      slug: blog.slug,
      date: blog.date,
      category: blog.category._id,
      tags: blog.tags.map((tag) => tag._id),
      image: blog.image,
      author: blog.author,
      readingTime: blog.readingTime,
      content: blog.content,
    });
    setEditingBlog(blog._id);
  };

  // Delete a blog
  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`/blogs/blogs/${blogId}`);
      fetchBlogs(); // Refresh the blog list
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Filter blogs based on search query, category, and tag
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearchQuery =
      blog.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.en.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || blog.category?._id === selectedCategory;

    const matchesTag =
      selectedTag === "all" || // Show all blogs if "All Tags" is selected
      blog.tags.some((tag) => tag._id === selectedTag); // Show blogs with the selected tag

    return matchesSearchQuery && matchesCategory && matchesTag;
  });

  return (
    <div className="container">
      <h1>Blog Management System</h1>

      {/* Category and Tag Sections */}
      <div className="row">
        {/* Category Section */}
        <div className="section">
          <h2>Manage Categories</h2>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="Category Name"
                value={newCategory.name}
                onChange={handleCategoryNameChange}
              />
              <input
                type="text"
                placeholder="Slug"
                value={newCategory.slug}
                readOnly
              />
            </div>
            <button
              type="button"
              onClick={handleAddCategory}
              disabled={!newCategory.name || !newCategory.slug}
            >
              {editingCategory !== null ? "Update Category" : "Add Category"}
            </button>
          </div>
          <div className="category-list">
            <h3>Existing Categories:</h3>
            <ul>
              {categories.map((cat) => (
                <li key={cat._id}>
                  {cat.name} ({cat.slug})
                  <button
                    type="button"
                    onClick={() => handleEditCategory(cat)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tag Section */}
        <div className="section">
          <h2>Manage Tags</h2>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                placeholder="New Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                {editingTag !== null ? "Update Tag" : "Add Tag"}
              </button>
            </div>
            <div className="tag-list">
              <h3>Available Tags:</h3>
              <div className="tag-container">
                {tags.map((tag) => (
                  <span key={tag._id} className="tag">
                    {tag.name}
                    <button
                      type="button"
                      onClick={() => handleEditTag(tag)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTag(tag._id)}
                      className="delete-btn"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Form */}
      <div className="section">
        <h2>{editingBlog !== null ? "Edit Blog Post" : "Create Blog Post"}</h2>
        <div className="form-group">
          {/* Titles */}
          <div className="input-group">
            <input
              type="text"
              placeholder="English Title"
              value={currentBlog.title.en}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  title: { ...prev.title, en: e.target.value },
                }))
              }
            />
            <input
              type="text"
              placeholder="Marathi Title"
              value={currentBlog.title.mr}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  title: { ...prev.title, mr: e.target.value },
                }))
              }
            />
          </div>

          {/* Descriptions */}
          <div className="input-group">
            <textarea
              placeholder="English Description"
              value={currentBlog.description.en}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  description: { ...prev.description, en: e.target.value },
                }))
              }
            />
            <textarea
              placeholder="Marathi Description"
              value={currentBlog.description.mr}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  description: { ...prev.description, mr: e.target.value },
                }))
              }
            />
          </div>

          {/* Category Selection */}
          <div className="input-group">
            <select
              value={currentBlog.category}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              disabled={categories.length === 0}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Selection */}
          <div className="input-group">
            <div className="tag-selector">
              <select
                value=""
                onChange={(e) => handleAddTagToBlog(e.target.value)}
                disabled={tags.length === 0}
              >
                <option value="">Select Tags</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>
              <div className="selected-tags">
                {currentBlog.tags.map((tagId, index) => {
                  const tag = tags.find((t) => t._id === tagId);
                  return (
                    <span key={index} className="tag">
                      {tag?.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveBlogTag(index)}
                        className="remove-tag"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Other Fields */}
          <div className="input-group">
            <input
              type="text"
              placeholder="Slug"
              value={currentBlog.slug}
              onChange={(e) =>
                setCurrentBlog((prev) => ({ ...prev, slug: e.target.value }))
              }
            />
            <input
              type="date"
              value={currentBlog.date}
              onChange={(e) =>
                setCurrentBlog((prev) => ({ ...prev, date: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Image URL"
              value={currentBlog.image}
              onChange={(e) =>
                setCurrentBlog((prev) => ({ ...prev, image: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Author"
              value={currentBlog.author}
              onChange={(e) =>
                setCurrentBlog((prev) => ({ ...prev, author: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Reading Time"
              value={currentBlog.readingTime}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  readingTime: e.target.value,
                }))
              }
            />
          </div>

          {/* Content Editors */}
          {/* <div className="input-group">
            <textarea
              placeholder="English Content (HTML)"
              value={currentBlog.content.en}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  content: { ...prev.content, en: e.target.value },
                }))
              }
            />
            <textarea
              placeholder="Marathi Content (HTML)"
              value={currentBlog.content.mr}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  content: { ...prev.content, mr: e.target.value },
                }))
              }
            />
          </div> */}

          {/* Content Editors */}
          <div className="input-group">
            <textarea
              placeholder="English Content (HTML)"
              value={currentBlog.content.en}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  content: { ...prev.content, en: e.target.value },
                }))
              }
            />
            <textarea
              placeholder="Marathi Content (HTML)"
              value={currentBlog.content.mr}
              onChange={(e) =>
                setCurrentBlog((prev) => ({
                  ...prev,
                  content: { ...prev.content, mr: e.target.value },
                }))
              }
            />
          </div>

          {/* HTML Previews */}
          <div className="html-previews">
            <div className="preview-section">
              <h3>English Content Preview</h3>
              <div
                className="preview-box"
                dangerouslySetInnerHTML={{ __html: currentBlog.content.en }}
              />
            </div>
            <div className="preview-section">
              <h3>Marathi Content Preview</h3>
              <div
                className="preview-box"
                dangerouslySetInnerHTML={{ __html: currentBlog.content.mr }}
              />
            </div>
          </div>

          {/* Publish/Update Button */}
          <button
            type="button"
            onClick={handleAddBlog}
            disabled={!currentBlog.category || !currentBlog.title.en}
            className="publish-btn"
          >
            {editingBlog !== null ? "Update Blog Post" : "Publish Blog Post"}
          </button>
        </div>
      </div>

      {/* Published Blogs Section */}
      <div className="section">
        <h2>Published Blogs</h2>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label>Filter by Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tag Filter */}
        <div className="filter-group">
          <label>Filter by Tags:</label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="all">All Tags</option>
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {/* Blog List */}
        <div className="blog-list">
          {filteredBlogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title.en}
                className="blog-image"
              />

              {/* Blog Title */}
              <h3>{blog.title.en}</h3>

              {/* Blog Slug */}
              <p className="blog-slug">
                <strong>Slug:</strong> {blog.slug}
              </p>

              {/* Blog Category */}
              <p className="blog-category">
                <strong>Category:</strong>{" "}
                {blog.category?.name || "Uncategorized"}
              </p>

              {/* Blog Tags */}
              <div className="blog-tags">
                <strong>Tags:</strong>
                {blog.tags.map((tag) => (
                  <span key={tag._id} className="tag">
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Blog Description */}
              <p className="blog-description">{blog.description.en}</p>

              {/* Edit and Delete Buttons */}
              <div className="blog-actions">
                <button
                  type="button"
                  onClick={() => handleEditBlog(blog)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
