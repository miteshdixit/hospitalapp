import express from "express";
import {addNewAdmin, addNewDoctor, getAllDoctor, getUserDetail, login, logutAdmin, logutPatient, patientRegister} from "../controller/userControler.js";
import { isPatientAuthenticated , isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/patient/registration' , patientRegister);
router.post('/login' , login);
router.post('/admin/newadmin',isAuthenticated, addNewAdmin);
router.get('/doctors',getAllDoctor);
router.get('/patient/me',isPatientAuthenticated,getUserDetail);
router.get('/admin/me',isAuthenticated,getUserDetail);
router.get('/admin/logout',isAuthenticated,logutAdmin);
router.get('/patient/logout',isPatientAuthenticated,logutPatient);
router.post('/doctor/addnew',isAuthenticated,addNewDoctor);


export default router;