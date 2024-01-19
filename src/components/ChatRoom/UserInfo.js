import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";

const UserInfo = () => {
  const {
    user: { photoURL, displayName },
  } = useContext(AuthContext);

  return (
    <Flex
      justify="space-between"
      style={{
        borderBottom: "1px solid rgba(82, 38, 83)",
        padding: "12px 16px",
      }}
    >
      <Flex align="center" gap={10}>
        <Avatar icon={<UserOutlined />} src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUppercase()}
        </Avatar>
        <Typography.Text style={{ color: "white" }}>
          {displayName}
        </Typography.Text>
      </Flex>
      <Button ghost onClick={() => auth.signOut()}>
        Đăng xuất
      </Button>
    </Flex>
  );
};

export default UserInfo;
