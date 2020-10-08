import React from "react";

const NewsCard = ({ title, body, date }) => {
  const newsDate = new Date(date).toLocaleString();

  return (
    <div>
      <h5>{title}</h5>
      <p>{body}</p>
      <span>{newsDate}</span>
    </div>
  );
};

export default NewsCard;
