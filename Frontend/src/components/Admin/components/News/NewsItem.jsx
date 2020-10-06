import React from "react";


const NewsItem = ({ id, title, body, onDelete}) => {
  
      
  return (
    <>
      <td>{id}</td>
      <td>{title}</td>
      <td>{body}</td>
      <td>
        <span >Изменить</span>
      </td>
      <td>
        <span onClick={()=> {onDelete(id)}}>Удалить</span>
      </td>
    </>
  );
};

export default NewsItem;
