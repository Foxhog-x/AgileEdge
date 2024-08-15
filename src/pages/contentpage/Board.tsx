import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CardOutline } from "../../components/card/CardOutline";
import { useParams } from "react-router-dom";
import { useFetchProjectDetails } from "../../hooks/projectCustomhook/useFetchProjectDetails";
import { useManageIdStore } from "../../store/useManageIdStore";
import { useEffect } from "react";
import CreateTaskColumn from "../../components/formcontainer/component/CreateTaskColumn";
import useCustomAxios from "../../services/apiServices/customAxios/customAxios";
import { urls } from "../../services/apiServices/urls/urls";
import { useToastStore } from "../../store/useToastStore";

const Board = () => {
  const axiosInstance = useCustomAxios();
  const { addToast } = useToastStore();
  const { boardId } = useParams<{ boardId: string }>();
  const { saveBoardId } = useManageIdStore();
  const { sortedData, setSortedData } = useFetchProjectDetails({
    boardId,
  });

  useEffect(() => {
    saveBoardId(boardId);
  }, [boardId]);
  const updateDatabase = async (sourceIndex, destinatinationIndex) => {
    const sourceColumn_Id = sortedData[sourceIndex]?.column_id;
    const destinationColumn_Id = sortedData[destinatinationIndex]?.column_id;

    try {
      await axiosInstance.post(urls.moveColumn, {
        data: {
          board_Id: boardId,
          sourceColumn_Id: sourceColumn_Id,
          destinationColumn_Id: destinationColumn_Id,
        },
      });
      addToast("Updated Successfully", "success");
    } catch (error) {
      console.log(error);
      addToast(error.message, "error");
    }
  };
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
      updateDatabase(sourceIndex, destinatinoIndex);
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
              className="md:flex"
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
                      className="min-w-96 p-4"
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
