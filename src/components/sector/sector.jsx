import React, { useEffect, useState } from 'react';
import './sector.scss';
import { Link } from 'react-router-dom';
import sectorService from '../../services/SectorService';

// Import statements
const BASE_URL = import.meta.env.VITE_BASE_URL; // Define the BASE_URL based on environment variable

// Define a functional React component named 'sector'
export default function sector() {
  // Define and initialize state variables
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [sectors, setSectors] = useState([]);

  // Destructure the 'get' function from the 'useApi' custom hook
  
  const { fetchHomeSector } = sectorService();

  // Function to handle a successful API response
  const handleSuccess = (res) => {
    // Extract data from the API response
    const { title, subTitle, sectors: { data: sectorArray } } = res.data.data.attributes;
    
    // Update the component's state with the extracted data
    setTitle(title);
    setSubTitle(subTitle);
    setSectors(sectorArray);
  };

  // Asynchronous function to fetch data from the 'home-sector' API endpoint


  // Use the 'useEffect' hook to run 'fetchHomeSector' when the component mounts
  useEffect(() => {
    fetchHomeSector(handleSuccess);
  }, []);


  return (
    <div className="sector">
      <h2>{title}</h2>
      <p>{subTitle}</p>

      <div className="sector__types">
        {sectors.map((sector) => {
          const {  title, bigImage, smallimage, categories} = sector.attributes;
          const { url: smallimageUrl } = smallimage.data.attributes;
          const {url: bigImageUrl} = bigImage.data.attributes;

        

          
          return (
        <div key={sector.id} className="sector__wrap">
          <picture className="sector__picture">
            <source srcSet={`${BASE_URL}${bigImageUrl}`} media="(min-width: 767px)" />
            <source srcSet={`${BASE_URL}${smallimageUrl}`} />
            <img src={`${BASE_URL}${smallimageUrl}`} alt="" />
          </picture>
          <div className="sector__name">{title}</div>
          <ul className="sector__list">
            {categories.data.map((category) => {
              const { title, jobs: {data: jobArray} } = category.attributes;
            
              return  (
            <li key={category.id}>
              <Link to="">
                {title} <span>{jobArray.length}</span>
              </Link>
            </li>
              )
              })}
          </ul>
        </div>
          )
        })}


        <a href="">
          <div className="sector__browse">Browse all sectors</div>
        </a>

        <ul className="sector__mlist">
          <li>
            <a href="">
              Accountancy jobs <span>5, 757</span>
            </a>
          </li>
          <li>
            <a href="">
              Acturial jobs <span>5, 757</span>
            </a>
          </li>
          <li>
            <a href="">
              Admin, Secretarial jobs <span>5, 757</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
