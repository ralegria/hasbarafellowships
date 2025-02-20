import { Button } from "antd";
import useUI from "../../hooks/useUI";
import useMessage from "../../hooks/useMessage";

const CopyLinkBtn = () => {
  const sectionName = "copy-btn";

  const { showMessage, contextHolder } = useMessage();
  const { userInfo, loading, finishLoading, SectionIsLoading } = useUI();
  const isLoading = SectionIsLoading(sectionName);

  const handleCopyClick = async () => {
    const currentLink = `${process.env.REACT_APP_BASE_URL}/${userInfo.id}`;
    try {
      loading(sectionName);
      await navigator.clipboard.writeText(currentLink);
      finishLoading(() =>
        showMessage("success", "Link copied to your clipboard!")
      );
    } catch (error) {
      finishLoading();
      console.error("Failed to copy: ", error);
    }
  };
  return (
    <>
      {contextHolder}
      <Button type="default" onClick={handleCopyClick} loading={isLoading}>
        Copy Page Link
      </Button>
    </>
  );
};

export default CopyLinkBtn;
