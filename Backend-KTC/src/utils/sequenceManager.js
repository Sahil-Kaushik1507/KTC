
export const getSequenceWithRowLock = async (connection, sequence_name) => {
    const [seqRows] = await connection.query(
        `SELECT next_number
            FROM sequence_master
            WHERE sequence_name = ?
            FOR UPDATE`,
        [sequence_name]
    );

    if (seqRows.length === 0) {
        throw new AppError(
            `Sequence ${sequence_name} not found`,
            404
        );
    }

    const next_number = seqRows[0].next_number;
    return next_number;
}


export const addOneToSequenceWithRowLock = async (connection, sequence_name) => {
    await connection.query(
        `UPDATE sequence_master
          SET next_number = next_number + 1
          WHERE sequence_name = ?`,
        [sequence_name]
    );

    return true;

}
