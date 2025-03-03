import axios from "axios";
import { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import useUI from "../../hooks/useUI";

import { LOCAL_STORAGE, MESSAGES } from "../../consts";
import CustomForm from "../CustomForm";

import "./LoginForm.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const { SectionIsLoading, loading, finishLoading } = useUI();
  const [formData, setFormData] = useState({});
  const { setNewAlert, clearAlerts } = useUI();

  const loginHandler = async () => {
    clearAlerts();
    try {
      loading("login-form");
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/auth/login",
        formData
      );

      if (response.status === 201) {
        const { data, token } = response.data;
        localStorage.setItem(
          LOCAL_STORAGE.TOKEN,
          JSON.stringify({
            userId: data.short_id,
            token,
          })
        );
        finishLoading(() => navigate(`/${data.short_id}`));
      }
    } catch (error) {
      finishLoading();
      if (error.response.data.type === "email") {
        setNewAlert({ type: "error", message: MESSAGES.LOGIN.ERROR.EMAIL });
      } else if (error.response.data.type === "password") {
        setNewAlert({ type: "error", message: MESSAGES.LOGIN.ERROR.PASSWORD });
      }
    }
  };

  const onFormChange = (changedValues) => {
    setFormData({ ...formData, ...changedValues });
  };

  return (
    <div className="login">
      <div className="login-header">
        <h4>Log In</h4>
        {SectionIsLoading("login-form") && (
          <Spin indicator={<LoadingOutlined spin />} />
        )}
      </div>
      <div className="login-body">
        <CustomForm
          onValuesChange={onFormChange}
          onFinish={loginHandler}
          disabled={SectionIsLoading("login-form")}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <Input placeholder="Your email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <div className="actions-container">
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
            <span className="or-login">You don't have an account?</span>
            <Button type="default" htmlType="button">
              <Link to="/register">Sing up</Link>
            </Button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
};

export default LoginForm;
