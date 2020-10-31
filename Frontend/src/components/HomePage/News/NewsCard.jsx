import React from "react";
import dateFormater from "../../../utils/dateFormater";
import { urlify } from "../../../utils/urlify";

const NewsCard = React.memo(({ title, body, date }) => {
  return (
    <>
      <div className="news-card d-flex flex-column">
        <h5>{title}</h5>
        <p className="home_post_text">{urlify(body)}</p>
        <span className="align-self-end">{dateFormater(date)}</span>
      </div>
      <hr color="#666666" />
    </>
  );
});

export default NewsCard;
