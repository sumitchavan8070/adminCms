// // Updated PreviewPane.jsx
// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeRaw from "rehype-raw";

// const PreviewPane = ({ content }) => {
//   return (
//     <div
//       className="prose max-w-none p-4 border rounded-lg h-[600px] overflow-y-auto
//                    bg-white markdown-preview lg:prose-lg prose-headings:text-gray-800
//                    prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-ul:list-disc
//                    prose-ol:list-decimal prose-blockquote:border-l-4
//                    prose-blockquote:border-gray-300 prose-blockquote:pl-4
//                    prose-code:bg-gray-100 prose-code:p-1 prose-code:rounded"
//     >
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm]}
//         rehypePlugins={[rehypeRaw]}
//         components={{
//           img: ({ node, ...props }) => (
//             <img
//               {...props}
//               className="rounded-lg my-4"
//               alt={props.alt || "Blog image"}
//             />
//           ),
//           code: ({ node, inline, className, children, ...props }) => (
//             <code
//               className={`${className} bg-gray-100 p-1 rounded break-words`}
//               {...props}
//             >
//               {children}
//             </code>
//           ),
//         }}
//       >
//         {content || "*No content to preview*"}
//       </ReactMarkdown>
//     </div>
//   );
// };

// export default PreviewPane;

// PreviewPane.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const PreviewPane = ({ language, content, className }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-700">
          {language} Preview
        </h3>
      </div>
      <div className="prose max-w-none p-4 overflow-y-auto markdown-preview">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            img: ({ node, ...props }) => (
              <img
                {...props}
                className="rounded-lg my-4"
                alt={props.alt || "Blog image"}
              />
            ),
            code: ({ node, inline, className, children, ...props }) => (
              <code
                className={`${className} bg-gray-100 p-1 rounded break-words text-sm`}
                {...props}
              >
                {children}
              </code>
            ),
          }}
        >
          {content || "*No content to preview*"}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PreviewPane;
