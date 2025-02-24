import axiosRequest from "../../../axiosInterceptor";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Form, Input, Tabs } from "antd";

import useUI from "../../../hooks/useUI";

import CoverDragger from "../../../components/CoverDragger";
import ProfileUploader from "../../../components/ProfileUploader";
import Goal from "../../../components/Goal";

import "./ProfileEdit.scss";

const { TextArea } = Input;

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { userID } = useParams();
  const { userInfo, setUserInfo, editingProfile } = useUI();
  const [tabSelected, setTabSelected] = useState("page");

  const onTabChange = (selection) => {
    setTabSelected(selection);
  };

  const onFormChange = (changedValues) => {
    setUserInfo({ ...userInfo, ...changedValues });
  };

  const onCancelClicked = () => {
    if (userInfo.editing_profile_pic || userInfo.editing_cover_pic) {
      setUserInfo({
        ...(userInfo.editing_profile_pic && {
          profile_pic: userInfo.editing_profile_pic,
        }),
        ...(userInfo.editing_cover_pic && {
          cover_pic: userInfo.editing_cover_pic,
        }),
        editing_profile_pic: null,
        editing_cover_pic: null,
      });
    }
    editingProfile();
  };

  const onProfileSave = async () => {
    setUserInfo({
      ...userInfo,
      editing_profile_pic: null,
      editing_cover_pic: null,
    });

    try {
      const response = await axiosRequest.put(
        process.env.REACT_APP_API_URL + `/users/${userID}`,
        userInfo
      );

      if (response.status === 200) {
        navigate(`/${userID}`);
        editingProfile();
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  const tabOptions = [
    {
      key: "page",
      label: "Page Info",
      children: (
        <>
          <Form.Item
            label="Page title"
            name="page_title"
            rules={[
              {
                required: true,
                message: "Please input your page title",
              },
            ]}
          >
            <Input placeholder="Your page title" />
          </Form.Item>
          <Form.Item label="Description" name="page_description">
            <TextArea placeholder="Type a description here..." />
          </Form.Item>
        </>
      ),
    },
    {
      label: "Account Information",
      key: "account",
      children: (
        <>
          <Form.Item
            label="First Names"
            name="firstnames"
            rules={[
              {
                required: true,
                message: "Please input your First Names",
              },
            ]}
          >
            <Input placeholder="Your First Names" />
          </Form.Item>
          <Form.Item
            label="Last Names"
            name="lastnames"
            rules={[
              {
                required: true,
                message: "Please input your Last Names",
              },
            ]}
          >
            <Input placeholder="Your Last Names" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email",
              },
            ]}
          >
            <Input placeholder="Your email" />
          </Form.Item>
        </>
      ),
    },
  ];
  return (
    <div className="profile-edit-page">
      <CoverDragger />
      <div className="content">
        <Form
          layout="vertical"
          className="profile-info"
          initialValues={userInfo}
          onValuesChange={onFormChange}
          onFinish={onProfileSave}
        >
          <div className="avatar-n-controls">
            <ProfileUploader />
            <div className="controls">
              <Button type="default" onClick={onCancelClicked}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save info
              </Button>
            </div>
          </div>
          <div className="info">
            <Tabs
              items={tabOptions}
              onChange={onTabChange}
              defaultActiveKey={tabSelected}
            />
          </div>
        </Form>
        <Goal />
      </div>
    </div>
  );
};

export default ProfileEditPage;
