import React, {useState, useEffect, Fragment} from 'react';
import './listings.scss';
import Paginate from '../paginate/paginate';
import { StarSaved, Money, Location, Timer } from '../images';
import { useApi } from '../../hooks/useApi';



const MAX_PER_PAGE = 3
const MAX_LENGTH_CHARS = 200;

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

    // update each job is to include isTruncated
    const updatedJobs = entries.map((job) => ({
      ...job,
      isTruncated: true
    }));

    // Set the received job listings and metadata to the state variables
    setJobs(updatedJobs);
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
        'populate[job_types]': true,
        'start': (page -1 ) * MAX_PER_PAGE, 
        'limit': MAX_PER_PAGE, 
      },
    });
  };


  const truncate =  (text, jobId) => {
    const job = jobs.find((job) => job.id === jobId);

    const shouldTruncate = text.length > MAX_LENGTH_CHARS && job?.isTruncated;
    if (!shouldTruncate) return text;
    const truncated = text.slice(0, MAX_LENGTH_CHARS);
    //return elipsis if text is truncated
    return truncated + "..."

  }

  const toggleTruncate = (jobId) => {
    const updatedJobs = jobs.map(job => {
      if (job.id === jobId) {
        return { ...job,isTruncated: !job.isTruncated}
        }
        return job;
    });

    setJobs(updatedJobs);
  }
  
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
              Posted by <span>{job.company.name}</span>
            </p>
          </header>

          <ul className="listing__items">
            <li>
              <img src={Money} alt="" />
              <b>Salary {job.salaryType}</b>
            </li>
            <li>
              <img src={Location} alt="" />
              Heyes, <b>{job.location}</b>
            </li>
            <li>
              <img src={Timer} alt="" />
              {job.job_types.map((type, index, array) => (
                <Fragment key={type.id}>
                <span>{type.title}</span> 
                {index !== array.length - 1 && <span>, </span>}
                </Fragment>
              ))}
            </li>
          </ul>

          <p className="listing__detail">
           {truncate(job.description, job.id)} 
           <a onClick={() => toggleTruncate(job.id)}>
           <b>{job.isTruncated ? 'Read more' : 'Read less'}</b>
           </a>
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
