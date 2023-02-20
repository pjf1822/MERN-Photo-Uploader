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
      PhotoGallery
      <div className={classes.photoWrapper}>
        {photos &&
          photos.map((photo) => {
            return (
              <div key={photo._id} style={{ height: 100, width: 100 }}>
                <img
                  style={{ height: 200, width: 200 }}
                  src={photo.myFile}
                  alt=""
                />
                <button onClick={() => deleteItem(photo._id)}>
                  delete this photo
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PhotoGallery;
