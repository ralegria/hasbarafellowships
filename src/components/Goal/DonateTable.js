import { Form, InputNumber } from "antd";
import { AMOUNT_PATTERNS } from "../../consts";

import CustomForm from "../CustomForm";

const DonateTable = () => {
  const amounts = [25, 50, 100, 250, 500, 1000];

  const onDonationSelected = (amount) => {
    alert(`You have donated $${amount}`);
  };
  return (
    <div className="donate-table">
      <h5>Choose an amount to donate!</h5>
      <ul className="amount-table">
        {amounts.map((amount) => (
          <li onClick={() => onDonationSelected(amount)}>${amount}</li>
        ))}
      </ul>
      <CustomForm
        layout="vertical"
        className="donation-form"
        onFinish={() => {}}
      >
        <Form.Item
          label="Custom Amount"
          name="amount_donated"
          rules={[
            {
              required: false,
              pattern: AMOUNT_PATTERNS.PATTERN,
              message: "Please input a valid amount",
            },
          ]}
        >
          <InputNumber
            placeholder="Type a custom amount here..."
            parser={(value) => value?.replace(AMOUNT_PATTERNS.PARSER, "")}
            formatter={(value) =>
              `$ ${value}`.replace(AMOUNT_PATTERNS.FORMATTER, ",")
            }
          />
        </Form.Item>
      </CustomForm>
    </div>
  );
};

export default DonateTable;
