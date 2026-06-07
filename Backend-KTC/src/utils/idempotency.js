// utils/idempotency.js

export const checkIdempotency = async (conn, request_id) => {
  const [rows] = await conn.query(
    `SELECT docket_no FROM dockets WHERE request_id = ?`,
    [request_id]
  );

  return rows.length > 0 ? rows[0] : null;
};