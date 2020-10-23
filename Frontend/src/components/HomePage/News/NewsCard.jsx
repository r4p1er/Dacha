import React from "react";

const NewsCard = ({ title, body, date }) => {
  const newsDate = new Date(date).toLocaleDateString();
  const newsDateHour = new Date(date).getHours();
  const newsDateMinute = new Date(date).getMinutes();

  function urlify(text) {
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

  const headingAvailable = <p className="home_post_text">{urlify(body)}</p>;

  return (
    <>
      <div className="news-card d-flex flex-column">
        <h5>{title}</h5>
        {headingAvailable}
        <span className="align-self-end">
          {newsDateHour}:{newsDateMinute} {newsDate}г
        </span>
      </div>
        <hr/>
    </>
  );
};

export default NewsCard;
