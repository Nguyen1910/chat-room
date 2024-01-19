import { Col, Row } from "antd";
import React from "react";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";

const Sidebar = () => {
  return (
    <div
      style={{
        background: "#3f0e40",
        color: "white",
        height: "100vh",
      }}
    >
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </div>
  );
};

export default Sidebar;
