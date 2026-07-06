import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import { issueService } from "./issues.service.js";
import sendResponse from "../../utils/sendResponse.js";
import httpStatus from "http-status";

const createIssue = catchAsync(async(req: Request, res:Response)=>{

    const reporterId = req.user!.id;
    const result = await issueService.createIssueIntoDB(req.body, reporterId);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Issue created successfully", 
        data: result
    })

});

const getAllIssues = catchAsync(
  async (req: Request, res: Response) => {

    const result =
      await issueService.getAllIssuesFromDB(req.query);

    sendResponse(
      res,
     
      {
        statusCode:  httpStatus.OK,
        success: true,
        message: "Issues retrived successfully",
        data: result,
      }
    );

  }
);

const getSingleIssue= catchAsync(async(req:Request, res:Response)=>{
  const id = Number(req.params.id);
  const results = await issueService.getSingleIssueFromDB(id);
     sendResponse(
      res,
     
      {
        statusCode:  httpStatus.OK,
        success: true,
        message: "Issue retrived successfully",
        data: results,
      }
    );
})


export const issueController = {
    createIssue,
    getAllIssues,
    getSingleIssue
}