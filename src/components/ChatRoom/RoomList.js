import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import useFirestore from "../../hooks/useFirestore";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";

const PanelStyled = styled(Collapse.Panel)`
  &&& {
    .ant-collapse-header,
    span {
      color: white;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList = () => {
  const { rooms, setIsAddRoomVisible, setSelectedRoomId, selectedRoom } =
    useContext(AppContext);

  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };
  return (
    <Collapse defaultActiveKey={1} ghost style={{}}>
      <PanelStyled
        header={"Danh sách các phòng"}
        key={1}
        style={{ color: "white" }}
      >
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <Button
          className="add-room"
          icon={<PlusSquareOutlined />}
          type="text"
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;
