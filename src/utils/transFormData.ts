export const transFormData = async (data: any) => {
  const columnMap = new Map();
  const result:any = [];

  data.forEach((item:any) => {
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
      assignees,
    } = item;

    const columnIdStr = String(column_id);
    const cardIdStr = card_id != null ? String(card_id) : null;
    const cardColumnIdStr = String(card_column_id);
    

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
        assignees 
      });
    }
  });

  // Collect the column data
  columnMap.forEach((value) => result.push(value));
 
  return result;
};
