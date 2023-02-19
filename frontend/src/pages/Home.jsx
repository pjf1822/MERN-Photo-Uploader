import Layout from "../components/Layout";
import Navbar from "../components/Nav/Navbar";
import PhotoGallery from "../components/PhotoGallery/PhotoGallery";
import PhotoUploadForm from "../components/PhotoUploadForm/PhotoUploadForm";
const Home = () => {
  return (
    <Layout>
      <Navbar />
      <PhotoUploadForm />
      <PhotoGallery />
    </Layout>
  );
};

export default Home;
