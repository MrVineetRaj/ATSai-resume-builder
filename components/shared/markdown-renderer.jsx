import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown className="text-xs flex-col gap-8">
      {content || "Your content goes here"}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
