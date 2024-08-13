export const transFormData = async (data) => {
    const columnMap = new Map();
    const result = [];

    data.forEach((item) => {
        const {
            column_id,
            column_name,
            column_position,
            card_id,
            card_name,
            card_position,
            description,
            end_date,
            priority,
            card_column_id,
            assignees_id, 
            member_names
        } = item;

        const columnIdStr = String(column_id);
        const cardIdStr = card_id != null ? String(card_id) : null; 
        const cardColumnIdStr = String(card_column_id);
        const assigneesIdStr = String(assignees_id);

       
        if (!columnMap.has(columnIdStr)) {
            columnMap.set(columnIdStr, {
                column_id: columnIdStr,
                column_name,
                column_position,
                items: [], 
            });
        }

     
        if (card_id != null) {
            columnMap.get(columnIdStr).items.push({
                card_id: cardIdStr,
                name: card_name,
                card_position,
                description,
                end_date,
                priority,
                card_column_id: cardColumnIdStr,
                assignees_id: assigneesIdStr,
                member_names
            });
        }
    });

    // Collect the column data
    columnMap.forEach((value) => result.push(value));
    return result;
};
