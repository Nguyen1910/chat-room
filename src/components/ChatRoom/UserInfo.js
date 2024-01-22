import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Flex, Grid, Row, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

const UserInfo = () => {
  const {
    user: { photoURL, displayName },
  } = useContext(AuthContext);

  return (
    <Row
      justify="space-between"
      style={{
        borderBottom: "1px solid rgba(82, 38, 83)",
        padding: "12px 16px",
      }}
    >
      <Col xl={16} lg={12} md={18}>
        <Flex align="center" gap={10}>
          <Avatar icon={<UserOutlined />} src={photoURL}>
            {photoURL ? "" : displayName?.charAt(0)?.toUppercase()}
          </Avatar>
          <Typography.Text style={{ color: "white" }}>
            {displayName}
          </Typography.Text>
        </Flex>
      </Col>
      <Col xl={8} lg={8} md={0} sm={0} xs={0}>
        <Button ghost onClick={() => auth.signOut()}>
          Đăng xuất
        </Button>
      </Col>
      <Col xl={0} lg={0} md={4}>
        <Button
          type="text"
          onClick={() => auth.signOut()}
          icon={<LogoutOutlined style={{ fontSize: 14, color: "white" }} />}
        ></Button>
      </Col>
    </Row>
  );
};

export default UserInfo;
