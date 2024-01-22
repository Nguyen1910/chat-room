import { Avatar, Button, Image, Typography } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { CloseCircleOutlined, FileTextOutlined } from "@ant-design/icons";

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  max-width: 80%;

  .content {
    background: #54adff;
    padding: 5px 10px;
    border-radius: 15px;
  }

  &.wrapper_my_message {
    display: flex;
    flex-direction: column;
    align-items: end;

    .my_message_info {
      display: none;
    }

    .content {
      display: block;
    }
  }

  &.wrapper_message {
    .content {
      margin-top: 2px;
      display: inline-block;
      background: #ebe8e8;
    }
  }
  .my_message_info {
    text-align: end;
  }

  .author {
    margin-left: 5px;
    font-weight: bold;
    font-size: 15px;
  }

  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
`;

const Message = ({
  text,
  displayName,
  createdAt,
  photoURL,
  style,
  uid,
  type,
  url,
}) => {
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [text]);
  return (
    <WrapperStyled
      className={uid === user.uid ? "wrapper_my_message" : "wrapper_message"}
    >
      <div className={uid === user.uid && "my_message_info"}>
        <Avatar size={"small"} src={photoURL}></Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">{createdAt}</Typography.Text>
      </div>
      {type === "text" && (
        <Typography.Text className="content">{text}</Typography.Text>
      )}
      {type === "images" && (
        <Image
          src={url}
          preview={false}
          onClick={() => window.open(url, "_blank")}
        />
      )}
      {type === "files" && (
        <Button
          style={{ width: 100, height: 100, background: "#f0f0f0" }}
          type="text"
          onClick={() => window.open(url, "_blank")}
          icon={<FileTextOutlined style={{ fontSize: 50 }} />}
        ></Button>
      )}
      <div ref={messagesEndRef} />
    </WrapperStyled>
  );
};

export default Message;
