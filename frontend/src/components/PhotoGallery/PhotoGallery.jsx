import React, { useState, useEffect } from "react";
import axios from "axios";
const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  const getAllPhotos = async () => {
    try {
      const { data } = await axios.get("/api/photos/getall");
      setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPhotos();
  }, []);

  return (
    <div>
      PhotoGallery
      {photos.map((photo) => {
        console.log(photo.myFile);
        return <img src={photo.myFile} alt="" />;
      })}
    </div>
  );
};

export default PhotoGallery;
