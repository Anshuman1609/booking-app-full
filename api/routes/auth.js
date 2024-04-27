import express from "express";
import { register } from "../controllers/auth";

const router = express.Router();

// router.get("/", (req, res) =>{
//     res.send("Hello This is auth endpoint");
// });


router.get("/register", register);

export default router;
