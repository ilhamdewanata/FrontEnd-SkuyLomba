import React from 'react'
import ImgDesignGrafis from "../../assets/Poster-Lomba/3.png"
import "../../assets/css/styles-designGrafis.css"


const DesaignGrafis = () => {
  return (
    <div className='headers'>
      <div className="cards">
        <img src={ImgDesignGrafis} alt="Event 2" /> 
                 <div className="card-content">
                 <div className="category text-xs font-semibold uppercase text-white">Nasional</div>
                 <div className="type text-xs font-semibold uppercase text-white">Esports</div>
            <h3>Fearstyc MLBB Competition 2024</h3>
            <div className="details">
                <span>15 Mei 2024, 14:25</span>
                <span>125 views</span>
            </div>
         
        </div>
    </div>
    </div>
  )
}

export default DesaignGrafis
