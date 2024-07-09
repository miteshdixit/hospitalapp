import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./main";

function App() {

  const { isAuthenticated, setAuthenticated,setUser} = useContext(Context);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/patient/me",{
          withCredentials:true
        });
        setAuthenticated(true);
        setUser(response.data.user);
      } catch(error) {
        setAuthenticated(false);
        setUser({});
      }
    }
    fetchUser();
  },[isAuthenticated])
  return (
    <>
      <BrowserRouter>
      <Navbar/>s
      <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="about" element = {<AboutUs/>}/>
      <Route path="login" element = {<Login/>}/>
      <Route path="register" element = {<Register/>}/>
      <Route path="appointment" element = {<Appointment/>}/>
      </Routes>
      <ToastContainer position = "top-center" />
      </BrowserRouter>
    </>
  );
}

export default App; 