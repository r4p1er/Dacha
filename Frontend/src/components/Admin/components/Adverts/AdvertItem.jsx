import React from "react";

const AdvertItem = ({ id, onDelete, index, place, title, body, contact }) => {
  return (
    <tr>
      <td>{index+1}</td>
      <td className="table-ad-place">{place}</td>
      <td className="table-ad-title">{title}</td>
      <td className="table-ad-body">{body}</td>
      <td className="table-ad-contact">{contact}</td>
      <td>
          <span onClick={() => {onDelete(id)}}>Удалить</span>
      </td>
    </tr>
  );
};

export default AdvertItem;
