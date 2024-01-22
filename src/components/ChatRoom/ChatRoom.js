import React from "react";
import { Col, Row } from "antd";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";

const ChatRoom = () => {
  return (
    <Row style={{ height: "100%" }}>
      <Col xl={6} lg={6} md={6} sm={6} xs={24}>
        <Sidebar />
      </Col>
      <Col xl={18} lg={18} md={18} sm={18} xs={24}>
        <ChatWindow />
      </Col>
    </Row>
  );
};

export default ChatRoom;
