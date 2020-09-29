import React from "react";

const NewsItem = ({ id, title, body }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{body}</td>
    </tr>
  );
};

export default NewsItem;
