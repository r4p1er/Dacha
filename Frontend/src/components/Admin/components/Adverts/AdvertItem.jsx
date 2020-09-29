import React from "react";

const AdvertItem = ({ id, place, title, body, contact }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{place}</td>
      <td>{title}</td>
      <td>{body}</td>
      <td>{contact}</td>
    </tr>
  );
};

export default AdvertItem;
