import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CardOutline } from "../../components/card/CardOutline";
import { useParams } from "react-router-dom";
import { useFetchProjectDetails } from "../../hooks/projectCustomhook/useFetchProjectDetails";

const Board = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const { sortedData, setSortedData } = useFetchProjectDetails({
    boardId,
  });

  console.log(sortedData);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      destination.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderColumns = [...sortedData];
      ["walmart", "indigo", "lower"];
      const sourceIndex = source.index;
      const destinatinoIndex = destination.index;
      const [removedStore] = reorderColumns.splice(sourceIndex, 1);
      console.log(removedStore, "removied store");
      reorderColumns.splice(destinatinoIndex, 0, removedStore);
      return setSortedData(reorderColumns);
    }

    console.log({ destination, source }, "console");
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div>
        <Droppable droppableId={"1"} direction="horizontal" type="group">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="md:flex container"
              style={{
                border: snapshot.isDraggingOver ? "1px solid black" : "",
                gap: 10,
              }}
            >
              {sortedData.map((data, index) => (
                <Draggable
                  draggableId={data.column_id}
                  key={data.column_id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      key={index}
                      className="min-w-96  p-4"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      /// <reference path="" />
                      ref={provided.innerRef}
                    >
                      <CardOutline {...data} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
