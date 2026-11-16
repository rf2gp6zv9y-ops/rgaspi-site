"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = {
  content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="max-w-none dark:prose-invert">
      <style jsx global>{`
        .markdown-content h1 {
          font-family: var(--font-pt-serif);
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .markdown-content h2 {
          font-family: var(--font-pt-serif);
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .markdown-content h3 {
          font-family: var(--font-pt-serif);
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }
        .markdown-content p {
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .markdown-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .markdown-content li {
          margin-bottom: 0.25rem;
        }
        .markdown-content strong {
          font-weight: 700;
        }
        .markdown-content a {
          color: oklch(0.45 0.02 264.63);
          text-decoration: none;
        }
        .markdown-content a:hover {
          text-decoration: underline;
        }
        .markdown-content blockquote {
          border-left: 4px solid oklch(0.45 0.02 264.63);
          font-family: var(--font-pt-serif);
          font-style: italic;
          padding-left: 1rem;
        }
      `}</style>
      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
