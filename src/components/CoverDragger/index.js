import axios from "axios";
import { useEffect, useState } from "react";
import { CameraOutlined, EditFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";

import useUI from "../../hooks/useUI";
import Dragger from "antd/es/upload/Dragger";

import "./CoverDragger.scss";

const CoverDragger = ({ cover_pic = null, onUploadChange }) => {
  const sectionName = "cover-dragger";
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(cover_pic);
  const { loading, finishLoading, SectionIsLoading } = useUI();

  const isLoading = SectionIsLoading(sectionName);

  useEffect(() => {
    setCoverPhotoUrl(cover_pic);
  }, [cover_pic]);

  return (
    <header
      className="cover-dragger"
      style={{
        ...(coverPhotoUrl && {
          background: `url(${coverPhotoUrl}) no-repeat center center / cover`,
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
          formData.append("upload_preset", "iuj87bk5");
          axios
            .post(
              "https://api.cloudinary.com/v1_1/baygram/image/upload",
              formData
            )
            .then((response) => {
              setCoverPhotoUrl(response.data.secure_url);
              onUploadChange(response.data.secure_url);
              file.onSuccess(response.data.secure_url);
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
        {coverPhotoUrl && (
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
        {!coverPhotoUrl && <CameraOutlined className="camera-icon" />}
        <Button type="default" className="cover-btn" loading={isLoading}>
          {coverPhotoUrl ? "Edit" : "Add"} cover photo
        </Button>
      </Dragger>
    </header>
  );
};

export default CoverDragger;
