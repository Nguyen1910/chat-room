import { Avatar, Form, Input, Modal, Select, Spin } from "antd";
import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce } from "lodash";
import { collection, db } from "../../firebase/config";
import {
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  React.useEffect(() => {
    return () => {
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

const fetchUserList = async (search, curMembers) => {
  const q = query(
    collection(db, "users"),
    where("keyWords", "array-contains", search.toLowerCase()),
    limit(20)
  );

  return getDocs(q).then((snapshot) => {
    return snapshot.docs
      .map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      }))
      .filter((opt) => !curMembers.includes(opt.value));
  });
};

const InviteMemberModal = () => {
  const [value, setValue] = useState([]);
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = async () => {
    form.resetFields();
    setValue([]);
    await updateDoc(doc(db, "rooms", selectedRoomId), {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
    setIsInviteMemberVisible(false);
  };
  const handleCancel = () => {
    setIsInviteMemberVisible(false);
  };
  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode={"multiple"}
            label={"Tên các thành viên"}
            value={value}
            placeholder={"Nhập tên thành viên"}
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectedRoom?.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
