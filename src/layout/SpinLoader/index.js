import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SpinLoader = () => {
  return <Spin indicator={<LoadingOutlined />} size="large" />;
};

export default SpinLoader;
