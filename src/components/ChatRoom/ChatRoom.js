import React from "react";
import { Col, Row } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const ChatRoom = () => {
  return (
    <Row style={{ height: "100%" }}>
      <Col span={6}>
        <Sidebar />
      </Col>
      <Col span={18}>
        <ChatWindow />
      </Col>
    </Row>
  );
};

export default ChatRoom;
