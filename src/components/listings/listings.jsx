import React, {useState, useEffect} from 'react';
import './listings.scss';
import Paginate from '../paginate/paginate';
import { StarSaved, Money, Location, Timer } from '../images';
import { useApi } from '../../hooks/useApi';



const MAX_PER_PAGE = 3

// Default function component for displaying job listings
export default function listings() {
  // State variables to hold job listings and their metadata
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});

  // Access the get method from the useApi custom hook
  const { get } = useApi();

  // Function to handle the success response of the API call
  const handleSuccess = (res) => {
    const { entries, meta } = res.data;

    // Set the received job listings and metadata to the state variables
    setJobs(entries);
    setMeta(meta);
  };

  // Function to fetch jobs from the API
  const fetchJobs = async (page = 1) => {
    // Request job data from the API
    await get('jobs', {
      onSuccess: (res) => handleSuccess(res),
      params: {
        // Specify parameters for the request (e.g., populate company, start, and limit)
        'populate[company]': true,
        'start': (page -1 ) * MAX_PER_PAGE, 
        'limit': MAX_PER_PAGE, 
      },
    });
  };

  
  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePageChange = (pageNumber) => {
    fetchJobs(pageNumber);
  };

  

  return (
    <section>
      {jobs.map((job) => (
        <div key={job.id} className="listing__card">
          <header className="listing__header">
            <h1 className="listing__title">
              {job.title}
              </h1>
            <img className="listing__saved" src={StarSaved} alt="" />
            <p className="listing__company">
              Posted by <span>Koco Media</span>
            </p>
          </header>

          <ul className="listing__items">
            <li>
              <img src={Money} alt="" />
              <b>Salary negotiable</b>
            </li>
            <li>
              <img src={Location} alt="" />
              Heyes, <b>Uxbridge</b>
            </li>
            <li>
              <img src={Timer} alt="" />
              Contract, full-time
            </li>
          </ul>

          <p className="listing__detail">
           {job.description} <b>Read more...</b>
          </p>

          <a href="" className="listing__cta">
            Withdraw application
          </a>
        </div>
      ))}
      <Paginate meta={meta.paginate} onPageChange={handlePageChange}/>
    </section>
  );
}
