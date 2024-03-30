/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h1: (props: any) => (
          <h1 className="font-semibold text-xl">{props.children}</h1>
        ),
        h2: (props: any) => (
          <h2 className="font-semibold text-lg">{props.children}</h2>
        ),
        h3: (props: any) => (
          <h3 className="font-semibold text-sm">{props.children}</h3>
        ),
        blockquote: (props: any) => (
          <blockquote className="my-2 mx-4">{props.children}</blockquote>
        ),
        a: (props: any) => (
          <a href={props.href} target="_blank" className=" text-cyan-400">
            {props.children}
          </a>
        ),
        ul: (props: any) => <ul className=" list-disc">{props.children}</ul>,
        ol: (props: any) => <ol className=" list-decimal">{props.children}</ol>,
        li: (props: any) => (
          <li
            // style={{
            //   listStyle: 'inherit'
            // }}
            className=" ml-4"
          >
            {props.children}
          </li>
        ),
        code({ inline, className, children, ...props }: any) {
          if (inline) {
            return (
              <code className="mx-1 px-1 py-px rounded bg-indigo-400">
                {children}
              </code>
            );
          }
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, "")}
              style={oneDark}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
