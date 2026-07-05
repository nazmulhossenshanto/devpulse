import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";
import httpStatus from "http-status";

const registerUser = catchAsync(async(req: Request, res:Response)=>{
   const result = await authService.registerUserIntoDB(req.body);
   sendResponse(res, {
    statusCode:  httpStatus.CREATED,
    success: true,
     message: "User registered successfully",
    data: result
   });
 
});

const loginUser = catchAsync(async(req: Request, res: Response)=>{
const result = await authService.loginUserIntoDB(req.body);
sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Login user successfully",
    data: result
})
});



export const authController = {
    registerUser,
    loginUser
}