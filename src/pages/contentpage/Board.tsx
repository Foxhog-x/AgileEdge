import { IconButton, Paper } from "@mui/material";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CardOutline } from "../../components/card/CardOutline";

interface Item {
  id: string;
  name: string;
}

interface Store {
  id: string;
  name: string;
  items: Item[];
  tint: number;
}
const DATA: Store[] = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

const Board = () => {
  const [stores, setStores] = useState<Store[]>(DATA);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      destination.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reOrderedStore = [...stores];
      ["walmart", "indigo", "lower"];
      const sourceIndex = source.index;
      const destinatinoIndex = destination.index;
      const [removedStore] = reOrderedStore.splice(sourceIndex, 1);
      console.log(removedStore, "removied store");
      reOrderedStore.splice(destinatinoIndex, 0, removedStore);
      return setStores(reOrderedStore);
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
              {stores.map((store, index) => (
                <Draggable draggableId={store.id} key={store.id} index={index}>
                  {(provided) => (
                    <div
                      key={index}
                      className="min-w-96  p-4"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      /// <reference path="" />
                      ref={provided.innerRef}
                    >
                      <CardOutline {...store} />
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
