import React from "react";
import LoaderGif from "../../additions/LoaderGif.gif";
import { Image } from "react-bootstrap";

const FullPageLoader = () => {
  return (
      <Image alt="ЗАГРУЗКА..." width="400px" src={LoaderGif} />
  );
};

export default FullPageLoader;
