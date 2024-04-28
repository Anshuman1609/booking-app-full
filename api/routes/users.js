import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Hello user, you are logged in / token is verified");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Hello user, you are logged in and you can delete your account / token is verified");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Hello Admin, you are logged in and you can delete all account");
// });

//Update User
router.put("/:id", verifyUser, updateUser)

//Delete User
router.delete("/:id", verifyUser, deleteUser)

//Get User
router.get("/:id", verifyUser, getUser)

//Get All Users
router.get("/", verifyAdmin, getUsers)


export default router;