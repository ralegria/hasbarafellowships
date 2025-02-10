import axios from "axios";
import { useState } from "react";
import { Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router";

import {
  LOCAL_STORAGE,
  REGISTER_FORM_CONFIG,
  REGISTER_FORM_STEPS,
} from "../../consts";

import "./RegisterForm.scss";

const { GENERAL_INFO, VERIFICATION, PASSWORD } = REGISTER_FORM_STEPS;

const RegisterForm = () => {
  const navigate = useNavigate();
  const [CURRENT_STEP, setCURRENT_STEP] = useState(GENERAL_INFO);
  const [formData, setFormData] = useState({});
  const stepTitle = REGISTER_FORM_CONFIG[CURRENT_STEP].title;
  const stepDescription = REGISTER_FORM_CONFIG[CURRENT_STEP]?.description ?? "";
  const stepFields = REGISTER_FORM_CONFIG[CURRENT_STEP].fields;

  const createAccount = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/users",
        { ...formData, role_id: 2 }
      );

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

  const onFinish = () => {
    if (CURRENT_STEP === GENERAL_INFO) {
      setCURRENT_STEP(VERIFICATION);
    } else if (CURRENT_STEP === VERIFICATION) {
      setCURRENT_STEP(PASSWORD);
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
          <Form
            layout="vertical"
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
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
