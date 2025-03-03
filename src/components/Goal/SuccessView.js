import { Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router";

import useUI from "../../hooks/useUI";

import { currency, fromCents } from "../../utils";

import CopyLinkBtn from "./CopyLinkBtn";

const SuccessView = () => {
  const { userInfo } = useUI();
  const [searchParams] = useSearchParams();
  const amount = currency(fromCents(Number(searchParams.get("amnt_dntd"))));

  return (
    <div className="success-container">
      <CheckCircleFilled style={{ fontSize: 123, color: "#00A91B" }} />
      <div className="donation-message">
        <h1>Donation sent</h1>
        <p>
          Thank you for supporting {userInfo.firstnames} today.
          <br />
          We value you!
        </p>
      </div>
      <div className="donation-amount">
        <label>Your donation:</label>
        <h3>{amount} USD</h3>
      </div>
      <div className="actions-container">
        <Button type="primary">
          <Link to={`/${userInfo.short_id}`}>Donate more</Link>
        </Button>
        <span className="or-login">
          You can also share this page with friends
        </span>
        <CopyLinkBtn />
      </div>
    </div>
  );
};

export default SuccessView;
