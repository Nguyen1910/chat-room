import { Button, Col, Row } from "antd";
import React from "react";
import {
  auth,
  db,
  doc,
  providerEmail,
  signInWithPopup,
} from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";

const Login = () => {
  const handleSignInWithEmail = async () => {
    try {
      const { user, providerId } = await signInWithPopup(auth, providerEmail);
      const userRef = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const userSnap = await getDocs(userRef);

      if (userSnap.size === 0) {
        addDocument("users", {
          displayName: user?.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: providerId,
          keyWords: generateKeywords(user.displayName),
        });
      }
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
