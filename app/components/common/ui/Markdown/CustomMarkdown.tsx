import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '~/Assets/Css/Renderer.css';

interface CustomMarkdownProps {
  text?: string;
  char?: string;
  user?: string;
  ai_message?: string;
}

const CustomMarkdown: React.FC<CustomMarkdownProps> = ({
  text = '',
  char = 'Unknown Character',
  user = 'User',
  ai_message = '',
}) => {
  const [replacedText, setReplacedText] = useState<string>(text);

  useEffect(() => {
    const replacePlaceholders = (content: string) =>
      content
        .replace(/{{char}}/g, char)
        .replace(/{{user}}/g, user)
        .replace(/{{ai_message}}/g, ai_message);

    setReplacedText(replacePlaceholders(text));
  }, [text, char, user, ai_message]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        em: ({ children }) => <span className="italic-text">{children}</span>,
        strong: ({ children }) => {
          const content = React.Children.toArray(children).join('');
          return content.startsWith('**') && content.endsWith('**') ? (
            <span className="dark-text">{content.slice(2, -2)}</span>
          ) : (
            <strong>{children}</strong>
          );
        },
      }}
    >
      {replacedText}
    </ReactMarkdown>
  );
};

export default CustomMarkdown;
