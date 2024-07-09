import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import AddnewDoctor from "./Components/AddnewDoctor";
import AddNewAdmin from "./Components/AddNewAdmin";
import Doctors from "./Components/Doctor";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import Sidebar from "./Components/Sidebar";

function App(){

  const { isAuthenticated, setAuthenticated,setUser} = useContext(Context);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/admin/me",{
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
     <Sidebar/>
       <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/doctor" element={<Doctors/>}/>
        <Route path="/addnewadmin" element={<AddNewAdmin/>}/>
        <Route path="/addnewdoctor" element={<AddnewDoctor/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/messages" element={<Messages/>}/>
      </Routes>
    </BrowserRouter>
    </>

  )
}

export default App