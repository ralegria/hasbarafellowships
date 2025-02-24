import axios from "axios";
import { useState } from "react";
import { CameraOutlined, EditFilled, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin, Upload } from "antd";

import useUI from "../../hooks/useUI";

const ProfileUploader = ({ photo_saved, onUploadChange }) => {
  const sectionName = "profile-uploader";
  const [profilePicUrl, setProfilePicUrl] = useState(photo_saved);
  const { loading, finishLoading, SectionIsLoading } = useUI();
  const isLoading = SectionIsLoading(sectionName);

  return (
    <Upload
      className="avatar-uploader"
      listType="picture-card"
      showUploadList={false}
      multiple={false}
      disabled={isLoading}
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
            setProfilePicUrl(response.data.secure_url);
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
      {profilePicUrl ? (
        <div
          className="photo-edit-container"
          style={{
            background: `url(${profilePicUrl}) no-repeat center center / cover`,
          }}
        >
          {!isLoading ? (
            <EditFilled className="edit-icon" />
          ) : (
            <Spin
              size="large"
              className="loading-icon"
              indicator={<LoadingOutlined spin />}
            />
          )}
        </div>
      ) : (
        <Button type="button">
          <CameraOutlined className="camara-icon" />
        </Button>
      )}
    </Upload>
  );
};

export default ProfileUploader;
