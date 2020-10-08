import React from "react";

const AdvertItem = ({ id, onDelete, index, place, title, body, contact }) => {
  return (
    <tr>
      <td>{index+1}</td>
      <td>{place}</td>
      <td>{title}</td>
      <td>{body}</td>
      <td>{contact}</td>
      <td>
          <span onClick={() => {onDelete(id)}}>Удалить</span>
      </td>
    </tr>
  );
};

export default AdvertItem;
