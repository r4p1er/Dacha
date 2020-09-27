import React from "react";

const NotFound = (isNotFound) => {
  console.log(isNotFound.isNotFound)
  const e = true
  isNotFound.isNotFound(e)
  return (
    <>
      <h1 className="text-center mt-3">Такой страницы не существует</h1>
    </>
  );
};

export default NotFound;
