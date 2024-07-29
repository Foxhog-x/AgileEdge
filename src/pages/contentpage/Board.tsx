import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "../../components/column";
import { Box, Card, Icon, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardOutline from "../../components/card/CardOutline";
const Data = [
  { id: "col1", name: "Todo", items: [{ id: 1, name: "doing something" }] },
  {
    id: "col2",
    name: "Doing",
    items: [{ id: 2, name: "doing something extra" }],
  },
  {
    id: "col3",
    name: "Done",
    items: [{ id: 3, name: "doing something extra" }],
  },
];
export default function Board() {
  const [stores, setStores] = useState(Data);
  const handleDragEnd = (results: any) => {
    const { destination, source } = results;
    console.log({ destination: destination, source: source });
    const copyStore = [...stores];
    const removedSource = copyStore.splice(source.index, 1);
    console.log(removedSource, "copy");
  };
  return (
    <Box>
      <img src="" alt="alt" />
      <div className="flex flex-col h-full shadow-lg p-4 ">
        <img src="" alt="" />
        <DragDropContext onDragEnd={handleDragEnd}>
          <div>
            <Droppable droppableId="Root" direction="horizontal">
              {(provided) => (
                <div
                  className="flex gap-2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {stores.map((store, index) => (
                    <Draggable
                      draggableId={store.id}
                      key={store.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="border"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div className="flex justify-between items-center p-2">
                            <h3>{store.name}</h3>
                            <IconButton>
                              <AddIcon />
                            </IconButton>
                          </div>
                          <div className="flex flex-col">
                            <CardOutline />
                          </div>
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
      </div>
    </Box>
  );
}
