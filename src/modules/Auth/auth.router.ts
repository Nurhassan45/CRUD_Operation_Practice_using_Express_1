import { Router } from "express";
import authControllar from "./auth.controllar";

const router=Router();
router.post('/',authControllar.loginUser);
router.post('/refreshToken',authControllar.refreshToken);
export const authRouter=router;