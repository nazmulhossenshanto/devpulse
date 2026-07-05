import { pool } from "../../db/index.js";
import type { ICreateIssue } from "./issues.types.js";

const createIssueIntoDB = async(payLoad: ICreateIssue, reporterId: number)=>{
const {title, description, type} = payLoad;
if(title.length > 150){
    throw new Error("Title maximum length is 150");
};
if(type !== "bug" && type !== "feature_request"){
    throw new Error("Invalid issue type")
}
const result = await pool.query(`
   INSERT INTO issues(title, description, type, reporter_id)
   VALUES($1,$2,$3,$4)
   RETURNING id, title, description, type, status, reporter_id, created_at, updated_at 
    `, [title, description, type, reporterId]);
    return result.rows[0];

};

const getAllIssuesFromDB = async (query: any)=>{
    const {sort, type, status} = query;
    let sql = `SELECT id, title, description, type, status, reporter_id, created_at, updated_at FROM issues`;
    const conditions: string[]  = [];
    const values: string[] = [];
    if(type){
        values.push(type);
        conditions.push(`
            type=$${values.length}`
        );

    };

    if (status) {

  values.push(status);

  conditions.push(
    `status=$${values.length}`
  );

};

if (conditions.length > 0) {

  sql += `
    WHERE
    ${conditions.join(" AND ")}
  `;

};

if (sort === "oldest") {

  sql += `
    ORDER BY created_at ASC
  `;

} else {

  sql += `
    ORDER BY created_at DESC
  `;

};

const result =
await pool.query(
sql,
values
);

return result.rows;


}


export const issueService = {
    createIssueIntoDB,
    getAllIssuesFromDB
}