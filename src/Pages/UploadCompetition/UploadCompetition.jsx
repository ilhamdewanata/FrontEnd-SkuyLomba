import React, { useEffect } from "react";
import "../../assets/css/styles-upload.css";
import Gallery from "../../../public/assets/images/placeholder-image.webp";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UploadCompetition = () => {
  const { currentUser } = useSelector(state => state.user);
  const [tipeBiaya, setTipeBiaya] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    id_user: currentUser.id_users,
    nama_lomba: '',
    penyelenggara_lomba: '',
    tanggal_akhir: '',
    link_pendaftaran_lomba: '',
    link_narahubung: '',
    id_kategori: '',
    tingkat_perlombaan: '',
    image_lomba: '',
    biaya_pendaftaran: 0,
    survei: '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (imageFile) {
    //   formDataToSend.append('image_lomba', imageFile);
    // }

    // for (var pair of formDataToSend.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    // return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lomba`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.message);
        return toast('Gagal menambahkan lomba, mohon periksa pesan eror pada console log untuk mengetahui detail error');
      } else {
        toast(data.message);
        navigate('/competition');
        console.log(data);
        return;
      }

    } catch (error) {
      console.error('Error submitting the form:', error);
      // Handle error
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/kategori`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      const res = await fetchCategories();
      setCategories(res);
    };

    fetchAndSetCategories();
  }, []);

  return (
    <>
      <div className="container mx-auto p-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Upload Lomba</h1>
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg  hover:bg-blue-700 transition duration-300 flex gap-2 justify-center items-center" onClick={handleSubmit}>
            <FiSend /> Kirim
          </button>
        </div>

        <div className="form-container">

          <div className="upload-section">
            <h2 className="subjudul text-center">1. Unggah Poster Kompetisi mu</h2>
            <div
              className="border-2 border-dashed rounded form-control p-6 flex justify-center items-center cursor-pointer hover:border-gray-400 transition duration-300 h-[230px]" onClick={handleImageUploadClick}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="max-h-40" />
              ) : (
                <img src={Gallery} alt="Upload Poster" className="max-h-40" />
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              name="image_lomba"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="data-section">
            <h2 className="subjudul text-center mb-4">2. Isi Data Kompetisi</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="nama_lomba" className="block font-medium mb-1">Nama Kompetisi</label>
                <input
                  type="text"
                  id="nama_lomba"
                  name="nama_lomba"
                  value={formData.nama_lomba}
                  onChange={handleInputChange}
                  className="w-full border rounded form-control p-3"
                  placeholder="Masukan nama kompetisimu"
                />
              </div>

              <div>
                <label htmlFor="penyelenggara_lomba" className="block font-medium mb-1">Penyelenggara Kompetisi</label>
                <input
                  type="text"
                  id="penyelenggara_lomba"
                  name="penyelenggara_lomba"
                  value={formData.penyelenggara_lomba}
                  onChange={handleInputChange}
                  className="w-full border rounded form-control p-3"
                  placeholder="Masukan nama penyelenggara"
                />
              </div>

              <div>
                <label htmlFor="tanggal_akhir" className="block font-medium mb-1">Deadline Kompetisi</label>
                <input
                  type="date"
                  id="tanggal_akhir"
                  name="tanggal_akhir"
                  value={formData.tanggal_akhir}
                  onChange={handleInputChange}
                  className="w-full border rounded form-control p-3"
                  placeholder="Masukan Tanggal"
                />
              </div>

              <div>
                <label htmlFor="link_pendaftaran_lomba" className="block font-medium mb-1">Link pendaftaran Kompetisi</label>
                <input
                  type="url"
                  id="link_pendaftaran_lomba"
                  name="link_pendaftaran_lomba"
                  value={formData.link_pendaftaran_lomba}
                  onChange={handleInputChange}
                  className="w-full border rounded form-control p-3"
                  placeholder="Masukan Link"
                />
              </div>

              <div>
                <label htmlFor="link_narahubung" className="block font-medium mb-1">Link narahubung</label>
                <input
                  type="url"
                  id="link_narahubung"
                  name="link_narahubung"
                  value={formData.link_narahubung}
                  onChange={handleInputChange}
                  className="w-full border rounded form-control p-3"
                  placeholder="Masukan kontak"
                />
              </div>

              <div>
                <label htmlFor="id_kategori" className="block font-medium mb-1">Kategori Kompetisi</label>
                <select
                  id="id_kategori"
                  name="id_kategori"
                  value={formData.id_kategori}
                  onChange={handleInputChange}
                  className="w-full border rounded form-control p-3"
                >
                  <option value="">Pilih Kategori</option>
                  {categories && categories.length > 0 && categories.map((category, key) =>
                  (
                    <option value={category.id_kategori} key={key}>{category.nama_kategori}</option>
                  )
                  )}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Tingkat Perlombaan</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input type="radio" id="nasional" name="tingkat_perlombaan" value="nasional" className="mr-2"
                      onChange={handleInputChange} />
                    <label htmlFor="nasional">Nasional</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="umum" name="tingkat_perlombaan" value="umum" className="mr-2" onChange={handleInputChange} />
                    <label htmlFor="umum">Umum</label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Biaya pendaftaran kompetisi</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <input type="radio" id="bayar" name="biaya" value="bayar" className="mr-2" onClick={(e) => setTipeBiaya(e.target.value)} />
                    <label htmlFor="bayar">Bayar</label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="gratis" name="biaya" value="gratis" className="mr-2" onClick={(e) => setTipeBiaya(e.target.value)} />
                    <label htmlFor="gratis">Gratis</label>
                  </div>
                </div>
                {tipeBiaya === "bayar" && (
                  <div className="mt-4">
                    <label htmlFor="biaya_pendaftaran" className="block font-medium mb-1">Biaya Pendaftaran</label>
                    <input
                      type="number"
                      id="biaya_pendaftaran"
                      name="biaya_pendaftaran"
                      className="w-full border rounded form-control p-3"
                      placeholder="Masukan biaya pendaftaran"
                      value={formData.biaya_pendaftaran}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="survey-section">
            <h2 className="subjudul text-center mb-4">3. Skuy SURVEY</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="survei" className="block font-medium mb-1">
                  Dari manakah kalian mendapatkan informasi tentang kami?
                </label>
                <textarea
                  id="survei"
                  name="survei"
                  className="w-full border rounded form-control p-3 h-40"
                  placeholder="Masukan informasi"
                  value={formData.survei}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadCompetition;
