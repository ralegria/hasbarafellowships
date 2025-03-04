import cn from "classnames";
import axiosRequest from "../../axiosInterceptor";

import { Button, Form, InputNumber } from "antd";
import { AMOUNT_PATTERNS, MESSAGES } from "../../consts";

import CopyLinkBtn from "./CopyLinkBtn";
import CustomForm from "../CustomForm";
import useUI from "../../hooks/useUI";

import { toCents } from "../../utils";
import { useSelector } from "react-redux";

const DonateTable = () => {
  console.log("MyComponent is rendering");
  const sectionName = "donation-table";
  const amounts = [25, 50, 100, 250, 500, 1000];
  const donationAmount = useSelector((state) => state.UI.donation_amount);
  const [form] = Form.useForm();

  const {
    loading,
    setNewAlert,
    clearAlerts,
    setDonation,
    finishLoading,
    SectionIsLoading,
    userInfo,
  } = useUI();

  const isLoading = SectionIsLoading(sectionName);

  const onDonationSelected = (amount) => {
    form.resetFields();
    setDonation(toCents(amount));
  };

  const onCustomDonation = ({ amount_donated }) => {
    setDonation(toCents(amount_donated));
  };

  const onDonateClicked = async () => {
    try {
      clearAlerts();
      loading(sectionName);
      const generatedPaymentURL = await axiosRequest.post(
        "/donations/generate",
        {
          user_id: userInfo.short_id,
          amount_donated: donationAmount,
          cancel_url: `${process.env.REACT_APP_BASE_URL}/#/${userInfo.short_id}`,
          success_url: `${process.env.REACT_APP_BASE_URL}/#/${userInfo.short_id}/donation/success`,
        }
      );

      if (generatedPaymentURL.status !== 200) {
        throw new Error("Error generating payment URL");
      }

      finishLoading();
      window.location.href = generatedPaymentURL.data.url;
    } catch (error) {
      console.log(error);

      finishLoading(() =>
        setNewAlert({ type: "error", message: MESSAGES.DONATE.ERROR })
      );
    }
  };

  return (
    <div className="donate-table">
      <h5>Choose an amount to donate!</h5>
      <ul className="amount-table">
        {amounts.map((amount) => {
          const isSelected = donationAmount === toCents(amount);
          return (
            <li
              className={cn(null, { isSelected })}
              onClick={() => onDonationSelected(amount)}
            >
              ${amount}
            </li>
          );
        })}
      </ul>
      <CustomForm
        form={form}
        name="Custom Amount Form"
        layout="vertical"
        className="donation-form"
        onValuesChange={onCustomDonation}
        onFinish={onDonateClicked}
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
        <div className="actions-container">
          <Button
            type="primary"
            onClick={onDonateClicked}
            loading={isLoading}
            disabled={donationAmount === 0}
          >
            Donate
          </Button>
          <span className="or-login">
            Can’t donate now? Share this page with friends to help!
          </span>
          <CopyLinkBtn />
        </div>
      </CustomForm>
    </div>
  );
};

export default DonateTable;
