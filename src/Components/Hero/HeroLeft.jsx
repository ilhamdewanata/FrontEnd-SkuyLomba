import "../../assets/css/styles-tentang.css";
import HomeButton from "../Button/HomeButton";

const HeroLeft = ({ image, sub, head, content, link, buttonText }) => {
  return (
    <>
      <div className="new-hero-section">
        <div className="new-hero-image">
          <img src={image} alt="New Image" />
        </div>
        <div className="new-hero-content">
          <p>{sub}</p>
          <h2 className="text-blue">{head}</h2>
          <p>{content}</p>
          <HomeButton text={buttonText} link={link} />
        </div>
      </div>
    </>
  );
};

export default HeroLeft;
