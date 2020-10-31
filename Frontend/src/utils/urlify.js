import React from "react";
export function urlify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} rel="noopener noreferrer" target="_blank">
          {part}
        </a>
      );
    }
    return part;
  });
}