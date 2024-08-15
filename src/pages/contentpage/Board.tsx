import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CardOutline } from "../../components/card/CardOutline";
import { useParams } from "react-router-dom";
import { useFetchProjectDetails } from "../../hooks/projectCustomhook/useFetchProjectDetails";
import { useManageIdStore } from "../../store/useManageIdStore";
import { useEffect } from "react";
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

  const internalCardUpdate = (columnId, sourcecard_Id, destinationCard_Id) => {
    try {
      axiosInstance.post(urls.moveCardInternal, {
        columnId,
        sourcecard_Id,
        destinationCard_Id,
      });
      addToast("Card moved", "success");
    } catch (error) {
      console.log(error);
      addToast(error.message, "error");
    }
  };

  const externalCardUpdate = (
    sourceCardId,
    destinationCardId,
    destinationColumn_Id
  ) => {
    try {
      axiosInstance.post(urls.moveCardExternal, {
        sourceCardId,
        destinationCardId,
        destinationColumn_Id,
      });
      addToast("updated", "success");
    } catch (error) {
      console.log(error);
      addToast("error occured", "error");
    }
  };

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (
      source.droppableId === destination.droppableId &&
      source.index !== destination.index &&
      type === "column"
    ) {
      const reorderCard = [...sortedData];
      const sourceColumn = reorderCard.filter((value) => {
        if (value.column_id === source.droppableId) {
          return value;
        }
      });

      const sourceIndex = source.index;
      const destinatinoIndex = destination.index;
      const sourceCardId = sourceColumn[0].items[sourceIndex].card_id;
      const destinationCardId = sourceColumn[0].items[destinatinoIndex].card_id;
      const [removedCard] = sourceColumn[0].items.splice(sourceIndex, 1);
      sourceColumn[0].items.splice(destinatinoIndex, 0, removedCard);
      internalCardUpdate(source.droppableId, sourceCardId, destinationCardId);
    }
    if (type === "column") {
      if (source.droppableId !== destination.droppableId) {
        const sourceIndex = source.index;
        const destinationIndex = destination.index;
        const reorderCard = [...sortedData];
        const sourceColumn = reorderCard.filter((value) => {
          if (value.column_id === source.droppableId) {
            return value;
          }
        });
        const destinationColumn = reorderCard.filter((value) => {
          if (value.column_id === destination.droppableId) {
            return value;
          }
        });
        const destinationColumn_Id = destination.droppableId;
        const sourceCardId = sourceColumn[0].items[sourceIndex].card_id;
        if (destinationColumn[0].items.length - 1 < destinationIndex) {
          externalCardUpdate(sourceCardId, null, destinationColumn_Id);
        } else {
          const destinationCardId =
            destinationColumn[0].items[destinationIndex].card_id;
          externalCardUpdate(
            sourceCardId,
            destinationCardId,
            destinationColumn_Id
          );
        }
        const [removedCard] = sourceColumn[0].items.splice(sourceIndex, 1);
        destinationColumn[0].items.splice(destinationIndex, 0, removedCard);
      }
    }

    if (type === "group") {
      const reorderColumns = [...sortedData];
      ["walmart", "indigo", "lower"];
      const sourceIndex = source.index;
      const destinatinoIndex = destination.index;
      const [removedStore] = reorderColumns.splice(sourceIndex, 1);
      reorderColumns.splice(destinatinoIndex, 0, removedStore);
      updateDatabase(sourceIndex, destinatinoIndex);
      return setSortedData(reorderColumns);
    }
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
