import React, { useEffect, useState } from "react";
import { competitions } from "../../data/competitions";
import "../../assets/css/styles-home.css";
import { Link } from "react-router-dom";
import { FiCalendar, FiEye } from "react-icons/fi";

const RecomendedCompetitions = () => {
  const [competitions, setCompetitions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  // Function to fetch competitions from API
  const fetchCompetitions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/lomba`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching competitions:', error.message);
      return [];
    }
  };

  // Function to fetch categories from API
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

  // Effect to fetch categories on component mount
  useEffect(() => {
    const fetchAndSetCategories = async () => {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    };

    fetchAndSetCategories();
  }, []);

  // Effect to fetch competitions and filter based on categoryId
  useEffect(() => {
    const fetchAndSetCompetitions = async () => {
      const competitionsData = await fetchCompetitions();
      setCompetitions(competitionsData);

    };

    fetchAndSetCompetitions();

  }, [categories]); // Dependency array includes categoryId and categories

  return (
    <div className="flex flex-wrap gap-10 mt-12  mx-auto w-full max-w-screen-2xl justify-center">
      {competitions.length > 0 ?
        competitions.slice(0, 6).map((data, key) => {
          return (
            <div className="card" style={{ width: '300px' }} key={key}>
              <Link to={`/competition/${data.id_lomba}`}>
                <img src={data.image_lomba !== '' ? `${import.meta.env.VITE_BACKEND_URL}/${data.image_lomba}` : '/assets/images/placeholder-image.jpg'} alt={data.nama_lomba} className="w-full mx-auto" style={{
                  maxHeight: "200px",
                  height: "100%",
                  width: "auto",
                  objectFit: "cover",
                  objectPosition: "center"
                }} />
              </Link>
              <div className="card-content p-4">
                <div className="category text-xs font-semibold uppercase text-white">{data.tingkat_perlombaan}</div>
                <div className="type text-xs font-semibold uppercase text-white">
                  {categories.find((cat) => cat.id_kategori === data.id_kategori)?.nama_kategori}
                </div>
                <h3 className="text-lg font-bold mt-2">{data.nama_lomba}</h3>
                <div className="text-xs text-gray-500 mt-2 gap-5 flex justify-between">
                  <div className="flex items-center gap-2">
                    <FiCalendar />
                    <span>{data.tanggal_akhir}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiEye />
                    <span>{data.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }) : "There's no recommended competition that we can provide"
      }
    </div>
  );
};

export default RecomendedCompetitions;
