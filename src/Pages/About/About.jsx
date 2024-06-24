import React from "react";
import "../../assets/css/styles-tentang.css";
import HeroLeft from "../../Components/Hero/HeroLeft";
import HeroRight from "../../Components/Hero/HeroRight";
import Trophy from "../../../public/assets/images/skuy-lomba-images/piala.png";
import TuguJogja from "../../../public/assets/images/skuy-lomba-images/tugu-jogja.png";
import Subtitle from "../../Components/Text/Subtitle";
import WhyUs from "../../Components/WhyUs/WhyUs";

const About = () => {
  return (
    <>
      <HeroLeft
        link="/tes"
        buttonText="Lanjutkan"
        image={Trophy}
        sub="About Us"
        head="Berbagi Semangat Kompetisi untuk Membentuk Generasi Pemenang"
        content=" Skuylomba adalah website informasi perlombaan yang berfokus didaerah
            Yogyakarta. Kami percaya bahwa kompetisi adalah kunci untuk
            membentuk generasi pemenang. Kami berkomitmen untuk menyediakan
            platform yang memotivasi dan menginspirasi individu untuk mengejar
            ambisi mereka, "
      />
      <HeroRight
        link="/inpo"
        buttonText="Lanjutkan"
        image={TuguJogja}
        head="Menghubungkan Mahasiswa dengan Kesempatan Sukses"
        content=" Jogja, kota yang penuh inspirasi bagi para pelajar yang bersemangat
        mengejar impian mereka. Namun, mahasiswa sering menghadapi kesulitan
        dalam mencari informasi tentang lomba yang relevan dengan minat dan
        bakat mereka. Untuk mengatasi hal ini, kami hadir dengan portal kami.
        Kami berkomitmen menyajikan informasi lomba terpercaya dan beragam,
        dari bidang akademik hingga kewirausahaan, memastikan bahwa setiap
        mahasiswa memiliki akses mudah untuk meraih kesuksesan dalam bidang
        yang mereka geluti."
      />

      <div className="mt-20 text-center">
        <Subtitle text="Mengapa Kita?" />
        <p className="mt-2">
          Kerena kita memiliki berberapa kelebihan yang menarik dibawah ini
        </p>
      </div>

      <WhyUs />
    </>
  );
};
export default About;
