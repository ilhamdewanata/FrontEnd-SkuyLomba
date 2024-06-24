import HomeButton from "../Button/HomeButton";
import ClassChampion from "../../../public/assets/images/skuy-lomba-images/Class-Champions-1.png";

const Hero = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Lomba
            <br />
            Informasi
            <br />
            Perlombaan
            <br />
            Yogyakarta
          </h1>
          <p>
            "Inspirasi, Kompetisi, dan Kemenangan - Temukan semuanya di Skuy
            Lomba!"
          </p>
          <HomeButton text="Ayo Jelajahi" link="/competition/all" />
        </div>
        <div className="hero-image">
          <img src={ClassChampion} alt="Trophy and Competition Icons" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
