import React from "react";

const NewsCard = ({ title, body, date }) => {
  const newsDate = new Date(date).toLocaleString();

  function urlify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex)
       .map((part, index) => {
          if(part.match(urlRegex)) {
             return <a key={index} href={part} rel="noopener noreferrer" target="_blank">{part}</a>;
          }
          return part;
       });
  }

  const headingAvailable = (
    <span className="home_post_text">{urlify(body)}</span>
  );

  return (
    <div>
      <h5>{title}</h5>
      <p>{headingAvailable}</p>
      <span>{newsDate}</span>
    </div>
  );
};

export default NewsCard;
