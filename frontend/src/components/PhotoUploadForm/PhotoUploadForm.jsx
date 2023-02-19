import { useState } from "react";
import axios from "axios";

const PhotoUploadForm = () => {
  const url = "api/photos/uploads";
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  const createPost = async (newImage) => {
    try {
      await axios.post(url, newImage);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="custom-file-upload">
          <img
            style={{ height: 200, width: 200 }}
            src={postImage.myFile}
            alt=""
          />
        </label>
        <input
          type="file"
          name="myFile"
          id="file-upload"
          label="Image"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />

        <h3>doris</h3>
        <span>diesigner</span>
        <button type="submit"> submit</button>
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
