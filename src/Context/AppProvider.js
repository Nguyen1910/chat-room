import React, { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState();
  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomsCondition = useMemo(
    () => ({
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    }),
    [uid]
  );
  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId),
    [rooms, selectedRoomId]
  );
  const usersCondition = useMemo(
    () => ({
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom?.members,
    }),
    [selectedRoom?.members]
  );
  const members = useFirestore("users", usersCondition);
  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
