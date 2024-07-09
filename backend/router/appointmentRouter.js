import express from "express";
import { deleteApointment, getAllApointment, postAppointment, updateAppointment } from "../controller/appointmentControler.js";
import { isAuthenticated,isPatientAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/post' ,isPatientAuthenticated, postAppointment);
router.get("/getall",isAuthenticated,getAllApointment);
router.put("/update/:id",isAuthenticated,updateAppointment);
router.delete("/delete/:id",isAuthenticated,deleteApointment);

export default router;