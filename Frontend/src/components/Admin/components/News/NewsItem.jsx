import React from "react";


const NewsItem = ({ id, title, body, date, onDelete}) => {

  const newsDate = new Date(date).toLocaleString();

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{body}</td>
      <td>{newsDate}</td>
      <td>
        <span >Изменить</span>
      </td>
      <td>
        <span onClick={()=> {onDelete(id)}}>Удалить</span>
      </td>
    </tr>
  );
};

export default NewsItem;
