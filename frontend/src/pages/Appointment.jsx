/* eslint-disable no-unused-vars */
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function Appointment(){
  
  const [firstName , setFirstName] = useState("")
  const [lastName , setlastName] = useState("")
  const [email , setemail] = useState("")
  const [phone , setphone] = useState("")
  const [gender , setgender] = useState("")
  const [dob , setdob] = useState("")
  const [appointment , setappointment] = useState("")
  const [department , setdepartment] = useState("")
  const [doctorFirstName , setdoctorFirstName] = useState("")
  const [doctorlastName , setdoctorlastName] = useState("")
  const [address , setaddress] = useState("")
  const [hasVisited , sethasVisited] = useState("")

const navigate = useNavigate()
  
const departmentArray = [
  "pediatrics",
  "orthology",
  "cardiology",
  "Neurology",
  "Oncology",
  "RadioLogy",
  "Physical Therepy"
]

const [doctors , setDoctors] = useState([]);
useEffect(()=>{
const fetchDoctors = async () => {
  const {data} = await axios.get(
    "http://localhost:8080/api/v1/user/doctors",{
      withCredentials:true
    }
  );
  setDoctors(data.doctors);
};
fetchDoctors();
},[doctors])

async function handleAppointment(e){
e.prevnetDefault();
try{
const hasVisited = Boolean(hasVisited);
const {data} = await axios.get(
  "http://localhost:8080/api/v1/appointment/post",{

  firstName, 
  lastName, 
  email, 
  phone, 
  gender, 
  dob, 
  appointment_date:appointment, 
  department, 
  doctor_firstName:doctorFirstName, 
  doctor_lastName:doctorlastName, 
  address, 
  hasVisited

  },
{
  withCredentials:true,
  header:{"Content-Type":"application/json"}
});
toast.success(data.message);
navigate("/");
}catch(error) {
toast.error(error.response.data.message)
}
}

return(
  <div className="container form-component register-form">
    <h2>Appointment</h2>
    
    <form onSubmit={handleAppointment}>
        <div>
        <input type="text" value={firstName} placeholder="First-name" onChange={(e) => setFirstName(e.target.value)} />
       <input type="text" value={lastName} placeholder="last-name" onChange={(e) => setlastName(e.target.value)} />
        </div>
        <div>
        <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)} />
       <input type="number" value={phone} placeholder="phone-Number" onChange={(e) => setphone(e.target.value)} />
        </div>
        <div>
        <input
          type="date"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
          placeholder="Date of Birth"
        />
       <select
          value={gender}
          onChange={(e) => setgender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          value={appointment}
          onChange={(e) => setappointment(e.target.value)}
          placeholder="Appointment Date"
        />
        </div>

       <div>

       <select
          value={department}
          onChange={(e) => setdepartment(e.target.value)}
        >

          <option value="">Select Department</option>
          {departmentArray.map((depart , index) => {
            return(
              <option value={depart} key={index}>{depart}</option>
            )
          })}
        </select>

        <select value={doctors} onChange={(e) => setDoctors(e.target.value)

        } disabled={!department}>
          <option value="">
            Select Doctor
          </option>
          {doctors.filter((doctor) =>doctor.doctorDepartment === department).map((doctor , index) => {
            return (
              <option value={`${doctor.firstName} ${doctor.lastName}`} key={index}>
                {doctor.firstName} {doctor.lastName}
              </option>
            )
          })}
        </select>
       </div>
       <div>
  <textarea
    rows="2"
    value={address}
    onChange={(e) => setaddress(e.target.value)}
    placeholder="Address"
  />
</div>

<div style={{
  gap: "10px",
  justifyContent: "flex-end",
  flexDirection: "row",
  display: "flex",
  alignItems: "center" // Aligns the checkbox and text vertically
}}>
  <p style={{ marginBottom: 0, marginRight: "10px" }}>Have you visited before?</p> 
  <input 
    type="checkbox" 
    checked={hasVisited} 
    onChange={(e) => sethasVisited(e.target.checked)} 
    style={{
      flex: "none",
      width: "20px", 
      height: "20px", 
      cursor: "pointer"
    }}
  />
</div>


        <div style={{ justifyContent: "flex-end", alignItems: "center", display: "flex" }}>
          <button type="submit">Book</button>
        </div>
      </form>
  </div>
)
}

export default Appointment