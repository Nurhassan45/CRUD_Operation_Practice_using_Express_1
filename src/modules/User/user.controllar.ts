import type { Request, Response } from "express";
import { userService } from "./user.service";
import { ResMsg } from "../../Utility/ResMsg";

const postUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.postUserIntoDB(req.body);
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation');
        ResMsg(res, 200, true, 'Successful Operation',result.rows[0]);
    } catch (error: any) {
        ResMsg(res, 400, false, error.message);
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        console.log('req from getUser',req.user);
        const result = await userService.getUserFromDB();
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation');
        ResMsg(res, 200, true, 'Successful Operation', result.rows);
    } catch (error: any) {
        ResMsg(res, 400, false, error.message);
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const numberId = Number(req.params.id);
        const result = await userService.getUserById(numberId);
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation');
        ResMsg(res, 200, true, 'Successful Operation', result.rows[0]);
    } catch (error: any) {
        ResMsg(res, 400, false, error.message);
    }
}

const updatedUser = async (req: Request, res: Response) => {
    try {
        const numberId = Number(req.params.id);
        const result = await userService.updateUserById(numberId, req.body);
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation');
        ResMsg(res, 200, true, 'Successful Operation', result.rows[0]);
    } catch (error: any) {
        ResMsg(res, 400, false, error.message);

    }
}


const deleteUser = async (req: Request, res: Response) => {
    try {
        const numberId = Number(req.params.id);
        const result = await userService.deleteUserById(numberId);
        if (result.rowCount === 0) ResMsg(res, 400, false, 'Unsuccessful Operation');
        ResMsg(res, 200, true, 'Successful Operation', result.rows[0]);
    } catch (error: any) {
        ResMsg(res, 400, false, error.message);
    }

}
const userControllar = {
    postUser,
    getUsers,
    getUserById,
    updatedUser,
    deleteUser
}
export default userControllar;