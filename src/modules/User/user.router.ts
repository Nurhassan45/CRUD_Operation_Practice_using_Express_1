import { Router } from "express";
import userControllar from "./user.controllar";
import { auth } from "../../middlewire/auth";
import { userRole } from "../../Types/userRole";

const router = Router();
router.post('/',userControllar.postUser);
router.get('/',auth(userRole.admin),userControllar.getUsers);
router.get('/:id',userControllar.getUserById);
router.put('/:id',userControllar.updatedUser);
router.delete('/:id',userControllar.deleteUser);
const userRouter=router;
export default userRouter;