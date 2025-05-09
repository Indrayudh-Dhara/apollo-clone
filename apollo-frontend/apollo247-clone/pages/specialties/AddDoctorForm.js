'use client'; 
import { useState , useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const indianCities = [
    "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata",
    "Hyderabad", "Ahmedabad", "Pune", "Jaipur", "Lucknow",
    
  ];

export default function AddDoctorForm({onDoctorAdded}) {
  const [doctor, setDoctor] = useState({
    name: '',
    specialty: '',
    city: '',
    experience: '',
    fees: ''
  });


    useEffect(() => {
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response =  await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/add-doctor`, doctor);
    
      alert('Doctor added successfully!');
      if (onDoctorAdded) onDoctorAdded()
      
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <form className="col g-1"  style={{textAlign:"center"}} onSubmit={handleSubmit}>
      <h3 style={{marginTop:"2rem" , marginBottom:"2rem"}}>Add Doctor</h3>


      <div className="row justify-content-center">
      <div className="col-md-4 mb-3">
    <label for="exampleName" class="form-label">Name</label>
    <input type="text" name='name' value={doctor.name} onChange={handleChange} class="form-control"  required/>
  </div>
  </div>

  <div className="row justify-content-center">
  <div className="col-md-4 mb-3">
    <label htmlForfor="exampleInputSpecialty" className="form-label">Specialty</label>
    <input type="text" name='specialty' value={doctor.specialty} onChange={handleChange} className="form-control"  required/>
  </div>
  </div>

  <div className="row justify-content-center">
  <div className="col-md-2 mb-3">
    <label htmlFor="exampleInputCity" className="form-label">City</label>
    <select name="city" className='form-select' value={doctor.city} onChange={handleChange}>
        <option value="">Select a city</option>
        {indianCities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
  </div>
  </div>

  <div className="row justify-content-center">
  <div className="col-md-3 mb-3">
    <label for="exampleInputExperience" className="form-label" >Experience(years):</label>
    <input type="number" min={0} name='experience' value={doctor.experience} onChange={handleChange} className="form-control"  required/>
  </div>
  </div>


  <div className="row justify-content-center">
  <div className="col-md-4 mb-3">
    <label for="exampleInputEmail1" class="form-label">Fees</label>
    <input type="number" min={0} name='fees' value={doctor.fees} onChange={handleChange} class="form-control"  required/>
  </div >
  </div>

  <div className='col-12 mt-3'>
  <button type="submit"  class="btn btn-outline-success">Add Doctor</button>
  </div>
    </form>
    </div>
  );
}
