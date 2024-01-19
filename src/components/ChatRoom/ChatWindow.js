import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";

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
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div``;

const ChatWindow = () => {
  const { members, selectedRoom } = useContext(AppContext);

  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">{selectedRoom?.name}</p>
          <span className="header__desc">{selectedRoom?.description}</span>
        </div>
        <ButtonGroupStyled>
          <Button icon={<UserAddOutlined />} type="text">
            Mời
          </Button>
          <Avatar.Group size={"small"} maxCount={2}>
            {members.map((member) => (
              <Tooltip title="" key={member?.id}>
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
          <Message
            text={"text 1"}
            photoURL={null}
            displayName={"A"}
            createdAt={"19/01/2024"}
          />
          <Message
            text={"text 2"}
            photoURL={null}
            displayName={"B"}
            createdAt={"19/01/2024"}
          />
          <Message
            text={"text 3"}
            photoURL={null}
            displayName={"C"}
            createdAt={"19/01/2024"}
          />
          <Message
            text={"text 4"}
            photoURL={null}
            displayName={"D"}
            createdAt={"19/01/2024"}
          />
        </MessageListStyled>
        <FormStyled>
          <Form.Item>
            <Input placeholder="Nhập tin nhắn..." autoComplete="off" />
          </Form.Item>
          <Button type="primary">Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  );
};

export default ChatWindow;
