import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/css/styles-lihat-lomba.css";
import { FiArrowLeft, FiPhoneCall, FiPlusCircle } from 'react-icons/fi';
import { useSelector } from "react-redux";
const CompetitionDetail = () => {
  const [category, setCategory] = useState(null);

  const { currentUser } = useSelector(state => state.user);

  const formatRupiah = (price) => {
    if (price == "free") {
      return "Gratis";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    })
      .format(price)
      .replace("IDR", "Rp.");
  };
  const navigate = useNavigate();
  const [competition, setCompetition] = useState(null);
  const [views, setViews] = useState(0);
  const { id } = useParams();

  const getCompetitionById = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lomba/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data because competition not found');
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching competition:', error.message);
      return [];
    }
  };
  const incrementViews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lomba/${id}/views`, {
        method: 'PATCH'
      });

      if (!response.ok) {
        throw new Error('Failed to increment views because competition not found');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return [];
    }
  };

  useEffect(() => {

    const fetchCompetition = async () => {
      const { views } = await incrementViews();
      const res = await getCompetitionById();

      setCompetition(res);
      setViews(views);


      const category = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/kategori/${res.id_kategori}`).then((res) => res.json()).catch((error) => console.log(error));
      setCategory(category);
    };

    fetchCompetition();
  }, []);

  console.log(competition);

  if (Array.isArray(competition) && competition?.length < 1) {
    return <div className="h-screen flex items-center justify-center">Kompetisi tidak ditemukan</div>;
  }

  return (
    <div className="container">
      <div className="p-3">
        <div className="flex gap-4 justify-between align-middle items-center">
          <Link className="flex align-middle justify-center items-center p-2 border bg-red-300 hover:bg-red-500 text-white rounded-[50%]" to="/competition">
            <FiArrowLeft size={22} />
          </Link>

          {currentUser && (
            <button
              onClick={() => navigate("/upload/competition")}
              className="flex align-middle justify-center items-center px-4 py-2 border bg-blue-500 hover:bg-blue-600 text-white gap-2 rounded-lg"
            >
              <FiPlusCircle /> Upload Lomba
            </button>
          )}

        </div>
        <div className="gambar">
          <img src={competition?.image_lomba !== '' ? `${import.meta.env.VITE_BACKEND_URL}/${competition?.image_lomba}` : '/assets/images/placeholder-image.jpg'} alt="Competition Image" style={{
            height: '100%',
            maxHeight: '400px'
          }} />
        </div>
        <div className="content">
          <h1 className="title">{competition?.nama_lomba}</h1>
          <p className="subtitle">{competition?.penyelenggara_lomba}</p>
          <div className="action-buttons">
            <a
              href={`https://api.whatsapp.com/send/?phone=${competition?.link_narahubung}&text=Saya%20ingin%20mendaftar%20${competition?.nama_lomba}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex align-middle justify-center items-center px-4 py-2 border bg-green-500 hover:bg-green-600 text-white gap-2 rounded-lg"
            >
              <FiPhoneCall /> Kontak
            </a>
            <a className="register-button" href={competition?.link_pendaftaran_lomba} target="_blank">Daftar</a>
          </div>
          <div className="details lg:mx-auto">
            <div className="detail-item border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
              <span className="detail-title">Batas Pendaftaran</span>
              <span className="detail-value">{competition?.tanggal_akhir}</span>
            </div>
            {/* <div className="detail-item border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
              <span className="detail-title">Venue</span>
              <span className="detail-value">{competition?.venue}</span>
            </div> */}
            <div className="detail-item border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
              <span className="detail-title">Pendaftaran</span>
              <span className="detail-value">
                {formatRupiah(competition?.biaya_pendaftaran)}
              </span>
            </div>
            <div className="detail-item border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
              <span className="detail-title">Lomba Tingkat</span>
              <span className="detail-value">{competition?.tingkat_perlombaan}</span>
            </div>
            <div className="detail-item border border-gray-300 rounded-lg px-3 py-2 shadow-sm">
              <span className="detail-title">Kategori</span>
              <span className="detail-value">{category?.nama_kategori}</span>
            </div>
          </div>
          <div className="statistics">
            <span className="statistic-item">
              <i className="icon-eye"></i> {views} Dilihat oleh orang
            </span>
            <span className="statistic-item">
              <i className="icon-click"></i> {competition?.jumlah_pendaftar} Orang klik
              mendaftar
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CompetitionDetail;
