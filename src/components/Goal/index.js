import axiosRequest from "../../axiosInterceptor";
import { useEffect } from "react";
import { AMOUNT_PATTERNS } from "../../consts";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { currency, fromCents, toCents } from "../../utils";
import { Button, Form, InputNumber, Progress, Spin } from "antd";

import useUI from "../../hooks/useUI";
import CustomForm from "../CustomForm";
import DonateTable from "./DonateTable";
import SuccessView from "./SuccessView";

import "./Goal.scss";

const Goal = ({ donationMade = null }) => {
  const navigate = useNavigate();
  const { userID } = useParams();
  const {
    goalInfo,
    isGoalEditing,
    isLogged,
    editingGoal,
    setNewGoal,
    setEmptyGoal,
    setNewAlert,
    clearAlerts,
    loading,
    SectionIsLoading,
    finishLoading,
  } = useUI();

  const sectionName = "goal-container";
  const isLoading = SectionIsLoading(sectionName);

  const onGoalFinish = async (values) => {
    clearAlerts();
    try {
      loading(sectionName);
      const newGoalValue = toCents(values.new_goal);

      if (newGoalValue !== toCents(goalInfo.expected)) {
        const newGoal = await axiosRequest.post("/goals/", {
          user_id: userID,
          amount: toCents(values.new_goal),
        });
        if (newGoal.status === 200) {
          setNewGoal({ expected: fromCents(newGoal.data.amount) });
          finishLoading(() => editingGoal());
        }
      } else {
        throw new Error("The new goal must be different from the current one");
      }
    } catch (error) {
      finishLoading();
      setNewAlert({
        type: "warning",
        message: error?.response?.data?.message || error.message,
      });
    }
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const getCurrentGoalInfo = async () => {
      try {
        if (userID) {
          const [goal, funds] = await Promise.all([
            await axiosRequest.get(`goals/${userID}`),
            await axiosRequest.get(`users/${userID}/collected`),
          ]);

          if (goal.status === 200) {
            setNewGoal({
              expected: fromCents(goal.data.amount),
            });
          }

          if (funds.status === 200) {
            setNewGoal({
              collected: fromCents(funds.data.collected),
            });
          }
        }
      } catch (error) {
        if (error.status === 404) {
          setEmptyGoal();
        }
      }
    };
    getCurrentGoalInfo();
  }, [userID]);

  return (
    <div className="goal-column">
      <div className="goal-container">
        <div className="goal-header">
          <h4>{isLogged ? "Your Goal" : "Donate"}</h4>
          {isLoading && <Spin indicator={<LoadingOutlined spin />} />}
        </div>
        <div className="goal-body">
          {donationMade === "success" && <SuccessView />}
          {!donationMade && (
            <>
              {!isGoalEditing && goalInfo.expected > 0 && (
                <div className="goal-value">
                  <div className="progress-container">
                    <div className="progress-amounts">
                      <h3 className="amount">{currency(goalInfo.collected)}</h3>
                      <p>raised of {currency(goalInfo.expected)} goal</p>
                    </div>
                    <Progress
                      percent={goalInfo.percentage}
                      size={{ height: 16 }}
                      strokeColor="#002855"
                      showInfo={false}
                    />
                  </div>
                  {isLogged && (
                    <Button type="primary" onClick={editingGoal}>
                      Edit goal
                    </Button>
                  )}
                </div>
              )}
              {!isLogged && <DonateTable />}
              {isLogged && !isGoalEditing && goalInfo.expected === 0 && (
                <Button type="default" onClick={editingGoal}>
                  Add a new goal
                </Button>
              )}
              {isLogged && isGoalEditing && (
                <CustomForm
                  className="goal-form"
                  layout="vertical"
                  onFinish={onGoalFinish}
                >
                  <Form.Item
                    label="New goal"
                    name="new_goal"
                    initialValue={goalInfo.expected}
                    rules={[
                      {
                        required: true,
                        pattern: AMOUNT_PATTERNS.PATTERN,
                        message: "Please input a valid goal amount",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Type your goal here..."
                      parser={(value) =>
                        value?.replace(AMOUNT_PATTERNS.PARSER, "")
                      }
                      formatter={(value) =>
                        `$ ${value}`.replace(AMOUNT_PATTERNS.FORMATTER, ",")
                      }
                    />
                  </Form.Item>
                  <div className="goal-controls">
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isLoading}
                    >
                      Save new goal
                    </Button>
                    <Button
                      type="default"
                      onClick={editingGoal}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </CustomForm>
              )}
            </>
          )}
        </div>
      </div>
      {isLogged && (
        <Button type="link" onClick={onLogout}>
          Log Out
        </Button>
      )}
    </div>
  );
};

export default Goal;
