import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./PhotoGallery.module.scss";
import Photo from "../Photo/Photo";
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
    <div className={classes.galleryWrapper}>
      PhotoGallery
      <div className={classes.photoWrapper}>
        {photos.map((photo) => {
          return (
            <div key={photo._id}>
              <Photo file={photo.myFile} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoGallery;
