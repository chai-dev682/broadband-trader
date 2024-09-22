'use client';
import React from 'react';
import Link from 'next/link';

interface TextLinkProps {
  href?: string;
  text: string;
  onClick?: () => void;
}
const TextLink: React.FC<TextLinkProps> = ({ href, text, onClick }) => {
  return (
    <div className="px-8 text-center text-sm text-muted-foreground hover:cursor-pointer">
      {href ? (
        <Link
          href={href}
          className="underline underline-offset-4 hover:text-primary"
        >
          {text}
        </Link>
      ) : (
        <p
          className="underline underline-offset-4 hover:text-primary"
          onClick={onClick}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default TextLink;
