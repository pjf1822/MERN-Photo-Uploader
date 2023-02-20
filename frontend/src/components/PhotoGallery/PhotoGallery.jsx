import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./PhotoGallery.module.scss";
const PhotoGallery = ({ photos, setPhotos }) => {
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

  const deleteItem = async (id) => {
    try {
      await axios.delete(`/api/photos/delete/${id}`);

      setPhotos(photos.filter((photo) => photo._id !== id));
    } catch (error) {}
  };

  return (
    <div className={classes.galleryWrapper}>
      {photos &&
        photos.map((photo) => {
          return (
            <div key={photo._id} className={classes.photoWrapper}>
              <img className={classes.galleryImage} src={photo.myFile} alt="" />
              <button
                className={classes.deleteButton}
                onClick={() => deleteItem(photo._id)}
              >
                Delete This Photo
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default PhotoGallery;
