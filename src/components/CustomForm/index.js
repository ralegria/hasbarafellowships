import cn from "classnames";
import { Alert, Form } from "antd";
import { useSelector } from "react-redux";

import "./CustomForm.scss";

const CustomForm = ({
  children,
  disabled = false,
  className = null,
  layout = "vertical",
  onFinish = () => {},
  onValuesChange = () => {},
}) => {
  const formAlert = useSelector((store) => store.UI.formAlert);

  return (
    <div className="form-container">
      {formAlert?.message && (
        <Alert message={formAlert?.message} type={formAlert.type} />
      )}
      <Form
        layout={layout}
        className={cn("form", className)}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        disabled={disabled}
        autoComplete="off"
      >
        {children}
      </Form>
    </div>
  );
};

export default CustomForm;
