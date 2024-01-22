import { Button, Col, Drawer, Grid, Row } from "antd";
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import RoomList from "./RoomList";
import { MenuUnfoldOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;

const Sidebar = () => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const screens = useBreakpoint();
  return (
    <>
      {screens.xs ? (
        <>
          <Button
            type="primary"
            onClick={() => setIsShowDrawer(true)}
            style={{ background: "#3f0e40" }}
          >
            <MenuUnfoldOutlined />
          </Button>
          <Drawer
            style={{ background: "#3f0e40" }}
            onClose={() => setIsShowDrawer(false)}
            open={isShowDrawer}
          >
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
          </Drawer>
        </>
      ) : (
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
      )}
    </>
  );
};

export default Sidebar;
