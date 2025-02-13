import axiosRequest from "../../axiosInterceptor";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, Form, InputNumber, Progress, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { currency, fromCents, toCents } from "../../utils";
import { AMOUNT_PATTERNS } from "../../consts";

import useUI from "../../hooks/useUI";
import CustomForm from "../CustomForm";
import DonateTable from "./DonateTable";

import "./Goal.scss";

const Goal = () => {
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
    const getCurrentGoal = async () => {
      try {
        if (userID) {
          const response = await axiosRequest.get(`goals/${userID}`);

          if (response.status === 200) {
            setNewGoal({
              expected: fromCents(response.data.amount),
            });
          }
        }
      } catch (error) {
        if (error.status === 404) {
          setEmptyGoal();
        }
      }
    };
    getCurrentGoal();
  }, [userID]);

  return (
    <div className="goal-column">
      <div className="goal-container">
        <div className="goal-header">
          <h4>{isLogged ? "Your Goal" : "Donate"}</h4>
          {isLoading && <Spin indicator={<LoadingOutlined spin />} />}
        </div>
        <div className="goal-body">
          {!isGoalEditing && goalInfo.expected > 0 && (
            <div className="goal-value">
              <div className="progress-container">
                <div className="progress-amounts">
                  <h3 className="amount">
                    {currency(fromCents(goalInfo.collected))}
                  </h3>
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
                  parser={(value) => value?.replace(AMOUNT_PATTERNS.PARSER, "")}
                  formatter={(value) =>
                    `$ ${value}`.replace(AMOUNT_PATTERNS.FORMATTER, ",")
                  }
                />
              </Form.Item>
              <div className="goal-controls">
                <Button type="primary" htmlType="submit" disabled={isLoading}>
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
