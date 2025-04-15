import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "~/Assets/Css/Renderer.css";

interface CustomMarkdownProps {
  text?: string;
  char?: string;
  user?: string;
  ai_message?: string;
}

export default function CustomMarkdown({
  text = "",
  char,
  user,
  ai_message = "",
}: CustomMarkdownProps) {
  const [replacedText, setReplacedText] = useState<string>(text);
  const [userColor, setUserColor] = useState<string | undefined>("");

  useEffect(() => {
    const savedUserColor = localStorage.getItem("userColor");
    if (savedUserColor) setUserColor(savedUserColor);

    const replacePlaceholders = (content: string) =>
      content
        .replace(/{{char}}/g, char || "Anon")
        .replace(/{{user}}/g, user || "User")
        .replace(/{{ai_message}}/g, ai_message);

    setReplacedText(replacePlaceholders(text));
  }, [text, char, user, ai_message]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        em: ({ children }) => <span className="italic-text">{children}</span>,
        strong: ({ children }) => {
          const content = React.Children.toArray(children).join("");
          return <strong style={char ? { color: char } : {}}>{content}</strong>;
        },
        p: ({ children }) => <p>{children}</p>,
      }}
    >
      {replacedText}
    </ReactMarkdown>
  );
}
