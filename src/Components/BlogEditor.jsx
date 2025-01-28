// features/blogs/BlogEditorModal.jsx
import { useState } from "react";
import { FiX } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const BlogEditorModal = ({ blog, onClose }) => {
  const [activeLang, setActiveLang] = useState("en");
  const [formData, setFormData] = useState({
    title: blog?.title || { en: "", mr: "" },
    content: blog?.content || { en: "", mr: "" },
    slug: blog?.slug || "",
    category: blog?.category || "",
    image: blog?.image || "",
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {blog ? "Edit Blog Post" : "Create New Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto grid md:grid-cols-2 gap-6 p-6">
          {/* Editor Side */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveLang("en")}
                className={`px-4 py-2 rounded-lg ${
                  activeLang === "en" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveLang("mr")}
                className={`px-4 py-2 rounded-lg ${
                  activeLang === "mr" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                Marathi
              </button>
            </div>

            <input
              placeholder={`Title (${activeLang.toUpperCase()})`}
              value={formData.title[activeLang]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: { ...prev.title, [activeLang]: e.target.value },
                }))
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder={`Content (${activeLang.toUpperCase()})`}
              value={formData.content[activeLang]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  content: { ...prev.content, [activeLang]: e.target.value },
                }))
              }
              className="w-full p-2 border rounded-lg h-64 focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="education">Education</option>
              </select>
            </div>

            <input
              placeholder="Featured Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.value }))
              }
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preview Side */}
          <div className="border-l pl-6">
            <h3 className="text-lg font-medium mb-4">
              Preview ({activeLang.toUpperCase()})
            </h3>
            <div className="prose max-w-none">
              <ReactMarkdown>
                {formData.content[activeLang] || "*No content*"}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            {blog ? "Update Post" : "Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditorModal;
