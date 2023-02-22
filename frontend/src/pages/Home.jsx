import Layout from "../components/Layout";
import Navbar from "../components/Nav/Navbar";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
import PhotoUploadForm from "../components/PhotoUploadForm/PhotoUploadForm";
import { useEffect, useState } from "react";
import classes from "./Home.module.scss";
const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  useEffect(() => {
    setPhotos([...photos]);
  }, [postImage]);

  return (
    <Layout>
      <div className={classes.homeWrapper}>
        <Navbar />
        <PhotoUploadForm
          postImage={postImage}
          setPostImage={setPostImage}
          photos={photos}
          setPhotos={setPhotos}
        />
      </div>
      <PhotoGallery photos={photos} setPhotos={setPhotos} />
    </Layout>
  );
};

export default Home;
