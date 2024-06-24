import HomeButton from "../Button/HomeButton";

const HeroRight = ({ image, head, content, link, buttonText }) => {
  return (
    <>
      <div className="new-hero-section">
        <div className="new-hero-content">
          <h2 className="text-blue">{head}</h2>
          <p>{content}</p>
          <HomeButton link={link} text={buttonText} />
        </div>
        <div className="new-hero-image">
          <img src={image} alt="New Image" />
        </div>
      </div>
    </>
  );
};
export default HeroRight;
