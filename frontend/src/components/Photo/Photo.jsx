import React from "react";

const Photo = ({ file }) => {
  console.log(file, "ts is inside th compnoet ");
  return (
    <div style={{ height: 100, width: 100 }}>
      <img style={{ height: 200, width: 200 }} src={file} alt="" />
    </div>
  );
};

export default Photo;
