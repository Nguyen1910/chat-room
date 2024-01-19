import { Button, Col, Row } from "antd";
import React from "react";
import { auth, providerEmail, signInWithPopup } from "../../firebase/config";
import { addDocument } from "../../firebase/services";

const Login = () => {
  const handleSignInWithEmail = async () => {
    try {
      const { user, providerId } = await signInWithPopup(auth, providerEmail);
      addDocument("users", {
        displayName: user?.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: providerId,
      });
    } catch (error) {}
  };

  return (
    <Row justify={"center"} style={{ padding: "20px 0" }}>
      <Col span={8}>
        <Button
          style={{ width: "100%", marginBottom: 10 }}
          onClick={handleSignInWithEmail}
        >
          Đăng nhập bằng Gmail
        </Button>
        <Button style={{ width: "100%" }} onClick={() => auth.signOut()}>
          Đăng nhập bằng Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
