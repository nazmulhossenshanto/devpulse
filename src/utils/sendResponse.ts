
import type { Response } from "express";
import type { IApiResponse } from "../interfaces/apiResponse.js";

 const sendResponse = <T>(res: Response, statusCode: number, data: IApiResponse<T>)=>{
     res.status(statusCode).json(data);
 };

 export default sendResponse;