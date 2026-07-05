import type { Response } from "express";
import type { TResponseData } from "../interfaces/apiResponse.js";


const sendResponse = <T>(
  res: Response,
  data: TResponseData<T>
) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;