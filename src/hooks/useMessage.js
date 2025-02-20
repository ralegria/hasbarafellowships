import { message } from "antd";
import { useCallback } from "react";

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = useCallback(
    (type, content, duration = 3) => {
      messageApi.open({
        type,
        content,
        duration,
      });
    },
    [messageApi]
  );

  return { showMessage, contextHolder };
};

export default useMessage;
