import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/styles-home.css";
import noDataFoundImg from '../../../public/assets/images/no-data-found.png';
import { FiCalendar, FiEye } from "react-icons/fi";
const CompetitionMenu = ({ search }) => {
  const { categoryId } = useParams();
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

  const fetchAndFilterCompetitions = async () => {
    const competitionsData = await fetchCompetitions();
    setCompetitions(competitionsData);

    if (categoryId !== undefined) {
      const filteredCategory = categories.find((cat) => String(cat.id_kategori) === String(categoryId));
      setCategory(filteredCategory);

      const filteredCompetitions = competitionsData.filter((comp) => String(comp.id_kategori) === String(categoryId));
      setCompetitions(filteredCompetitions);
    }
  };

  // Effect to fetch competitions and filter based on categoryId
  useEffect(() => {
    fetchAndFilterCompetitions();
  }, [categoryId, categories]); // Dependency array includes categoryId and categories

  // Effect to filter competitions based on search input
  useEffect(() => {
    const filterCompetitions = () => {
      if (search !== "") {
        const filteredCompetitions = competitions.filter((comp) =>
          comp.nama_lomba.toLowerCase().includes(search.toLowerCase())
        );
        setCompetitions(filteredCompetitions);
      } else {
        // Reset competitions to the full list
        fetchAndFilterCompetitions(); // Refetch to reset filter
      }
    };

    filterCompetitions();
  }, [search]); // Dependency array includes search and competitions

  return (
    <div className="mx-auto px-4 h-screen">
      {category && categoryId !== undefined && (
        <div className="my-10">Menampilkan kompetisi dengan kategori: {category.nama_kategori}</div>
      )}
      <div className="flex flex-wrap justify-center gap-10">
        {(competitions && competitions.length > 0) ? (
          competitions.map((data, key) => (
            <div className="card" style={{ width: '300px' }} key={key}>
              <Link to={`/competition/${data.id_lomba}`}>
                <img
                  src={data.image_lomba !== '' ? `${import.meta.env.VITE_BACKEND_URL}/${data.image_lomba}` : '/assets/images/placeholder-image.jpg'}
                  alt={data.nama_lomba}
                  className="w-full mx-auto"
                  style={{
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
          ))
        ) : (
          <div className="flex flex-col gap-2 justify-center text-center">
            <img src={noDataFoundImg} className="h-80" />
            <h1>No data found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompetitionMenu;
