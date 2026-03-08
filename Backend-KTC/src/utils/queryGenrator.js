export const buildInsertQuery = (table, data) => {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => "?").join(",");
    const query = `
        INSERT INTO ${table}
        (${columns.join(",")})
        VALUES (${placeholders})
    `;
    return { query, values };
};

export const buildUpdateQuery = (table, data, whereField) => {

    const columns = Object.keys(data);
    const values = Object.values(data);

    const setClause = columns.map(col => `${col} = ?`).join(",");

    const query = `
        UPDATE ${table}
        SET ${setClause}
        WHERE ${whereField} = ?
    `;

    return { query, values };
};