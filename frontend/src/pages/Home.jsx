import Layout from "../components/Layout";
import Navbar from "../components/Nav/Navbar";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
import PhotoUploadForm from "../components/PhotoUploadForm/PhotoUploadForm";
import { useState } from "react";
const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

  return (
    <Layout>
      <Navbar />
      <PhotoUploadForm
        postImage={postImage}
        setPostImage={setPostImage}
        photos={photos}
      />
      <PhotoGallery photos={photos} setPhotos={setPhotos} />
    </Layout>
  );
};

export default Home;
