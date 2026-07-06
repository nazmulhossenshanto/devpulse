import { pool } from "../../db/index.js";
import type { ICreateIssue, IssueQuery } from "./issues.types.js";

const createIssueIntoDB = async (payLoad: ICreateIssue, reporterId: number) => {
  const { title, description, type } = payLoad;
  if (title.length > 150) {
    throw new Error("Title maximum length is 150");
  }
  if (description.length < 20) {
    throw new Error("Description minimum length is 20 characters");
  }
  if (type !== "bug" && type !== "feature_request") {
    throw new Error("Invalid issue type");
  }
  const result = await pool.query(
    `
   INSERT INTO issues(title, description, type, reporter_id)
   VALUES($1,$2,$3,$4)
   RETURNING id, title, description, type, status, reporter_id, created_at, updated_at 
    `,
    [title, description, type, reporterId],
  );
  return result.rows[0];
};

const getAllIssuesFromDB = async (query: IssueQuery) => {
  const { sort, type, status } = query;
  let sql = `SELECT id, title, description, type, status, reporter_id, created_at, updated_at FROM issues`;
  const conditions: string[] = [];
  const values: (string | number)[] = [];
  if (type) {
    values.push(type);
    conditions.push(`
            type=$${values.length}`);
  }

  if (status) {
    values.push(status);

    conditions.push(`status=$${values.length}`);
  }

  if (conditions.length > 0) {
    sql += `
    WHERE
    ${conditions.join(" AND ")}
  `;
  }

  if (sort === "oldest") {
    sql += `
    ORDER BY created_at ASC
  `;
  } else {
    sql += `
    ORDER BY created_at DESC
  `;
  }

  const result = await pool.query(sql, values);

  return result.rows;
};

const getSingleIssueFromDB = async (id: number) => {
  const issueResult = await pool.query(
    `
    SELECT
      id,
      title,
      description,
      type,
      status,
      reporter_id,
      created_at,
      updated_at
    FROM issues
    WHERE id=$1
    `,
    [id],
  );

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

 
  const reporterResult = await pool.query(
    `
    SELECT
      id,
      name,
      role
    FROM users
    WHERE id=$1
    `,
    [issue.reporter_id],
  );

  if (reporterResult.rows.length === 0) {
    throw new Error("Reporter not found");
  }

  return {
    id: issue.id,

    title: issue.title,

    description: issue.description,

    type: issue.type,

    status: issue.status,

    reporter: reporterResult.rows[0],

    created_at: issue.created_at,

    updated_at: issue.updated_at,
  };
};

export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
};
