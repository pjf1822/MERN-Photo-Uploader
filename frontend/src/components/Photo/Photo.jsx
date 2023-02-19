import React from "react";
import axios from "axios";

const Photo = ({ thing }, photos, setPhotos) => {
  console.log(photos, "these are the photos in the thing");
  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/photos/delete/${id}`);
      setPhotos(photos.filter((photo) => photo._id !== id));
    } catch (error) {}
  };
  return (
    <div style={{ height: 100, width: 100 }}>
      <img style={{ height: 200, width: 200 }} src={thing.myFile} alt="" />
      <button onClick={() => deleteItem(thing._id)}>delete this photo</button>
    </div>
  );
};

export default Photo;
