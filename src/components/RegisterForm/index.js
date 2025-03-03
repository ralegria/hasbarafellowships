import axiosRequest from "../../axiosInterceptor";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router";

import {
  LOCAL_STORAGE,
  REGISTER_FORM_CONFIG,
  REGISTER_FORM_STEPS,
} from "../../consts";

import "./RegisterForm.scss";
import CustomForm from "../CustomForm";
import useUI from "../../hooks/useUI";

const { GENERAL_INFO, PASSWORD } = REGISTER_FORM_STEPS;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setNewAlert, clearAlerts } = useUI();
  const [CURRENT_STEP, setCURRENT_STEP] = useState(GENERAL_INFO);
  const [formData, setFormData] = useState({});
  const stepTitle = REGISTER_FORM_CONFIG[CURRENT_STEP].title;
  const stepDescription = REGISTER_FORM_CONFIG[CURRENT_STEP]?.description ?? "";
  const stepFields = REGISTER_FORM_CONFIG[CURRENT_STEP].fields;

  const createAccount = async () => {
    try {
      const response = await axiosRequest.post("/users", {
        ...formData,
        role_id: 2,
      });

      if (response.status === 201) {
        const { data, token } = response.data;
        localStorage.setItem(
          LOCAL_STORAGE.TOKEN,
          JSON.stringify({
            userId: data.id,
            token,
          })
        );
        navigate(`/${data.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFormChange = (changedValues) => {
    setFormData({ ...formData, ...changedValues });
  };

  const checkEmailAvailability = async () => {
    try {
      const emailExists = await axiosRequest.get(
        `/users/verify_email/${formData.email}`
      );

      if (emailExists.status === 200) {
        return false;
      }
    } catch (error) {
      console.log(error);

      setNewAlert({ type: "error", message: error.response.data.message });
      return true;
    }
  };

  const onFinish = async () => {
    clearAlerts();
    if (CURRENT_STEP === GENERAL_INFO) {
      const emailExists = await checkEmailAvailability();
      console.log(emailExists);

      if (!emailExists) {
        setCURRENT_STEP(PASSWORD);
      }
      //setCURRENT_STEP(VERIFICATION); -- VERIFICATION CODE STEP
    } else if (CURRENT_STEP === PASSWORD) {
      createAccount();
    }
  };

  return (
    <div className="register">
      <div className="register-header">
        <h4>Register</h4>
        <div className="steps"></div>
      </div>
      <div className="register-body">
        <h5>{stepTitle}</h5>
        {stepDescription && <p>{stepDescription}</p>}
        <div className="form-container">
          <CustomForm
            className="form"
            onFinish={onFinish}
            onValuesChange={onFormChange}
          >
            {stepFields.map((field) => (
              <>
                {field.type === "input" && (
                  <Form.Item
                    label={field.label}
                    name={field.name}
                    dependencies={field.dependencies}
                    rules={field.rules}
                  >
                    {field.type === "input" && <Input {...field.input} />}
                  </Form.Item>
                )}
                {field.type === "button" && (
                  <Button {...field.button}>{field.label}</Button>
                )}
              </>
            ))}
            <div className="actions-container">
              <Button type="primary" htmlType="submit">
                Next
              </Button>
              <span className="or-login">Do you already have an account?</span>
              <Button type="default" htmlType="button">
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          </CustomForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
