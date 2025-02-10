import axios from "axios";
import { useState } from "react";
import { CameraOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const ProfileUploader = ({ photo_saved, onUploadChange }) => {
  const [profilePicUrl, setProfilePicUrl] = useState(photo_saved);
  return (
    <Upload
      className="avatar-uploader"
      listType="picture-card"
      showUploadList={false}
      multiple={false}
      customRequest={(file) => {
        const formData = new FormData();
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
          });
      }}
    >
      {profilePicUrl ? (
        <img
          src={profilePicUrl}
          alt="avatar"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Button type="button">
          <CameraOutlined />
        </Button>
      )}
    </Upload>
  );
};

export default ProfileUploader;
