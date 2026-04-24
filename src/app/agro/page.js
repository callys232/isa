import AgroTech from "../../components/agroTech/header";
import FarmsGrid from "../../components/agroTech/farmGrid";
import ProductGallery from "../../components/Products";
import VideoGallery from "../../components/video/videoBlog";
const AgroTechPage = () => {
    return (
        <div>
            <AgroTech />
            <FarmsGrid />
            <VideoGallery />
            <ProductGallery />
        </div>
    );
};
export default AgroTechPage;
