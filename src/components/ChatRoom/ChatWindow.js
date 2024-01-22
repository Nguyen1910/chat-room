import {
  CloseCircleOutlined,
  FileTextOutlined,
  UploadOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Flex,
  Form,
  Image,
  Input,
  Tooltip,
  Upload,
  message,
} from "antd";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument, uploadFile } from "../../firebase/services";
import useFirestore from "../../hooks/useFirestore";
import moment from "moment";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 16px 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      font-weight: bold;
    }

    &__desc {
      font-size: 12px;
    }
  }
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 12px 12px 20px;
  justify-content: flex-end;

  .wrapper_file {
    position: relative;
    height: 80px;

    & .ant-image {
      height: 100%;
      & img {
        height: 100%;
      }
    }
  }

  .btn_remove_file {
    padding: 0;
    width: auto;
    height: auto;

    position: absolute;
    top: 0;
    right: 0;
    color: black;
  }
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 6px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  .my__message {
    display: flex;
    flex-direction: column;
    align-items: end;
  }

  .another_massage {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

const ChatWindow = () => {
  const [form] = Form.useForm();
  const { members, selectedRoom, setIsInviteMemberVisible, selectedRoomId } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);

  const [inputValue, setInputValue] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => {
      form.resetFields(["message"]);
    };
  }, []);

  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoomId,
    }),
    [selectedRoomId]
  );
  const messages = useFirestore("messages", condition);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = async () => {
    let fileList = await Promise.all(
      files.map(async (file) => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
          return await uploadFile(file.file, "images");
        }
        return await uploadFile(file.file, "files");
      })
    );

    if (inputValue) {
      addDocument("messages", {
        text: inputValue,
        uid,
        displayName,
        photoURL,
        roomId: selectedRoomId,
        displayName,
        type: "text",
      });
    }

    if (fileList?.length) {
      await Promise.all(
        fileList.map(
          async (file) =>
            await addDocument("messages", {
              uid,
              displayName,
              photoURL,
              roomId: selectedRoomId,
              displayName,
              type: file.type,
              url: file.url,
            })
        )
      );
    }
    setFiles([]);
    form.resetFields(["message"]);
  };

  const handleUpLoadFile = (info) => {
    if (info.file.status !== "uploading") {
      if (info.file.type.includes("image")) {
        setFiles([
          ...files,
          {
            preview: URL.createObjectURL(info.file.originFileObj),
            file: info.file.originFileObj,
          },
        ]);
      } else {
        setFiles([
          ...files,
          {
            file: info.file.originFileObj,
          },
        ]);
      }
    }

    // await uploadFile(info.file.originFileObj, "images");
  };

  const handleRemoveFile = (index) => {
    if (files[index]?.preview) {
      URL.revokeObjectURL(files[index].preview);
    }
    files.splice(index, 1);
    setFiles([...files]);
  };

  return (
    <WrapperStyled>
      {selectedRoomId ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom?.name}</p>
              <span className="header__desc">{selectedRoom?.description}</span>
            </div>
            <ButtonGroupStyled>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Avatar.Group size={"small"} maxCount={2}>
                {members?.map((member) => (
                  <Tooltip title={member.displayName} key={member?.id}>
                    <Avatar src={member?.photoURL}>
                      {member?.photoURL
                        ? ""
                        : member?.photoURL.charAt(0).toUppercase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages
                .sort((a, b) => moment(a.createdAt) - moment(b.createdAt))
                .map((message) => (
                  <div
                    className={
                      message.uid === uid ? "my__message" : "another_massage"
                    }
                  >
                    <Message
                      style={{}}
                      type={message.type}
                      url={message.url}
                      uid={message.uid}
                      text={message.text}
                      photoURL={message.photoURL}
                      displayName={message.displayName}
                      createdAt={moment(message.createdAt).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                    />
                  </div>
                ))}
            </MessageListStyled>
            <div style={{ paddingTop: 15 }}>
              <FormStyled form={form} onFinish={handleOnSubmit}>
                <Form.Item name={"message"}>
                  <Input
                    style={{ height: 40 }}
                    placeholder="Nhập tin nhắn..."
                    autoComplete="off"
                    onChange={handleInputChange}
                    onSubmit={handleOnSubmit}
                    autoFocus
                    bordered={false}
                  />
                </Form.Item>
                <Upload showUploadList={false} onChange={handleUpLoadFile}>
                  <Button type="text" icon={<UploadOutlined />}></Button>
                </Upload>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ height: 40, width: 70, marginLeft: 10, border: 0 }}
                >
                  Gửi
                </Button>
              </FormStyled>
              <Flex style={{ width: "100%", marginTop: 10 }} gap={15}>
                {files.map((file, index) => (
                  <div className="wrapper_file" key={index}>
                    {file?.preview ? (
                      <Image src={file.preview} />
                    ) : (
                      <Flex
                        align="center"
                        justify="center"
                        style={{
                          width: 80,
                          background: "#f0f0f0",
                          height: "100%",
                        }}
                      >
                        <FileTextOutlined style={{ fontSize: 40 }} />
                      </Flex>
                    )}
                    <Button
                      type="text"
                      icon={<CloseCircleOutlined />}
                      className="btn_remove_file"
                      onClick={() => handleRemoveFile(index)}
                    ></Button>
                  </div>
                ))}
              </Flex>
            </div>
          </ContentStyled>
        </>
      ) : (
        <Alert
          description="Hãy chọn phòng!"
          style={{ margin: 5, padding: "10px 15px" }}
        />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;
