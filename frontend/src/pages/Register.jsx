import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register(){

  const { setAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const [firstName , setFirstName] = useState("")
  const [lastName , setlastName] = useState("")
  const [email , setemail] = useState("")
  const [phone , setphone] = useState("")
  const [dob , setdob] = useState("")
  const [gender , setgender] = useState("")
  const [password , setpassword] = useState("")
  

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/patient/registration", {
        firstName,lastName, email,phone,dob,gender, password, 
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      toast.success(response.data.message);
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  
  }

  return(
    <div className="container form-component register-form">

<h2>Sign up</h2>
      <p>Please Register to continue</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat soluta, impedit quidem libero laboriosam ratione eligendi vel,</p>
      <form onSubmit={handleRegister}>
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
        </div>

        <div>
        <input type="password" value={password} placeholder="password" onChange={(e) => setpassword(e.target.value)} />
        </div>
        <div style={{
          gap: "10px",
          justifyContent: "flex-end",
          flexDirection: "row",
          display: "flex",
        }}>
          <p style={{ marginBottom: "none" }}>Already Registered?</p>
          <Link to="/login" style={{ textDecoration: "none", alignItems: "center" }}>
            Login Now
          </Link>
        </div>
        <div style={{ justifyContent: "flex-end", alignItems: "center", display: "flex" }}>
          <button type="submit">Register</button>
        </div>
      </form>

    </div>
  )
}
export default Register;