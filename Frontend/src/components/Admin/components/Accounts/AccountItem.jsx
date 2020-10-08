import React from "react";

const AccountItem = ({
  id,
  index,
  lastName,
  middleName,
  name,
  place,
  roleId,
  onDelete,
}) => {

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{lastName}</td>
        <td>{name}</td>
        <td>{middleName}</td>
        <td>{place}</td>
        <td>{roleId}</td>
        <td>
          <span onClick={() => {onDelete(id)}}>Удалить</span>
        </td>
      </tr>
    </>
  );
};

export default AccountItem;