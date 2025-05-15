import express from 'express';

const router =express.Router();


//import controller
import * as userController from '../controller/userController.js';

router.post("/save",userController.save);
router.post("/login",userController.login);
router.get("/fetch",userController.fetch);
router.patch("/update",userController.update);
router.delete("/delete",userController.deleteUser);
router.get("/faculty", userController.getAllFaculty); // Added faculty route

export default router;