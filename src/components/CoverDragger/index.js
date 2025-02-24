import axios from "axios";
import { CameraOutlined, EditFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

import useUI from "../../hooks/useUI";
import Dragger from "antd/es/upload/Dragger";

import "./CoverDragger.scss";

const CoverDragger = () => {
  const sectionName = "cover-dragger";
  const { loading, finishLoading, SectionIsLoading, setUserInfo, userInfo } =
    useUI();

  const coverPhoto = userInfo.cover_pic;

  const isLoading = SectionIsLoading(sectionName);

  return (
    <header
      className="cover-dragger"
      style={{
        ...(coverPhoto && {
          background: `url(${coverPhoto}) no-repeat center center / cover`,
        }),
      }}
    >
      <div className="overlay" />
      <Dragger
        multiple={false}
        disabled={isLoading}
        showUploadList={false}
        className="cover-photo-dragger"
        customRequest={(file) => {
          const formData = new FormData();
          loading(sectionName);

          formData.append("file", file.file);
          formData.append(
            "upload_preset",
            process.env.REACT_APP_CLOUDINARY_PRESET
          );
          axios
            .post(process.env.REACT_APP_CLOUDINARY_API, formData)
            .then((response) => {
              const newCover = response.data.secure_url;
              setUserInfo({
                editing_cover_pic: userInfo.cover_pic,
                cover_pic: newCover,
              });
              file.onSuccess(newCover);
            })
            .catch((error) => {
              console.error(error);
              file.onError(error);
            })
            .finally(() => {
              finishLoading();
            });
        }}
      >
        {coverPhoto && (
          <>
            {!isLoading && <EditFilled className="edit-icon" />}
            {isLoading && (
              <Spin
                size="large"
                className="loading-icon"
                indicator={<LoadingOutlined spin />}
              />
            )}
          </>
        )}
        {!coverPhoto && <CameraOutlined className="camera-icon" />}
        <Button type="default" className="cover-btn" loading={isLoading}>
          {coverPhoto ? "Edit" : "Add"} cover photo
        </Button>
      </Dragger>
    </header>
  );
};

export default CoverDragger;
