import { useEffect, useState } from "react";
// import "../../assets/css/styles-kompetisi.css";
import Search from "../../Components/Input/Search";
import { categori } from "../../data/categori";
import HomeButton from "../../Components/Button/HomeButton";
import CompetitionMenu from "../../Components/Competitions/CompetitionMenu";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiPlusCircle } from 'react-icons/fi';

import "../../assets/css/styles-kompetisi.css";
import { category } from "../../data/category";
import { useSelector } from "react-redux";

const Competition = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickCategoryBtn = (cId) => {
    if (cId != "" || cId != undefined) {
      navigate(`/competition/category/${cId}`);
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

  // UseEffect hook at the top level of the component
  useEffect(() => {
    if (searchText !== undefined && searchText !== "") {
      setSearch(searchText);
    } else {
      setSearch("");
    }
  }, [searchText]);

  // handleSearch function to update searchText state
  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  return (
    <>
      <div className="container p-10 mx-auto">
        <div className="flex flex-wrap justify-center align-middle gap-5">
          <Search text="Cari Lomba" onSearch={(e) => handleSearch(e.target.value)} />
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={handleClick}>
              Pilih Kategori
            </button>
            {open && (
              <ul
                className="dropdown-menu"
                aria-labelledby="categoryDropdown"
              >
                <ul>
                  {category && category.map((data, key) => {
                    return (
                      <li key={key}>
                        <a href={data.link} className="dropdown-item">
                          {data.category}
                        </a>
                      </li>
                    );
                  })
                  }
                </ul>
              </ul>
            )}
          </div>

          {currentUser && (
            <HomeButton
              text="Upload Lomba"
              link="/upload/competition"
              icon={FiPlusCircle}
            />
          )}

        </div>

        <div className="mt-10 flex flex-wrap justify-center ">
          {categories && categories.map((data, key) => (
            <button className="dynamic-button" key={key} onClick={() => handleClickCategoryBtn(data?.id_kategori)}>
              {data?.nama_kategori}
            </button>
          )
          )}

          <button className="dynamic-button" onClick={() => navigate('/competition')}>
            Semua
          </button>
        </div>

        <CompetitionMenu search={search} categories={categories} />

      </div>
    </>
  );
};

export default Competition;
