

'use client'; 
import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddDoctorForm from './AddDoctorForm';
import 'bootstrap/dist/css/bootstrap.min.css';





export default function DestinationPage() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ city: '', experience: '' });
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const indianCities = [
    "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
   
  ];

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const fetchDoctors = async () => {
    const { data } =  await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/list-doctor-with-filter`, {
      params: { ...filters, page, limit: 10 }
    });
    console.log('Doctors:', data); 
    setDoctors(data.doctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  return (
    <>
      <Head>
        <title>General Physicians in India | Apollo 24/7 Clone</title>
        <meta name="description" content="Find top General Physicians in India. Filter by city and experience." />
      </Head>
      <div  style={{height:"90px" , position:"sticky", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <header style={{ marginLeft:"100px", marginBottom:"1rem" , marginTop:"1rem"}}>
        <div style={{display:"flex" , alignItems:"center"}}>

        <img src='https://images.freekaamaal.com/post_images/1622885991.webp' width={"150px"}></img>
        <input style={{maxWidth:"500px" , maxHeight:"50px" , marginLeft:"15rem"}}  className="form-control" type="search" placeholder="Search" />

        </div>
        
      </header>
      </div>

      <div style={{textAlign:"center"}}>
      <button style={{marginTop:"1rem"}} className='btn btn-outline-success' onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add Doctor'}
      </button>

      {showForm && <AddDoctorForm onDoctorAdded={() => {
  fetchDoctors();           // ⬅️ Re-fetch the doctor list
  setShowForm(false);       // Optional: Hide form after submission
}}  />}
    </div>
     
      <section>
        <div className='row' style={{display:"flex", justifyContent:"center"}}>
          <div className="col-3 mb-3" style={{textAlign:"center"}}>
            <label htmlFor="filterCity" className="form-label">Filter by City</label>
            <select
                    id="filterCity"
                    className="form-select"
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                >
                    <option value="">All Cities</option>
                    {indianCities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                    ))}
            </select>
        </div>
        <div className="col-2 mb-3" style={{textAlign:"center"}}>
          <label className='form-label'>Experience (min):</label>
          <input type="number" className='form-control' value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })} />
        </div>

        <div className="container" style={{display:"flex" , alignItems:"center" , flexDirection:"column"}}>
  {doctors.map((doc) => (
    <div className="card  w-75 mb-3"  key={doc._id}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={doc.image ||" /doctor.jpg"} 
            className="img-fluid rounded-start"
            alt={doc.name}
          />
        </div>
        <div className=" col-md-8">
          <div className="card-body">
            <h5 className="card-title">Dr. {doc.name}</h5>
            <p className="card-text" style={{opacity:"0.6"}}>
              <strong>{doc.specialty}</strong> <br />
              <strong style={{fontSize:"12px", color:"purple"}}>{doc.experience} YEARS OF EXPERIENCE</strong><br />
              <strong>{doc.city}</strong><br />
              
            </p> 
          </div>
          <div style={{display:"flex"}}>
          <button style={{marginLeft:"50px"}} type="button" className="btn btn-outline-primary w-50"><h6>Consult Online</h6><p>Avaliable in some minutes</p></button>
           <strong style={{marginLeft:"40px" , fontSize:"25px"}}>&#8377;{doc.fees}</strong>
          </div>
        </div>
       
      </div>
    </div>
  ))}
</div>

   
</div>
<div style={{display:"flex", justifyContent:"center"}}>
<button className='btn btn-outline-secondary' onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Prev</button>
&nbsp; &nbsp;
<button className='btn btn-outline-secondary' onClick={() => setPage((prev) => prev + 1)}>Next</button>
</div>


      </section>
    </>
  );
}
