import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import classes from "./PhotoUploadForm.module.scss";

const PhotoUploadForm = ({ postImage, setPostImage, photos }) => {
  const createPost = async (newImage) => {
    try {
      await axios.post("api/photos/uploads", newImage);
      // setPostImage({ myFile: "" });
    } catch (error) {
      toast.error(error.response.statusText);

      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (photos.length > 4) {
      return toast.error("you have too may photos uploaded sorry");
    }

    createPost(postImage);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file.size);
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };
  return (
    <div className={classes.formWrapper}>
      <form onSubmit={handleSubmit} className={classes.galleryForm}>
        <label
          htmlFor="file-upload"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className={classes.galleryFormImage}
            style={{ height: 400, width: 400 }}
            src={postImage.myFile}
            alt=""
          />
        </label>
        <input
          className={classes.galleryFormInput}
          type="file"
          name="myFile"
          id="file-upload"
          label="Image"
          title="asdfasdf"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <button type="submit" className={classes.galleryFormSubmitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PhotoUploadForm;

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
